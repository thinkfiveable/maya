import * as dotenv from 'dotenv'
import { join } from 'path'

import { AkairoClient, CommandHandler, ListenerHandler, InhibitorHandler } from 'discord-akairo'
import { SettingsProvider } from '../structures'

import { Signale } from 'signale'

import mongoose from 'mongoose'
import { SettingsModel } from '../models'

dotenv.config()

// Paths
const commandsPath = join(__dirname, '..', 'commands')
const listenersPath = join(__dirname, '..', 'listeners')
const inhibitorsPath = join(__dirname, '..', 'inhibitors')

/** Represents a bot client. */
export class MayaClient extends AkairoClient {
  logger: Signale
  settings: SettingsProvider
  commandHandler: CommandHandler
  listenerHandler: ListenerHandler
  inhibitorHandler: InhibitorHandler

  constructor () {
    super({ ownerID: process.env.OWNER_ID }, {
      messageCacheMaxSize: 25,
      messageCacheLifetime: 86400,
      messageSweepInterval: 43200,
      messageEditHistoryMaxSize: 2,
      disableMentions: 'everyone'
    })

    this.logger = new Signale({ secrets: [process.env.TOKEN, process.env.OWNER_ID, process.env.MONGO_URI] as any })

    this.settings = new SettingsProvider(SettingsModel, this)

    this.commandHandler = new CommandHandler(this, {
      directory: commandsPath,
      prefix: (message) => {
        if (message.guild) { return this.settings.get(message.guild.id, 'prefix', '!') }
        return '!'
      },
      allowMention: true,
      fetchMembers: true,
      commandUtil: true,
      commandUtilLifetime: 3e5,
      commandUtilSweepInterval: 9e5,
      handleEdits: true,
      defaultCooldown: 5000
    })

    this.listenerHandler = new ListenerHandler(this, { directory: listenersPath })

    this.inhibitorHandler = new InhibitorHandler(this, { directory: inhibitorsPath })
  }

  /** Initializes the database, settings provider, handlers, etc. */
  private init () {
    // Connect to Mongo database.
    mongoose.connect(process.env.MONGO_URI as string, { useNewUrlParser: true, useUnifiedTopology: true, keepAlive: true })
      .catch(err => {
        this.logger.fatal(new Error(err))
        process.exit()
      })

    // Initialize settings.
    this.settings.init()

    // Loads handlers.
    this.commandHandler.useInhibitorHandler(this.inhibitorHandler)
    this.commandHandler.useListenerHandler(this.listenerHandler)

    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      inhibitorHandler: this.inhibitorHandler,
      listenerHandler: this.listenerHandler
    })

    this.commandHandler.loadAll()
    this.inhibitorHandler.loadAll()
    this.listenerHandler.loadAll()
  }

  /** Starts the bot. */
  start () {
    this.init()
    this.login(process.env.TOKEN)
  }
}

declare module 'discord-akairo' {
  // eslint-disable-next-line no-unused-vars
  interface AkairoClient {
      logger: Signale
      settings: SettingsProvider
      commandHandler: CommandHandler
      listenerHandler: ListenerHandler
      inhibitorHandler: InhibitorHandler
  }
}

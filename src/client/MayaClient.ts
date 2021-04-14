import { join } from 'path'

import { Intents } from 'discord.js'
import { AkairoClient, CommandHandler, ListenerHandler, InhibitorHandler } from 'discord-akairo'
import { SettingsProvider } from '../structures'

import { Signale } from 'signale'

import mongoose from 'mongoose'
import { SettingsModel } from '../models'

// Paths
const commandsPath = join(__dirname, '..', 'commands')
const listenersPath = join(__dirname, '..', 'listeners')
const inhibitorsPath = join(__dirname, '..', 'inhibitors')

type CONFIG_OPTIONS = {
  MONGO_URI: string
  TOKEN: string
  OWNER_ID: string
  DEFAULT_PREFIX: string
}

/** Represents a bot client. */
export class MayaClient extends AkairoClient {
  logger: Signale
  settings: SettingsProvider
  commandHandler: CommandHandler
  listenerHandler: ListenerHandler
  inhibitorHandler: InhibitorHandler

  constructor(public config: CONFIG_OPTIONS) {
    super(
      { ownerID: config.OWNER_ID },
      {
        messageCacheMaxSize: 25,
        messageCacheLifetime: 86400,
        messageSweepInterval: 43200,
        messageEditHistoryMaxSize: 2,
        disableMentions: 'everyone',
        ws: {
          intents: [Intents.NON_PRIVILEGED],
        },
      }
    )

    this.logger = new Signale({
      secrets: [this.config.TOKEN, this.config.OWNER_ID, this.config.MONGO_URI],
    })

    this.settings = new SettingsProvider(SettingsModel, this)

    this.commandHandler = new CommandHandler(this, {
      directory: commandsPath,
      prefix: async (message) =>
        message.guild
          ? (await this.settings.get<string>(message.guild.id, 'prefix')) ?? this.config.DEFAULT_PREFIX
          : this.config.DEFAULT_PREFIX,
      allowMention: true,
      commandUtil: true,
      commandUtilLifetime: 3e5,
      commandUtilSweepInterval: 9e5,
      handleEdits: true,
      defaultCooldown: 5000,
    })

    this.listenerHandler = new ListenerHandler(this, {
      directory: listenersPath,
    })

    this.inhibitorHandler = new InhibitorHandler(this, {
      directory: inhibitorsPath,
    })
  }

  /** Initializes the database, settings provider, handlers, etc. */
  private init() {
    // Connect to Mongo database.
    mongoose
      .connect(this.config.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        keepAlive: true,
      })
      .catch((err) => {
        this.logger.fatal(err.message)
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
      listenerHandler: this.listenerHandler,
    })

    this.commandHandler.loadAll()
    this.inhibitorHandler.loadAll()
    this.listenerHandler.loadAll()
  }

  /** Starts the bot. */
  start() {
    this.init()
    this.login(this.config.TOKEN)
  }
}

declare module 'discord-akairo' {
  // eslint-disable-next-line no-unused-vars
  interface AkairoClient {
    logger: Signale
    settings: SettingsProvider
    commandHandler: CommandHandler
    config: CONFIG_OPTIONS
    listenerHandler: ListenerHandler
    inhibitorHandler: InhibitorHandler
  }
}

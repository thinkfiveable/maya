import { AkairoClient } from 'discord-akairo'
import { Guild } from 'discord.js'
import { Model } from 'mongoose'

/** Uses a Mongoose model to provide settings. */
export class SettingsProvider {
  private model: Model<any>
  private items: Map<string, any>
  private client: AkairoClient

  /**
   * @param {Model} model - Model for the provider.
   * @param {AkairoClient} client - The bot client.
   */
  constructor (model: Model<any>, client: AkairoClient) {
    /**
     * Model for the provider.
     * @type {Model}
     * @private
     */
    this.model = model

    /**
     * The bot client.
     * @type {AkairoClient}
     * @private
     */
    this.client = client

    /**
     * Cached settings, mapped by guild ID.
     * @type {Map}
     * @private
     */
    this.items = new Map()
  }

  /** Caches stored values and initializes new documents. */
  async init () {
    const documents = await this.model.find()
    for (const i in documents) {
      const guild = documents[i]
      this.items.set(guild.id, guild.settings)
    }

    this.client.on('ready', () => {
      this.client.guilds.cache.forEach((guild: Guild) => {
        if (!this.items.has(guild.id)) this.createDocument(guild.id)
      })
    })

    this.client.on('guildCreate', (guild: Guild) => this.createDocument(guild.id))
  }

  /** Gets a setting from the cached items. If no setting is found, defaultValue will be returned. */
  async get (guildID: string, setting: string, defaultValue: any) {
    if (this.items.has(guildID)) return this.items.get(guildID)[setting] ?? defaultValue
    return defaultValue
  }

  /** Sets and stores a setting. */
  async set (guildID: string, setting: string, value: any) {
    const data = this.items.get(guildID) || {}
    data[setting] = value
    this.items.set(guildID, data)

    const document = await this.getDocument(guildID)
    document.settings[setting] = value
    document.markModified('settings')
    document.save()
  }

  /** Clears a specific setting. */
  async clear (guildID: string, setting: string) {
    const data = this.items.get(guildID) || {}
    delete data[setting]

    const document = await this.getDocument(guildID)
    delete document.settings[setting]
    document.markModified('settings')
    document.save()
  }

  /** Fetches a settings document. */
  async getDocument (guildID: string) {
    const document = await this.model.findOne({ id: guildID })
    if (!document) return this.createDocument(guildID)
    return document
  }

  /** Creates a new settings document. */
  async createDocument (guildID: string) {
    const document = await this.model.create({ id: guildID })
    return document
  }

  /** Deletes and re-creates a settings document. */
  async clearDocument (guildID: string) {
    this.items.delete(guildID)
    const document = await this.getDocument(guildID)
    if (document) await document.remove()
  }
}

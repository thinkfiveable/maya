import { AkairoClient } from "discord-akairo";
import { Guild } from "discord.js";
import { Model } from "mongoose";

/** Uses a Mongoose model to provide settings. */
export class SettingsProvider {
  /**
   * Cached settings, mapped by guild ID.
   * @private
   */
  private items = new Map<string, any>();

  /**
   * Model for the provider.
   * @private
   */

  /**
   * The bot client.
   * @private
   */
  constructor(public model: Model<any>, public client: AkairoClient) {}

  /** Caches stored values and initializes new documents. */
  async init() {
    const documents = await this.model.find();
    for (const i in documents) {
      const guild = documents[i];
      this.items.set(guild.id, guild.settings);
    }

    this.client.on("ready", () => {
      this.client.guilds.cache.forEach((guild: Guild) => {
        if (!this.items.has(guild.id)) this.createDocument(guild.id);
      });
    });

    this.client.on("guildCreate", (guild: Guild) =>
      this.createDocument(guild.id)
    );
  }

  /** Gets a setting from the cached items. */
  async get<T>(guildID: string, setting: string): Promise<T | null> {
    if (this.items.has(guildID)) return this.items.get(guildID)[setting];
    return (await this.model.findOne({ id: guildID }))?.[setting] ?? null;
  }

  /** Sets and stores a setting. */
  async set(guildID: string, setting: string, value: any) {
    const data = this.items.get(guildID) || {};
    data[setting] = value;
    this.items.set(guildID, data);

    const document = await this.getDocument(guildID);
    document.settings[setting] = value;
    document.markModified("settings");
    document.save();
  }

  /** Clears a specific setting. */
  async clear(guildID: string, setting: string) {
    const data = this.items.get(guildID) || {};
    delete data[setting];

    const document = await this.getDocument(guildID);
    delete document.settings[setting];
    document.markModified("settings");
    document.save();
  }

  /** Fetches a settings document. */
  async getDocument(guildID: string) {
    const document = await this.model.findOne({ id: guildID });
    if (!document) return this.createDocument(guildID);
    return document;
  }

  /** Creates a new settings document. */
  createDocument(guildID: string) {
    return this.model.create({ id: guildID });
  }

  /** Deletes and re-creates a settings document. */
  async clearDocument(guildID: string) {
    this.items.delete(guildID);
    const document = await this.getDocument(guildID);
    if (document) await document.remove();
  }
}

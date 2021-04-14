import { Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'
import { Colors } from '../../utils'

export default class InfoCommand extends Command {
  constructor() {
    super('info', {
      aliases: ['info', 'about', 'hello'],
      category: 'general',
      description: { content: 'Displays general information about the bot.' }
    })
  }

  async exec(message: any) {
    const prefix = (await this.client.settings.get(message.guild!.id, 'prefix')) ?? this.client.config.DEFAULT_PREFIX
    const totalCommands = this.client.commandHandler.modules.size

    const embed = new MessageEmbed()
      .setColor(Colors.TEAL)
      .setTitle("👋 Hey, I'm Maya.")
      .setDescription("I'm an open-source Discord bot built using TypeScript, Discord.js, and Akairo.")
      .addField('Prefix', `\`${prefix}\``, true)
      .addField('Commands', totalCommands, true)
      .addField('Guilds', this.client.guilds.cache.size, true)
      .addField('Want to contribute?', 'Check out the [GitHub page](https://github.com/cnnor/Maya).')

    return message.channel.send(embed)
  }
}

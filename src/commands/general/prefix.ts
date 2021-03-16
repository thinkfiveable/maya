import { Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'
import { Colors } from '../../utils'

export default class PrefixCommand extends Command {
  constructor () {
    super('prefix', {
      aliases: ['prefix'],
      category: 'general',
      description: { content: 'Sets or displays the current prefix.' }
    })
  }

  async exec (message: any) {
    const prefix = await this.client.settings.get(message.guild!.id, 'prefix', '!')
    return message.channel.send(new MessageEmbed()
      .setColor(Colors.BLUE)
      .setDescription(`This guild uses \`${prefix}\` as a prefix.`))
  }
}

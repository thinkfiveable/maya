import { Command } from 'discord-akairo'
import { Message, MessageEmbed } from 'discord.js'

import { Colors, Embeds } from '../../utils'

export default class SettingsCommand extends Command {
  constructor() {
    super('settings', {
      aliases: ['settings', 'config', 'setting', 'set'],
      category: 'general',
      description: {
        content: 'Checks the latency of the bot.',
        usage: '[setting] [value]',
        example: ['settings prefix $', 'settings modlogsChannel #channel']
      },
      args: [
        {
          id: 'setting',
          type: 'string'
        },
        {
          id: 'value',
          type: 'string',
          match: 'rest'
        }
      ],
      userPermissions: 'MANAGE_GUILD'
    })
  }

  async exec(message: Message, { setting, value }: { setting?: string; value?: string }) {
    if (!setting) return this.settingsList(message)

    const currentSetting = await this.client.settings.get<string>(message.guild!.id, setting)

    if (currentSetting === undefined)
      return message.channel.send(
        Embeds.error(
          "I couldn't find a setting with that name. Try the command with no arguments to get a list of settings."
        )
      )

    if (value === null) return message.channel.send(`The current value for \`${setting}\` is \`${currentSetting}\``)

    await this.client.settings.set(message.guild!.id, setting, value)

    return message.channel.send(
      Embeds.success(`You have changed \`${setting}\`.`)
        .addField('From', currentSetting, true)
        .addField('To', value, true)
    )
  }

  async settingsList(message: any) {
    const document = await this.client.settings.getDocument(message.guild!.id)
    const settings = document.settings.toJSON()

    const embed = new MessageEmbed()
      .setColor(Colors.BLANK)
      .setTitle('Current Settings')
      .setDescription(
        `\`\`\`${Object.keys(settings)
          .map((key) => `${key}: ${settings[key]}`)
          .join('\n')}\`\`\``
      )

    return message.channel.send(embed)
  }
}

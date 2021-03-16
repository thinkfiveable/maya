import { MessageEmbed } from 'discord.js'
import { Colors } from './'

export class Embeds {
  static success (message: string, title?: string) {
    const embed = new MessageEmbed()
      .setColor(Colors.GREEN)
      .setTitle(title || '✅ Success!')
      .setDescription(message)

    return embed
  }

  static error (message: string, title?: string) {
    const embed = new MessageEmbed()
      .setColor(Colors.RED)
      .setTitle(title || '😔 Oops!')
      .setDescription(message)

    return embed
  }

  static info (message: string, title?: string) {
    const embed = new MessageEmbed()
      .setColor(Colors.BLUE)
      .setTitle(title || 'ℹ️ Information')
      .setDescription(message)

    return embed
  }

  static permission (permissions: string[]) {
    const embed = new MessageEmbed()
      .setColor(Colors.RED)
      .setTitle('Whoops! You don\'t have the permissions to run that comand.')
      .setDescription(`This requires the following permission(s): ${permissions}}`)
      .setFooter('If you think this is a mistake, please reach out to an admin.')

    return embed
  }

  static cooldown (ms: number) {
    const embed = new MessageEmbed()
      .setColor(Colors.RED)
      .setTitle('⏰ You can\'t use that command yet.')
      .setDescription(`Wait \`${Math.floor(ms / 1000)} seconds\` before trying again.`)

    return embed
  }
}

import { MessageEmbed } from 'discord.js'
import { Colors } from './'

export const Embeds = {
  success: (message: string, title?: string) =>
    new MessageEmbed()
      .setColor(Colors.GREEN)
      .setTitle(title || 'â Success!')
      .setDescription(message),

  error: (message: string, title?: string) =>
    new MessageEmbed()
      .setColor(Colors.RED)
      .setTitle(title || 'đ Oops!')
      .setDescription(message),

  info: (message: string, title?: string) =>
    new MessageEmbed()
      .setColor(Colors.BLUE)
      .setTitle(title || 'âšī¸ Information')
      .setDescription(message),

  permission: (permissions: string[]) =>
    new MessageEmbed()
      .setColor(Colors.RED)
      .setTitle("Whoops! You don't have the permissions to run that comand.")
      .setDescription(`This requires the following permission(s): ${permissions}}`)
      .setFooter('If you think this is a mistake, please reach out to an admin.'),

  cooldown: (ms: number) =>
    new MessageEmbed()
      .setColor(Colors.RED)
      .setTitle("â° You can't use that command yet.")
      .setDescription(`Wait \`${Math.floor(ms / 1000)} seconds\` before trying again.`)
}

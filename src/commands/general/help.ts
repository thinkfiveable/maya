import { Command } from 'discord-akairo'
import { Message, MessageEmbed } from 'discord.js'
import { Colors, Embeds } from '../../utils'

export default class HelpCommand extends Command {
  constructor() {
    super('help', {
      aliases: ['help'],
      category: 'general',
      description: {
        content: 'Displays information about a command or a list of available commands.',
        usage: '[command]',
        example: ['help warn', 'help prefix']
      },
      args: [
        {
          id: 'command',
          type: 'commandAlias',
          prompt: {
            retry: Embeds.error(
              "I couldn't find a command with that name. What command would you like to search for?",
              'No command found.'
            ),
            ended: Embeds.error(
              "Sorry. I still couldn't find a command with that name. Use the command without any arguments to get a list of available commands."
            ),
            retries: 1,
            optional: true
          }
        }
      ]
    })
  }

  async exec(message: Message, { command }: { command?: Command }) {
    if (!command) return this.allCommands(message)

    const prefix = (await this.client.settings.get(message.guild!.id, 'prefix')) ?? this.client.config.DEFAULT_PREFIX

    const embed = new MessageEmbed()
      .setColor(Colors.TEAL)
      .setTitle(`📃 Command Info for \`${command.aliases[0]}\``)
      .addField('Description', command.description.content || 'No description.')

    if (command.description.usage) {
      embed.addField('Usage', `\`\`\`${prefix}${command.aliases[0]} ${command.description.usage}\`\`\``)
    }

    if (command.description.example) {
      embed.addField(
        'Examples',
        `\`\`\`${command.description.example.map((x: string[]) => `${prefix}${x}`).join('\n')}\`\`\``
      )
    }

    if (command.userPermissions) {
      embed.addField('Permissions', `\`${command.userPermissions}\``)
    }

    return message.channel.send(embed)
  }

  async allCommands(message: Message) {
    const prefix = (await this.client.settings.get(message.guild!.id, 'prefix')) ?? this.client.config.DEFAULT_PREFIX

    const embed = new MessageEmbed()
      .setColor(Colors.TEAL)
      .setTitle('📃 Command List')
      .setDescription(`For additional command info, use \`${prefix}help [command]\`.`)

    for (const category of this.client.commandHandler.categories.values()) {
      const commands = category.filter((command) => command.aliases.length > 0)
      embed.addField(
        `${category.id.replace(/(\b\w)/gi, (lc) => lc.toUpperCase())}`,
        `${commands.map((command) => `\`${command.aliases[0]}\``).join(' ')}`
      )
    }

    return message.channel.send(embed)
  }
}

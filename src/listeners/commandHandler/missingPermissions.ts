import { Listener, Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { Embeds } from '../../utils'

export default class MissingPermissionsListener extends Listener {
  constructor () {
    super('missingPermissions', {
      emitter: 'commandHandler',
      event: 'missingPermissions'
    })
  }

  exec (message: Message, command: Command, type: string, missing: any) {
    return message.channel.send(Embeds.permission(missing))
  }
}

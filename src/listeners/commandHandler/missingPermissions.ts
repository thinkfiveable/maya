import { Listener, Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { Embeds } from '../../utils'

export default class MissingPermissionsListener extends Listener {
  constructor() {
    super('missingPermissions', {
      emitter: 'commandHandler',
      event: 'missingPermissions',
    })
  }

  exec(message: Message, _: Command, __: string, missing: any) {
    return message.channel.send(Embeds.permission(missing))
  }
}

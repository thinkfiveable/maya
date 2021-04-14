import { Listener, Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { Embeds } from '../../utils'

export default class CooldownListener extends Listener {
  constructor() {
    super('cooldown', {
      emitter: 'commandHandler',
      event: 'cooldown'
    })
  }

  exec(message: Message, _: Command, remaining: number) {
    return message.channel.send(Embeds.cooldown(remaining))
  }
}

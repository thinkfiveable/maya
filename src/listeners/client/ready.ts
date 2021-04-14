import { Listener } from 'discord-akairo'

export default class ReadyListener extends Listener {
  constructor() {
    super('ready', {
      emitter: 'client',
      event: 'ready',
    })
  }

  exec() {
    this.client.logger.success(`${this.client.user!.tag} is ready.`)
    return this.client.user!.setPresence({
      activity: {
        name: 'Parks and Recreation',
        type: 'WATCHING',
      },
      status: 'online',
    })
  }
}

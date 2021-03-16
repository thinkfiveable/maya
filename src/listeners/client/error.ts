import { Listener } from 'discord-akairo'

export default class ErrorListener extends Listener {
  constructor () {
    super('error', {
      emitter: 'client',
      event: 'error'
    })
  }

  exec (error: Error) {
    return this.client.logger.error(error)
  }
}

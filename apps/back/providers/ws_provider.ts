import { ApplicationService } from '@adonisjs/core/types'

export default class WsProvider {
    constructor(protected app: ApplicationService) { }

    public async ready() {
        console.log("WsProvider", this.app.getEnvironment())
        await import('#services/ws')
    }
}

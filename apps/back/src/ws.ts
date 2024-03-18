import WebSocket from 'ws'

// process.on("uncaughtException", (err) => {
//     console.error(err)
// })

export class InvalidPayloadError extends Error {

    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = 'InvalidPayloadError';
    }
}

export class Data {

    data: any

    constructor(message: WebSocket.RawData | any, raw = true) {
        this.data = raw ? JSON.parse(message.toString()) : message
    }

    all() {
        return {...this.data}
    }

    get(key: string) {
        return this.data[key]
    }

    verify(...keys: string[]) {
        var data: {[key: string]: any} = {}
        keys.map(key => {data[key] = this.data[key]})
        if (keys.map(key => +!this.data[key]).reduce((a, b) => a + b, 0) === 0) {
            return data
        } else {
            throw new InvalidPayloadError();
        }
    }
}

export class Client {

    ws: WebSocket
    storage: {[key: string]: any} = {}

    constructor(ws: WebSocket) {
        this.ws = ws
    }

    send(data: any) {
        this.ws.send(JSON.stringify(data))
    }

    store(key: string, value: any) {
        this.storage[key] = value
    }

    get(key: string) {
        return this.storage[key]
    }
}

export class WsContext {

    client: Client
    data: Data
    event_name: string

    constructor(client: Client, message: WebSocket.RawData | any, rawData = true) {
        this.client = client
        this.data = new Data(message, rawData)
        this.event_name = this.data.all().event

        // Change the data to the data from the event
        this.data.data = this.data.all().data
    }
}

interface EventRouter {
    [name: string]: (context: WsContext) => void
}

export class ws_router {

    static events: EventRouter = {}
    static welcome_message: any = undefined

    static event(name: string, handler: (context: WsContext) => void) {
        ws_router.events[name] = handler
    }

    static welcome(data: any) {
        ws_router.welcome_message = data
    }

    static handle_event(context: WsContext) {
        const event_name: string = context.event_name
        const event = ws_router.events[event_name]

        if (!event) {
            context.client.send({
                "event": "error",
                "data": {
                    "message": "Event not found"
                }
            })
            return 
        }

        try {
            event(context)
        } catch (e) {
            if (e instanceof InvalidPayloadError) {
                context.client.send({
                    "event": "error",
                    "data": {
                        "message": "Invalid payload"
                    }
                })
                return
            }
            
            console.error(e)
        }
    }

    static handle_custom_event(client: Client, data: {event: string, data?: any}) {
        ws_router.handle_event(new WsContext(client, data, false))
    }

}
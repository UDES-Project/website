import { Client, WsContext } from "#src/ws";

export default class WsController {

    static groupClients: {[key: string]: Client[]} = {}

    static sendToGroup(group: string, event: string, data: any) {
        WsController.groupClients[group].forEach((client) => {
            client.send({
                "event": event,
                "data": data
            })
        })
    }

    static join({ client, data }: WsContext) {
        const payload = data.verify("username", "group")

        if (WsController.groupClients[payload.group]) {
            WsController.groupClients[payload.group].push(client)
        } else {
            WsController.groupClients[payload.group] = [client]
        }

        client.store("username", payload.username)
        client.store("group", payload.group)

        WsController.sendToGroup(payload.group, "joined", {
            "message": `${payload.username} joined the group`
        })
    }

    static message({ client, data }: WsContext) {
        const payload = data.verify("content")

        if (!client.get("group")) {
            return client.send({
                "event": "error",
                "data": {
                    "message": "Please join a group before"
                }
            })
        }

        WsController.sendToGroup(client.get("group"), "message", {
            "username": client.get("username"),
            "content": payload.content
        })
    }

    static leave({ client }: WsContext) {
        if (client.get("group")) {
            delete WsController.groupClients[client.get("group")][WsController.groupClients[client.get("group")].indexOf(client)]
    
            WsController.sendToGroup(client.get("group"), "left", {
                "username": client.get("username")
            })
        }
    }

}
import { WebSocketServer } from 'ws';
import { Client, ws_router, WsContext } from '#src/ws';

const wsServer = new WebSocketServer({
    "port": 4000,
    "path": "/ws"
});

wsServer.on('connection', (ws) => {
    var client = new Client(ws)
    
    ws.on('message', (message) => {
        ws_router.handle_event(new WsContext(client, message))
    });

    ws.on('close', () => {
        ws_router.handle_custom_event(client, {
            "event": "leave",
        })
    })

    client.send({
        "event": "welcome",
        "data": ws_router.welcome_message
    })
})

export default wsServer
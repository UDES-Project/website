import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { WebSocketServer } from 'ws';
import crypto from 'crypto'

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

class Client {
    constructor(ws, room, username) {
        this.ws = ws;
        this.room = room;
        this.username = username;
        this.id = crypto.randomBytes(20).toString("base64url")

        this.room.join(this);
    }

    send(data) {
        this.ws.send(JSON.stringify(data));
    }

    to_json() {
        return {
            id: this.id,
            username: this.username,
        };
    }
}

class Room {
    static ROOMS = {};

    static get(id) {
        if (!(id in Room.ROOMS)) {
            Room.ROOMS[id] = new Room(id);
        }
        return Room.ROOMS[id];
    }

    constructor(id) {
        this.id = id;
        this.clients = [];
    }

    join(client) {
        this.clients.push(client);
        this.broadcastAll({
            event: 'client_joined',
            data: {
                user: client.to_json(),
                total: this.clients.length,
            },
        });
    }

    leave(client) {
        this.clients = this.clients.filter(c => c !== client);
        this.broadcastAll({
            event: 'client_left',
            data: {
                user: client.to_json(),
                total: this.clients.length,
            },
        });
        return this.clients.length === 0;
    }

    broadcastAll(message) {
        this.clients.forEach(c => c.send(message));
    }

    broadcast(sender, message) {
        this.clients.forEach(c => {
            if (c.ws !== sender.ws) {
                c.send(message);
            }
        });
    }
}

class WsHandler {
    constructor(ws) {
        this.ws = ws;
        this.client = null;

        this.events = {
            join: this.join.bind(this),
            message: this.message.bind(this),
        };
    }

    handle(message) {
        const data = JSON.parse(message);

        if (this.events[data.event]) {
            this.events[data.event](data);
        }
    }

    join(message) {
        const { room_id, username } = message.data;

        if (!room_id) {
            message.data.room_id = `Room#${Math.random().toString(36).slice(2, 12)}`;
        } else if (room_id.length > 32) {
            this.ws.send(JSON.stringify({ event: 'error', data: { error: 'Invalid Room ID (Too long)' } }));
            return;
        }

        if (username.length > 32) {
            this.ws.send(JSON.stringify({ event: 'error', data: { error: 'Invalid Username (Too long)' } }));
            return;
        }

        const room = Room.get(message.data.room_id);

        if (room.clients.some(c => c.username === username)) {
            this.ws.send(JSON.stringify({ event: 'error', data: { error: 'Username already taken' } }));
            return;
        }

        if (!username) {
            message.data.username = `User#${Math.random().toString(36).slice(2, 12)}`;
        }

        this.client = new Client(this.ws, room, message.data.username);
        this.client.send({ 
            event: 'joined',
            data: {
                user: this.client.to_json()
            }
        });
    }

    message(message) {
        this.client.room.broadcast(this.client, {
            event: 'new_message',
            data: {
                user: this.client.to_json(),
                content: message.data.content,
                is_me: false,
            },
        });

        this.client.send({
            event: 'new_message',
            data: {
                user: this.client.to_json(),
                content: message.data.content,
                is_me: true,
            },
        });
    }
}

app.prepare().then(() => {
    const server = createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    });

    const wss = new WebSocketServer({ noServer: true });

    const heartbeat = () => {
        Object.values(Room.ROOMS).forEach((room) => {
            room.clients.forEach((client) => {
                client.send({
                    event: 'heartbeat',
                });
            })
        })
    };

    setInterval(heartbeat, 15000);

    server.on('upgrade', (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, (ws) => {
            const wsHandler = new WsHandler(ws);
            ws.on('message', (message) => wsHandler.handle(message));
            ws.on('close', () => {
                if (wsHandler.client)
                    wsHandler.client.room.leave(wsHandler.client);
            });
        });
    });

    server.listen(3000, (err) => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    });
});

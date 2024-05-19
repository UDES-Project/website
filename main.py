from flash_flask import App
from flask_sock import Sock

from src.chat.room import Room
from src.chat.ws_handler import WsHandler

app = App(__name__)
sock = Sock(app.flask)

@sock.route('/ws/chat')
def chat(ws):
    
    handler = WsHandler(ws)
    
    try:
        while True:
            message = ws.receive()
            handler.handle(message)
    except:
        if handler.client:
            room = handler.client.room
            close_room = room.leave(handler.client)
            
            if close_room:
                del Room.ROOMS[room.id]

if __name__ == "__main__":
    app.run(debug=True)
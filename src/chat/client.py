import json


class Client:
    
    def __init__(self, ws, room, username) -> None:
        self.ws = ws
        self.room = room
        self.username = username
        
        self.room.join(self)
    
    def send_message(self, content):
        self.room.broadcast(self, content)
    
    def send(self, data):
        self.ws.send(json.dumps(data))
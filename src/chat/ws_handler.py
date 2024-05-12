import json
import random
import string

from src.chat.client import Client
from src.chat.room import Room


class WsHandler:
    
    def __init__(self, ws) -> None:
        self.ws = ws
        
        self.client = None
        
        self.events = {
            "join": self.join,
            "message": self.message
        }

    def handle(self, message):
        
        message = json.loads(message)
        
        if message["event"] in self.events:
            self.events[message["event"]](message)
    
    def join(self, message):
        
        if message["data"]["room_id"] == "":
            message["data"]["room_id"] = f"Room#{''.join(random.sample(string.ascii_letters+string.digits, 10))}"
        elif len(message["data"]["room_id"]) > 32:
            self.ws.send(json.dumps({
                "event": "error",
                "data": {
                    "error": "Invalid Room ID (Too long)"
                }
            }))
            return

        if len(message["data"]["username"]) > 32:
            self.ws.send(json.dumps({
                "event": "error",
                "data": {
                    "error": "Invalid Username (Too long)"
                }
            }))
            return
        
        room = Room.get(message["data"]["room_id"])
        
        for c in room.clients:
            if c.username == message["data"]["username"]:
                
                self.ws.send(json.dumps({
                    "event": "error",
                    "data": {
                        "error": "Username already taken"
                    }
                }))
                return
        
        if message["data"]["username"] == "":
            message["data"]["username"] = f"User#{''.join(random.sample(string.ascii_letters+string.digits, 10))}"
        
        self.client = Client(self.ws, room, message["data"]["username"])
        self.client.send({
            "event": "joined"
        })
    
    def message(self, message):
        self.client.room.broadcast(self.client, {
            "event": "new_message",
            "data": {
                "username": self.client.username,
                "content": message["data"]["content"],
                "is_me": False
            }
        })
        self.client.send({
            "event": "new_message",
            "data": {
                "username": self.client.username,
                "content": message["data"]["content"],
                "is_me": True
            }
        })
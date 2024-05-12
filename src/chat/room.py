class Room:
    
    ROOMS = {}
    
    @staticmethod
    def get(id):
        if id not in Room.ROOMS:
            Room.ROOMS[id] = Room(id)
        
        return Room.ROOMS[id]
    
    def __init__(self, id) -> None:
        self.id = id
        self.clients = []
    
    def join(self, client):
        self.clients.append(client)
        
        self.broadcast_all({
            "event": "client_joined",
            "data": {
                "username": client.username,
                "total": len(self.clients)
            }
        })
    
    def leave(self, client):
        self.clients.remove(client)
        
        self.broadcast_all({
            "event": "client_left",
            "data": {
                "username": client.username,
                "total": len(self.clients)
            }
        })
        
        return len(self.clients) == 0

    def broadcast_all(self, message):
        for c in self.clients:
            c.send(message)
    
    def broadcast(self, client, message):
        for c in self.clients:
            if c.ws != client.ws:
                c.send(message)
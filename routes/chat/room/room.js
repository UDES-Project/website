const template_message = document.getElementById('template-message').innerHTML
const template_systemMessage = document.getElementById('template-system_message').innerHTML
const input_content = document.getElementById('input-content')
const span_clients = document.getElementById('span-clients')

var username = "..."
var roomID = "..."
var ws = undefined
var currentId = 0

function submitChatInput(e) {
    e.preventDefault()

    const content = input_content.value
    input_content.value = ""

    ws.send(JSON.stringify({
        "event": "message",
        "data": {
            "content": content
        }
    }))
}

function addMessage(username, content, isMe) {
    var message = template_message
    message = message.replace('[[id]]', ++currentId)
    message = message.replace('[[isMe]]', isMe)
    document.getElementById('messages').innerHTML += message

    document.querySelector(`#msg-${currentId} .username`).textContent = username
    document.querySelector(`#msg-${currentId} .content`).textContent = content
}

function systemMessage(content, error = false) {
    var message = template_systemMessage
    message = message.replace('[[id]]', ++currentId)
    message = message.replace('[[error]]', error)
    document.getElementById('messages').innerHTML += message

    document.querySelector(`#msg-${currentId} .content`).textContent = content
}

function wsHandler() {
    ws = new WebSocket(location.protocol.replace("http", "ws") + '//' + window.location.host + '/chat')

    ws.onopen = () => {
        ws.send(JSON.stringify({
            "event": "join",
            "data": {
                "username": username,
                "room_id": roomID
            }
        }))
    }

    ws.onmessage = (e) => {
        const message = JSON.parse(e.data)
        console.log(message, message.event === "client_joined")

        if (message.event === "new_message") {
            addMessage(message.data.username, message.data.content, message.data.is_me)
        } else if (message.event === "client_joined") {
            systemMessage("User " + message.data.username + " joined the room")
            span_clients.textContent = message.data.total
        } else if (message.event === "client_left") {
            systemMessage("User " + message.data.username + " left the room")
            span_clients.textContent = message.data.total
        } else if (message.event === "error") {
            systemMessage(message.data.error, true)
        }
    }
}

window.onload = () => {
    username = new URLSearchParams(window.location.search).get('u')
    roomID = new URLSearchParams(window.location.search).get('r')

    document.getElementById('span-room').textContent = roomID
    document.getElementById('span-username').textContent = username

    wsHandler()
}
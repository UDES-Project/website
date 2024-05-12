const input_RoomID = document.getElementById("input-room_id")
const input_Username = document.getElementById("input-username")

function randomRoomID() {
    input_RoomID.value = Math.random().toString(36).slice(2, 10)
}

function submitChatForm(e) {
    e.preventDefault()

    const roomID = input_RoomID.value
    const username = input_Username.value

    location.href = `/chat/room?r=${roomID}&u=${username}`
}
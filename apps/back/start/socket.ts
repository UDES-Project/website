import WsController from "#controllers/ws_controller";
import { ws_router } from "#src/ws";

ws_router.welcome({"message": "Please enter a username"})

ws_router.event("join", WsController.join)
ws_router.event("message", WsController.message)
ws_router.event("leave", WsController.leave)
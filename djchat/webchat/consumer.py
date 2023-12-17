from channels.generic.websocket import WebsocketConsumer, JsonWebsocketConsumer
from asgiref.sync import async_to_sync


class WebchatConsumer(JsonWebsocketConsumer):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.room_name = "testserver"

    def connect(self):
        # Called on connection.
        # To accept the connection call:

        self.accept()
        async_to_sync(self.channel_layer.group_add)(
            self.room_name,
            self.channel_name,
        )

        # To reject the connection, call:
        # self.close()

    def receive_json(self, content):
        async_to_sync(self.channel_layer.group_send)(
            self.room_name, {
                "type": "chat.message",
                "new_message": content["message"]
            }
        )

    def chat_message(self, event):
        self.send_json(event)

    def disconnect(self, close_code):
        # Called when the socket closes
        pass

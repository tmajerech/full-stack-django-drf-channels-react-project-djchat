import { useState } from "react";
import useWebSocket from "react-use-websocket";

const sockerUrl = "ws://localhost:42069/ws/test";

const MessageInterface = () => {
  const [newMessage, setNewMessage] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const { sendJsonMessage } = useWebSocket(sockerUrl, {
    onOpen: () => {
      console.log("connected");
    },
    onClose: () => {
      console.log("disconnected");
    },
    onError: () => {
      console.log("error");
    },
    onMessage: (msg) => {
      const data = JSON.parse(msg.data);
      setNewMessage((pref_msg) => [...pref_msg, data.new_message]);
    },
  });

  return (
    <div>
      {newMessage.map((msg, index) => {
        return (
          <div key={index}>
            <p>{msg}</p>
          </div>
        );
      })}
      <form>
        <label>
          Enter message
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
      </form>
      <button
        onClick={() => {
          sendJsonMessage({ type: "message", message });
        }}
      >
        Send Message
      </button>
    </div>
  );
};

export default MessageInterface;

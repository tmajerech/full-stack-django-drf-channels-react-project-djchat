import { useState } from "react";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import useCrud from "../../../hooks/useCrud";
import { Server } from "../../../@types/server";
import { Box } from "@mui/material";

interface ServerChannelProps {
  data: Server[];
}
interface Message {
  sender: string;
  content: string;
  timestamp: string;
}

const MessageInterface = (props: ServerChannelProps) => {
	const {data} = props;
  const [newMessage, setNewMessage] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const { serverId, channelId } = useParams();
	const server_name = data?.[0]?.name ?? "Server";
  const { fetchData } = useCrud<Server>(
    [],
    `/messages/?channel_id=${channelId}`
  );

  const socketUrl = channelId
    ? `ws://localhost:42069/${channelId}/${serverId}`
    : null;

  const { sendJsonMessage } = useWebSocket(socketUrl, {
    onOpen: async () => {
      try {
        const data = await fetchData();
        setNewMessage([]);
        setNewMessage(Array.isArray(data) ? data : []);
        console.log("Connected");
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    onClose: () => {
      console.log("Closed!");
    },
    onError: () => {
      console.log("Error!");
    },
    onMessage: (msg) => {
      const data = JSON.parse(msg.data);
      setNewMessage((prev_msg) => [...prev_msg, data.new_message]);
    },
  });

  return (
    <>
      {channelId === undefined ? (
        <Box>
          Welcome to {server_name}{" "}
          <p>{data?.[0]?.description ?? "This is our home"}</p>
        </Box>
      ) : (
        <>
          {" "}
          <div>
            {newMessage.map((msg: Message, index) => {
              return (
                <div key={index}>
                  <p>{msg.sender}</p>
                  <p>{msg.content}</p>
                  <p>{msg.timestamp}</p>
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
        </>
      )}
    </>
  );
};

export default MessageInterface;

import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";
import ChatList from "./ChatList";

const ChatRoom = () => {
  const socket = io("http://localhost:3000");
  const [message, setMessage] = useState("");
  const [searchParam, setSearchParam] = useSearchParams();
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([]);
  const [chatList, setChatList] = useState<ChatList[]>([]);
  const [userId, setUserId] = useState(0);
  const { id } = useParams();
  const mem_id = searchParam.get("mem_id") as string;

  const handleSendMessage = async (e: any) => {
    e.preventDefault();

    // http로 전송, 채팅 저장
    const formdata = new FormData();
    // formdata.append("sender_id", mem_id);
    formdata.append("text", message);

    const res = await axios.post(`/chats/${id}/message`, formdata, {
      withCredentials: true,
    });
    console.log(res.data);

    // socket으로 전송
    socket.emit("send_message", {
      roomId: id,
      sender_id: parseInt(mem_id),
      message: message,
    });
    setMessage("");
  };

  useEffect(() => {
    const handleNewMessage = (data: ChatMsg) => {
      setChatMessages((prevMessages) => [...prevMessages, data]);
    };

    axios
      .get(`/chats/${id}`, { withCredentials: true })
      .then((res) => {
        const user_id = res.data.user_id;
        // 채팅방 입장
        socket.emit("join_room", {
          roomId: id,
          memId: mem_id,
          userId: user_id,
        });
        // 이전 채팅 기록
        setChatList(res.data.chatList);
        setUserId(user_id);

        socket.on("joined", (data) => console.log("joined : ", data));
      })
      .catch((err) => console.log(err));

    socket.on("new_message", handleNewMessage);

    return () => {
      socket.off("new_message", handleNewMessage);
    };
  }, []);

  return (
    <div className="chatroom_container">
      <div className="chats">
        <ul className="chatting_list">
          <ChatList
            chatList={chatList}
            userId={userId}
            chatMessages={chatMessages}
          />
        </ul>
      </div>
      <form
        name="frm"
        onSubmit={handleSendMessage}
        encType="multipart/form-data"
      >
        <button className="attach_image_btn">
          <FontAwesomeIcon className="icon" icon={faImage} />
        </button>
        <button className="attach_document_btn">
          <FontAwesomeIcon className="icon" icon={faPaperclip} />
        </button>
        <input
          type="text"
          value={message}
          placeholder="메시지를 입력해주세요."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="emoticon">
          <FontAwesomeIcon className="icon" icon={faFaceSmile} />
        </button>
        <input type="submit" name="send_message" value="전송" />
      </form>
    </div>
  );
};

export default ChatRoom;

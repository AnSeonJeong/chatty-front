import { io } from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";
import ChatList from "./ChatList";
import "../../../styles/chatroom.scss";

const ChatRoom = () => {
  const socket = io("http://localhost:3000");
  const [message, setMessage] = useState("");
  const [searchParam, setSearchParam] = useSearchParams();
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([]);
  const [chatList, setChatList] = useState<ChatList[]>([]);
  const [nickname, setNickname] = useState("");
  const [profile, setProfile] = useState("");
  const [userId, setUserId] = useState(0);
  const { id } = useParams();
  const mem_id = searchParam.get("mem_id") as string;

  // 스크롤 맨 아래로 자동 이동
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [chatList, chatMessages]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  // 메시지 전송
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
      sender_id: userId,
      nickname: nickname,
      profile: profile,
      text: message,
      createdAt: new Date(),
    });
    setMessage("");
  };

  useEffect(() => {
    axios
      .all([
        axios.get("/main", { withCredentials: true }),
        axios.get(`/chats/${id}`, { withCredentials: true }),
      ])
      .then(
        axios.spread((res1, res2) => {
          // user info
          setNickname(res1.data.nickname);
          setProfile(res1.data.profile);
          setUserId(res1.data.id);

          // chatroom
          // 채팅방 입장
          socket.emit("join_room", {
            roomId: id,
            memId: mem_id,
            userId: res1.data.id,
          });
          // 이전 채팅 기록
          setChatList(res2.data);

          socket.on("joined", (data) => console.log("joined : ", data));
        })
      )
      .catch((err) => console.log(err));

    // 채팅 메시지 추가
    const handleNewMessage = (data: ChatMsg) => {
      setChatMessages((prevMessages) => [...prevMessages, data]);
    };

    socket.on("new_message", handleNewMessage);

    return () => {
      socket.off("new_message", handleNewMessage);
    };
  }, []);

  return (
    <div className="chatroom_container" ref={chatContainerRef}>
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

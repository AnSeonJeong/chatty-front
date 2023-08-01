import { io } from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";
import ChatList from "./ChatList";
import "../../../styles/chatroom.scss";
import ExitChatroom from "./ExitChatroom";

const ChatRoom = () => {
  const socket = io("http://localhost:3000");
  const [message, setMessage] = useState("");
  const [searchParam, setSearchParam] = useSearchParams();
  const [chatMessages, setChatMessages] = useState<ChatList[]>([]);
  const [chatList, setChatList] = useState<ChatList[]>([]);
  const [nickname, setNickname] = useState("");
  const [profile, setProfile] = useState("");
  const [userId, setUserId] = useState(0);
  const [prevRoomId, setPrevRoomId] = useState("");
  const [chatListLen, setChatListLen] = useState(0);

  const { id: roomId } = useParams();
  const mem_id = searchParam.get("mem_id") as string;

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const fileRefDoc = useRef<HTMLInputElement>(null);
  const fileRefImage = useRef<HTMLInputElement>(null);

  // 스크롤 맨 아래로 자동 이동
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
    if (!message) {
      alert("메시지를 입력해주세요.");
      return;
    }
    // http로 전송, 채팅 저장
    const formdata = new FormData();
    formdata.append("text", message);

    const res = await axios.post(`/chats/${roomId}/message`, formdata, {
      withCredentials: true,
    });
    console.log(res.data);

    sendNewMessageToSocket(message, null, null, null);
    setMessage("");
  };

  const sendNewMessageToSocket = (
    message: string | null,
    image: string | null,
    document: string | null,
    originalDocName: string | null
  ) => {
    // 새로운 메시지를 생성
    const newMessage: ChatList = {
      chat_id: chatListLen + 1,
      room_id: parseInt(roomId!),
      sender_id: userId,
      nickname: nickname,
      profile: profile,
      text: message,
      document: document,
      originalDocName: originalDocName,
      image: image,
      createdAt: new Date(),
    };

    // socket으로 전송
    socket.emit("send_message", newMessage);
  };

  useEffect(() => {
    axios
      .all([
        axios.get("/main", { withCredentials: true }),
        axios.get(`/chats/${roomId}`, { withCredentials: true }),
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
            roomId: roomId,
            memId: mem_id,
            userId: res1.data.id,
          });
          // 이전 채팅 기록
          setChatList(res2.data);

          // chatListLen 초기값 설정
          setChatListLen(res2.data.length);
        })
      )
      .catch((err) => console.log(err));

    // 채팅 메시지 추가
    const handleNewMessage = (data: ChatList) => {
      // chatListLen 1씩 증가
      setChatListLen((prevLen) => prevLen + 1);
      setChatMessages((prevMessages) => [...prevMessages, data]);
    };

    // joined 이벤트 핸들러 등록
    const handleJoined = (data: any) => {
      setPrevRoomId(data.roomId);
    };

    socket.on("new_message", handleNewMessage);
    socket.on("joined", handleJoined);

    return () => {
      socket.off("new_message", handleNewMessage);
      socket.off("joined", handleJoined);
    };
  }, [roomId]);

  useEffect(() => {
    // 이전 채팅방에서 나가기
    return () => {
      if (userId !== 0 && prevRoomId !== "") {
        socket.emit("leave_room", {
          roomId: roomId,
          memId: mem_id,
          userId: userId,
        });
      }
    };
  }, [roomId]);

  // 이미지, 문서 파일 업로드
  const handleUpload = (uploadType: string, field: string) => {
    const chatImageFile = fileRefImage.current?.files;
    const chatDocFile = fileRefDoc.current?.files;

    let chatFile = chatImageFile![0] || chatDocFile![0];
    if (chatFile) {
      let formdata = new FormData();
      formdata.append(field, chatFile);

      axios
        .post(`/chats/${roomId}/${uploadType}`, formdata, {
          withCredentials: true,
        })
        .then((res) => {
          // 실시간 파일 전송
          const chatFile = res.data;
          console.log("chatFile=", chatFile);
          if (uploadType === "uploadImage") {
            sendNewMessageToSocket(null, chatFile, null, null);
            fileRefImage.current!.value = ""; // 이미지 업로드 요소 초기화
          } else {
            sendNewMessageToSocket(
              null,
              null,
              chatFile.document,
              chatFile.originalDocName
            );
            fileRefDoc.current!.value = ""; // 문서 업로드 요소 초기화
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="chatroom_container" ref={chatContainerRef}>
      <ExitChatroom roomId={parseInt(roomId!)} />
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
        <label htmlFor="chat_image">
          <FontAwesomeIcon className="icon" icon={faImage} />
        </label>
        <input
          type="file"
          id="chat_image"
          accept="image/*"
          name="chatImage"
          ref={fileRefImage}
          onChange={() => handleUpload("uploadImage", "chatImage")}
        />
        <label htmlFor="chat_document">
          <FontAwesomeIcon className="icon" icon={faPaperclip} />
        </label>
        <input
          type="file"
          id="chat_document"
          name="chatDocument"
          ref={fileRefDoc}
          onChange={() => handleUpload("uploadDocument", "chatDocument")}
        />
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

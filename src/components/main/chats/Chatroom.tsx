import { io } from "socket.io-client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";

const ChatRoom = () => {
  const socket = io("http://localhost:3000");
  const [message, setMessage] = useState("");

  const handleSendMessage = (e: any) => {
    e.preventDefault();

    socket.emit("send_message", message);
  };

  return (
    <div className="chatroom_container">
      <div className="chats">
        <ul className="chatting_list"></ul>
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

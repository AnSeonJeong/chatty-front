import { useState } from "react";
import Modal from "../Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ExitChatroom({ roomId }: { roomId: number }) {
  const [visible, setVisible] = useState(false);

  const history = useNavigate();

  const handleExitChatroomBtn = () => {
    setVisible(true);
  };
  const exitChatroom = () => {
    axios
      .post(`/chats/chatroom/${roomId}/exit`, null, { withCredentials: true })
      .then((res) => {
        if (res.data) {
          history("/main/chats");
          document.location.reload();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="chatting_title">
        <button onClick={handleExitChatroomBtn}>나가기</button>
      </div>
      <Modal
        visible={visible}
        title="채팅방 나가기"
        description="채팅방을 나가면 대화내용이 모두 삭제되고 채팅목록에서도 사라집니다."
        onCancel={() => setVisible(false)}
        onConfirm={exitChatroom}
        id={roomId}
      />
    </>
  );
}

export default ExitChatroom;

import { useParams } from "react-router-dom";
import ChatRoom from "../chats/Chatroom";
import FriendInfo from "../friends/FriendInfo";

function ContentContianer() {
  const { menu, id } = useParams();

  return (
    <div className="content">
      {menu === "friends" && id && (
        <>
          <div className="background"></div>
          <FriendInfo id={parseInt(id)} />
        </>
      )}
      {menu === "chats" && id && <ChatRoom />}
    </div>
  );
}

export default ContentContianer;

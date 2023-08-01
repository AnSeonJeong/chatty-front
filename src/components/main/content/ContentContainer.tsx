import { useParams } from "react-router-dom";
import ChatRoom from "../chats/Chatroom";
import FriendInfo from "../friends/FriendInfo";
import "../../../styles/userInfo.scss";
import UpdateOrDeleteUser from "../profile/UpdateOrDeleteUser";

function ContentContianer({ myId }: { myId: number | undefined }) {
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
      {menu === "profile" && myId && <UpdateOrDeleteUser myId={myId} />}
    </div>
  );
}

ContentContianer.defaultProps = {
  myId: undefined,
};

export default ContentContianer;

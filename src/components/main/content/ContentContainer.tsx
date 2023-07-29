import { useParams } from "react-router-dom";
import ChatRoom from "../chats/Chatroom";
import FriendInfo from "../friends/FriendInfo";
import UserInfo from "../profile/UserInfo";
import UpdateUserInfo from "../profile/UpdateUserInfo";
import { useEffect, useState } from "react";

import "../../../styles/userInfo.scss";
import axios from "axios";

function ContentContianer({ myid }: { myid: number | undefined }) {
  const { menu, id } = useParams();
  const [isClicked, setIsClicked] = useState(false);
  const [userInfo, setUserInfo] = useState<FriendList>({} as FriendList);

  useEffect(() => {
    if (menu === "profile" && myid) {
      axios
        .get(`/users/${myid}`, { withCredentials: true })
        .then((res) => {
          console.log(res.data);
          setUserInfo(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [myid]);

  return (
    <div className="content">
      {menu === "friends" && id && (
        <>
          <div className="background"></div>
          <FriendInfo id={parseInt(id)} />
        </>
      )}
      {menu === "chats" && id && <ChatRoom />}
      {menu === "profile" && myid && (
        <>
          <UpdateUserInfo
            userInfo={userInfo!}
            isClicked={isClicked}
            setIsClicked={setIsClicked}
          />
          <div className="background"></div>
          <UserInfo userInfo={userInfo!} setIsClicked={setIsClicked} />
        </>
      )}
    </div>
  );
}

ContentContianer.defaultProps = {
  myid: undefined,
};

export default ContentContianer;

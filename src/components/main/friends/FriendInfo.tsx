import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import profileNone from "../../../assets/profile_none.png";
import { io } from "socket.io-client";
import "../../../styles/friend_info.scss";

function FriendInfo({ id }: { id: number }) {
  const [userInfo, setUserInfo] = useState<FriendList>({} as FriendList);
  const [isLoaded, setIsLoaded] = useState(false);
  const history = useNavigate();

  const handleFriendship = (isFriend: boolean, id: number) => {
    let str = isFriend ? "remove" : "add";
    console.log(isFriend, str);

    axios
      .post(`/friends/${str}/${id}`, null, { withCredentials: true })
      .then((res) => {
        alert(res.data);
        history("/main/friends");
      })
      .catch((err) => alert(err.response.data.error));
  };

  const handleJoinChatroom = async () => {
    const res = await axios.get(`/chats/member/${id}`, {
      withCredentials: true,
    });

    if (res.data) {
      // 이미 채팅방이 있는 경우
      console.log(res.data);
      history(`/main/chats/${res.data}`);
    } else {
      // 채팅방이 없는 경우
      const memberIds = [id];
      const nicknames = [userInfo.nickname];

      const data = {
        memberIds: memberIds,
        nicknames: nicknames,
      };

      const res = await axios.post("chats/chatroom", data, {
        withCredentials: true,
      });
      history(`/main/chats/${res.data}`);
    }
  };

  useEffect(() => {
    if (!id) return;

    axios
      .get(`/users/${id}`, { withCredentials: true })
      .then((res) => {
        console.log(res);
        setUserInfo(res.data);
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (!userInfo) {
    return <div>User not found</div>;
  } else {
    return (
      <div className="user_info">
        <div>
          <div className="profileImg">
            <img src={userInfo.profile ? userInfo.profileUrl : profileNone} />
          </div>
          <ul>
            <li className="nickname">{userInfo.nickname}</li>
            <li className="email">{userInfo.email}</li>
            <li className="intro">{userInfo.intro}</li>
          </ul>
        </div>
        <div className="btns">
          <button
            onClick={() => handleFriendship(userInfo.isFriend, userInfo.id)}
          >
            {userInfo.isFriend ? "친구삭제" : "친구신청"}
          </button>
          <button onClick={() => handleJoinChatroom()}>채팅하기</button>
        </div>
      </div>
    );
  }
}

export default FriendInfo;

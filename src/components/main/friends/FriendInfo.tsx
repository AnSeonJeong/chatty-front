import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import profileNone from "../../../assets/profile_none.png";

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

  const handleJoinRoom = () => {};

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
          <button onClick={() => handleJoinRoom()}>채팅하기</button>
        </div>
      </div>
    );
  }
}

export default FriendInfo;

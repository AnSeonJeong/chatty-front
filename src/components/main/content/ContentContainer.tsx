import { useNavigate, useParams } from "react-router-dom";
import profileNone from "../../../assets/profile_none.png";
import { useEffect, useState } from "react";
import axios from "axios";

function ContentContianer() {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState<FriendList>({} as FriendList);
  const [isLoaded, setIsLoaded] = useState(false);

  const history = useNavigate();

  useEffect(() => {
    axios
      .get(`/users/${id}`, { withCredentials: true })
      .then((res) => {
        console.log(res);
        setUserInfo(res.data);
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const UserInfo = () => {
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
            <button>채팅하기</button>
          </div>
        </div>
      );
    }
  };

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

  return (
    <div className="content">
      {userInfo && id && <div className="background"></div>}
      {userInfo && id && <UserInfo />}
    </div>
  );
}

export default ContentContianer;

import { useParams } from "react-router-dom";
import profileNone from "../../../assets/profile_none.png";
import { useEffect, useState } from "react";
import axios from "axios";

function ContentContianer() {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState<FriendList>({} as FriendList);

  useEffect(() => {
    axios
      .get(`/users/${id}`, { withCredentials: true })
      .then((res) => {
        console.log(res);
        setUserInfo(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const UserInfo = () => {
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
          <button>친구삭제</button>
          <button>채팅하기</button>
        </div>
      </div>
    );
  };

  return (
    <div className="content">
      {userInfo && id && <div className="background"></div>}
      {userInfo && id && <UserInfo />}
    </div>
  );
}

export default ContentContianer;

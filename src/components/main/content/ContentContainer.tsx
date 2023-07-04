import { useFetcher, useParams } from "react-router-dom";
import profileNone from "../../../assets/profile_none.png";
import { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";

function ContentContianer() {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState<FriendList>({} as FriendList);
  const [isLoaded, setIsLoaded] = useState(false);

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
            <button>{userInfo.isFriend ? "친구삭제" : "친구추가"}</button>
            <button>채팅하기</button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="content">
      {userInfo && id && <div className="background"></div>}
      {userInfo && id && <UserInfo />}
    </div>
  );
}

export default ContentContianer;

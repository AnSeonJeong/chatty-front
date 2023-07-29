import axios from "axios";
import { useEffect, useState } from "react";
import profileNone from "../../../assets/profile_none.png";
import "../../../styles/friend_info.scss";

interface UserInfoProps {
  userInfo: FriendList;
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

function UserInfo(props: UserInfoProps) {
  const { userInfo, setIsClicked } = props;

  const updateUserInfo = () => {
    const updateContainer = document.getElementsByClassName("update_container");
    console.log(updateContainer);
    setIsClicked(true);
  };

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
        <button onClick={updateUserInfo}>수정</button>
        <button>탈퇴</button>
      </div>
    </div>
  );
}

export default UserInfo;

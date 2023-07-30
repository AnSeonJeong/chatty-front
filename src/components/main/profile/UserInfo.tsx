import profileNone from "../../../assets/profile_none.png";
import "../../../styles/friend_info.scss";
import React from "react";

interface UserInfoProps {
  userInfo: UserInfo;
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function UserInfo(props: UserInfoProps) {
  const { userInfo, setIsClicked, setVisible } = props;

  const handleUpdateUserBtn = () => {
    setIsClicked(true);
  };

  const handleDeleteUserBtn = () => {
    setVisible(true);
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
        <button onClick={handleUpdateUserBtn}>수정</button>
        <button onClick={handleDeleteUserBtn}>탈퇴</button>
      </div>
    </div>
  );
}

export default UserInfo;

import { useState, useEffect } from "react";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import profileNone from "../assets/profile_none.png";

interface FriendList {
  id: number;
  email: string;
  nickname: string;
  profile: string;
  intro: string;
  profileUrl: string;
}

function Friends({ dataList }: { dataList: FriendList[] }) {
  const handleAddFriends = () => {};
  console.log(dataList);
  return (
    <div className="container">
      <div>
        <div className="title">
          <h3>Friends</h3>
          <button className="addBtn" onClick={handleAddFriends}>
            <FontAwesomeIcon icon={faUserPlus} />
          </button>
        </div>
        <ul className="info">
          {dataList.map((friend, i) => (
            <li key={i}>
              <div className="profileImg">
                <img
                  src={friend.profile !== "" ? friend.profileUrl : profileNone}
                  alt={friend.nickname}
                />
              </div>
              <div className="user_info">
                <span>{friend.nickname}</span>
                <span>{friend.intro}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div></div>
    </div>
  );
}

export default Friends;

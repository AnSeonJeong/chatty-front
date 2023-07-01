import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import side_logo from "../assets/side_logo.png";
import "../styles/main.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faUserCircle,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import profileNone from "../assets/profile_none.png";

function Main() {
  const history = useNavigate();
  const [nickname, setNickname] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios
      .get("/main", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setProfileUrl(res.data.profileUrl);
        setNickname(res.data.nickname);
        setEmail(res.data.email);
      })
      .catch((err) => {
        console.log(err);
        alert("잘못된 접근입니다.");
        history("/login");
      });
  }, []);

  return (
    <div>
      <div className="side_menu">
        <div className="side_logo">
          <img src={side_logo} />
        </div>
        <ul>
          <Link to="chats">
            <li>
              <span className="icon">
                <FontAwesomeIcon icon={faCommentDots} />
              </span>
              <span className="menu">Chats</span>
            </li>
          </Link>
          <Link to="friends">
            <li>
              <span className="icon">
                <FontAwesomeIcon icon={faUserFriends} />
              </span>
              <span className="menu">Friends</span>
            </li>
          </Link>
          <Link to="profile">
            <li>
              <span className="icon">
                <FontAwesomeIcon icon={faUserCircle} />
              </span>
              <span className="menu">Profile</span>
            </li>
          </Link>
        </ul>
        <div className="user">
          <div className="user_profile">
            <img src={profileUrl !== "" ? profileUrl : profileNone} />
          </div>
          <div className="user_con">
            <span className="user_nickname">{nickname}</span>
            <span className="user_email">{email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;

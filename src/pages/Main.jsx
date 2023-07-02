import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/main.scss";
import SideMenu from "../components/SideMenu";
import Chats from "../components/Chats";
import Friends from "../components/Friends";
import Profile from "../components/Profile";

function Main() {
  const history = useNavigate();
  const [nickname, setNickname] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [profile, setProfile] = useState("");
  const [email, setEmail] = useState("");

  const { menu } = useParams();
  const Content = () => {
    if (menu === "chats") return <Chats />;
    else if (menu === "friends") return <Friends />;
    else if (menu === "profile") return <Profile />;
    else return null;
  };

  useEffect(() => {
    axios
      .get("/main", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setProfileUrl(res.data.profileUrl);
        setProfile(res.data.profile);
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
    <div className="main_wrap">
      <SideMenu
        profile={profile}
        nickname={nickname}
        email={email}
        profileUrl={profileUrl}
      />
      <Content />
    </div>
  );
}

export default Main;

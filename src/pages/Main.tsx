import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/main.scss";
import SideMenu from "../components/main/SideMenu";
import Chats from "../components/main/Chats";
import Friends from "../components/main/Friends";
import Profile from "../components/main/Profile";

function Main() {
  const history = useNavigate();
  const [nickname, setNickname] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [profile, setProfile] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(0);
  const [dataList, setDataList] = useState([]);

  const { menu } = useParams();

  const fetchData = (menu: string) => {
    let uri = menu;

    if (menu === "friends") uri = `users/${userId}/friends`;
    else if (menu === "profile") uri = `users/${userId}/friends/requests`;

    axios
      .get(`/${uri}`, { withCredentials: true })
      .then((res) => {
        setDataList(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const id = localStorage.getItem("id");

    axios
      .get(`/users/${id}`, { withCredentials: true })
      .then((res) => {
        setProfileUrl(res.data.profileUrl);
        setProfile(res.data.profile);
        setNickname(res.data.nickname);
        setEmail(res.data.email);
        setUserId(res.data.id);
      })
      .catch((err) => {
        console.log(err);
        alert("잘못된 접근입니다.");
        history("/login");
      });
  }, []);

  useEffect(() => {
    fetchData(menu!);
  }, [menu]);

  return (
    <div className="main_wrap">
      <SideMenu
        profile={profile}
        nickname={nickname}
        email={email}
        profileUrl={profileUrl}
      />
      {menu === "chats" ? (
        <Chats dataList={dataList} userId={userId} fetchData={fetchData} />
      ) : menu === "friends" ? (
        <Friends dataList={dataList} />
      ) : menu === "profile" ? (
        <Profile dataList={dataList} userId={userId} />
      ) : null}
    </div>
  );
}

export default Main;

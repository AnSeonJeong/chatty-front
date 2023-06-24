import { useState } from "react";
import profile from "../assets/profile_none.png";
import "../styles/regi.scss";
import axios from "axios";

function Regi() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [nickname, setNickname] = useState("");
  const [intro, setIntro] = useState("");

  const onSubmit = () => {
    let formdata = new FormData();

    axios.post("regi", formdata);
  };

  return (
    <div className="regi-container">
      <h2>회원가입</h2>
      <div className="regi-form">
        <form name="frm" onSubmit={onSubmit} encType="multipart/form">
          {/* 프로필 사진 업로드 */}
          <div className="profile">
            <div>
              <img src={profile} alt="profile" />
            </div>
            <label htmlFor="file">프로필 사진 업로드</label>
            <input type="file" id="file" />
          </div>
          {/* 회원 정보 입력 */}
          <div className="info">
            <input
              type="email"
              value={email}
              placeholder="이메일"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              value={pwd}
              placeholder="비밀번호"
              onChange={(e) => setPwd(e.target.value)}
            />
            <input
              type="password"
              value={confirmPwd}
              placeholder="비밀번호 확인"
              onChange={(e) => setConfirmPwd(e.target.value)}
            />
            <input
              value={nickname}
              placeholder="이름"
              onChange={(e) => setNickname(e.target.value)}
            />
            <input
              placeholder="간단한 자기소개를 입력해주세요.😊"
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
            />
          </div>
          <input type="submit" className="confirmBtn" value="확인"></input>
        </form>
      </div>
    </div>
  );
}

export default Regi;

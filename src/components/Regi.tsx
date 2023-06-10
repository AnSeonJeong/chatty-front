import { useState } from "react";
import profile from "../assets/profile_none.png";
import "../styles/regi.scss";

function Regi() {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className="regi-container">
      <h2>회원가입</h2>
      <div className="regi-form">
        <form>
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
              value={id}
              placeholder="아이디"
              onChange={(e) => setId(e.target.value)}
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
              value={name}
              placeholder="이름"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="date"
              value={birth}
              data-placeholder="생년월일"
              onChange={(e) => setBirth(e.target.value)}
              required
              aria-required="true"
            />
            <input
              type="email"
              value={email}
              placeholder="이메일"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="tel"
              placeholder="전화번호 (ex: 010-1234-5678)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <input type="submit" className="confirmBtn" value="확인"></input>
        </form>
      </div>
    </div>
  );
}

export default Regi;

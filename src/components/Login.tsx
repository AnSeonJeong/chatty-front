import { useState } from "react";
import { Link } from "react-router-dom";
// css
import "../styles/Login.scss";

// images
import logo from "../assets/logo.png";
import naver from "../assets/naver.png";
import kakao from "../assets/kakao.png";
import google from "../assets/google.png";

function Login() {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

  const onSubmit = () => {};

  return (
    <div className="login-container">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      {/* 로그인 입력 폼 */}
      <div className="login-form">
        <form name="frm" onSubmit={onSubmit} encType="multipart/form">
          <div className="login">
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
          </div>
          {/* 로그인 옵션 */}
          <div className="login-option">
            <label>
              <input type="checkbox" />
              아이디 저장
            </label>
            <span>
              <Link to={`/findAccount`}>아이디 / 비밀번호 찾기</Link>
            </span>
          </div>
          {/* 로그인 버튼, 회원가입 버튼 */}
          <div className="buttons">
            <input className="loginBtn" type="submit" value="로그인" />
            <Link to={`/regi`} className="regiBtn">
              회원가입
            </Link>
          </div>
        </form>
      </div>
      {/* 간편 로그인 */}
      <div className="other-login">
        <div>간편 로그인</div>
        <div className="others">
          <img src={naver} alt="naver" />
          <img src={kakao} alt="kakao" />
          <img src={google} alt="google" />
        </div>
      </div>
    </div>
  );
}

export default Login;

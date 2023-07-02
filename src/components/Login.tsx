import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// css
import "../styles/login.scss";

// images
import logo from "../assets/logo.png";
import naver from "../assets/naver.png";
import kakao from "../assets/kakao.png";
import google from "../assets/google.png";

function Login() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const history = useNavigate();

  const handleLogin = (e: any) => {
    e.preventDefault();

    if (!email) {
      alert("아이디(이메일)을 입력해주세요.");
      return;
    } else if (!pwd) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    const formdata = new FormData();
    formdata.append("email", email);
    formdata.append("pwd", pwd);

    axios
      .post("/login", formdata, { withCredentials: true })
      .then((res) => {
        if (res.data) {
          const token = res.data;
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          history("/main");
          if (isChecked) localStorage.setItem("login", email);
          else localStorage.removeItem("login");
        }
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  };

  const handleSocialLogin = async (type: string) => {
    const res = await axios.get(`/login/social`, { params: { type: type } });
    window.location.href = res.data;
  };

  useEffect(() => {
    const loginData = localStorage.getItem("login");

    if (loginData && loginData !== "") {
      setIsChecked(true);
      setEmail(loginData);
    } else {
      setIsChecked(false);
    }
  }, []);

  return (
    <div className="login-container">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      {/* 로그인 입력 폼 */}
      <div className="login-form">
        <form name="login-frm" onSubmit={handleLogin} encType="multipart/form">
          <div className="login">
            <input
              value={email}
              placeholder="아이디(이메일)"
              onChange={(e) => setEmail(e.target.value)}
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
              <input
                type="checkbox"
                onChange={() => setIsChecked(!isChecked)}
                checked={isChecked}
              />
              아이디 저장
            </label>
            <span>
              <Link to={`/findAccount`}>아이디 / 비밀번호 찾기</Link>
            </span>
          </div>
          {/* 로그인 버튼, 회원가입 버튼 */}
          <div className="buttons">
            <input
              className="loginBtn"
              type="submit"
              value="로그인"
              name="login_info"
            />
            <Link to="/regi" className="regiBtn">
              회원가입
            </Link>
          </div>
        </form>
      </div>
      {/* 간편 로그인 */}
      <div className="other-login">
        <div>간편 로그인</div>
        <div className="others">
          <img
            src={naver}
            alt="naver"
            onClick={() => handleSocialLogin("naver")}
          />
          <img
            src={kakao}
            alt="kakao"
            onClick={() => handleSocialLogin("kakao")}
          />
          <img
            src={google}
            alt="google"
            onClick={() => handleSocialLogin("google")}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;

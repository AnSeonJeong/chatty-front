import { useRef, useState } from "react";
import profile from "../assets/profile_none.png";
import "../styles/regi.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Regi() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [nickname, setNickname] = useState("");
  const [intro, setIntro] = useState("");
  const [imgFile, setImgFile] = useState("");
  const [saveImg, setSaveImg] = useState<File>();
  const imgRef = useRef<HTMLInputElement>(null);

  const history = useNavigate();

  // 이미지 업로드 & 미리보기
  const ImgLoader = () => {
    if (
      imgRef.current &&
      imgRef.current.files &&
      imgRef.current.files.length > 0
    ) {
      const file = imgRef.current.files[0];
      setSaveImg(file);
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImgFile(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // 이메일 유효성 검사
  const CheckEmail = () => {
    // 이메일 정규식
    const reg_email =
      /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

    let msg = "";
    if (email.length > 1 && !reg_email.test(email)) {
      msg = "❌ 올바른 이메일 형식이 아닙니다.";
    }
    return <div className="err_message">{msg}</div>;
  };

  // 비밀번호 확인
  const CheckPwd = () => {
    let msg = "";
    if (pwd !== confirmPwd) msg = "❌ 비밀번호가 일치하지 않습니다.";
    return <div className="err_message">{msg}</div>;
  };

  // 프로필 이미지 업로드
  const saveProfileImage = async (id: number) => {
    let imageFormdata = new FormData();
    if (saveImg !== undefined) imageFormdata.append("profile", saveImg);

    await axios.post("/regi/upload", imageFormdata, {
      params: { id: id },
    });
  };

  // 회원가입
  const handleRegi = async (e: any) => {
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", pwd);
    formdata.append("nickname", nickname);
    formdata.append("intro", intro);

    if (!email || !pwd || !confirmPwd || !nickname) {
      alert("필수 입력 값이 비었습니다");
      return;
    } else if (pwd !== confirmPwd) {
      alert("비밀번호를 확인해주세요.");
      return;
    }

    try {
      const res = await axios.post("/regi", formdata);
      if (typeof res.data === "string") {
        alert(res.data);
      } else {
        saveProfileImage(res.data.id);
        alert(
          `${res.data.nickname}님 환영합니다!!!😚\n바로 로그인 페이지로 이동합니다.`
        );
        history("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="regi-container">
      <h2>회원가입</h2>
      <div className="regi-form">
        <form name="frm" onSubmit={handleRegi} encType="multipart/form">
          {/* 프로필 사진 업로드 */}
          <div className="profile">
            <div>
              <img src={imgFile ? imgFile : profile} alt="profile" />
            </div>
            <label htmlFor="file">프로필 사진 업로드</label>
            <input
              type="file"
              id="file"
              accept="image/*"
              ref={imgRef}
              onChange={ImgLoader}
              name="profile"
            />
          </div>
          {/* 회원 정보 입력 */}
          <div className="info">
            <input
              type="email"
              value={email}
              placeholder="*이메일"
              onChange={(e) => setEmail(e.target.value)}
            />
            <CheckEmail />
            <input
              type="password"
              value={pwd}
              placeholder="*비밀번호"
              onChange={(e) => setPwd(e.target.value)}
            />
            <input
              type="password"
              value={confirmPwd}
              placeholder="*비밀번호 확인"
              onChange={(e) => setConfirmPwd(e.target.value)}
            />
            <CheckPwd />
            <input
              value={nickname}
              placeholder="*닉네임"
              onChange={(e) => setNickname(e.target.value)}
            />
            <input
              placeholder="간단한 자기소개를 입력해주세요.😊"
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
            />
          </div>
          <input
            type="submit"
            className="confirmBtn"
            value="확인"
            name="regi_info"
          ></input>
        </form>
      </div>
    </div>
  );
}

export default Regi;

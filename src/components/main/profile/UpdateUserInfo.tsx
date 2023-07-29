import React, { useEffect, useRef, useState } from "react";
import profile from "../../../assets/profile_none.png";
import axios from "axios";

interface UpdateUserInfoProps {
  userInfo: FriendList;
  isClicked: boolean;
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

function UpdateUserInfo(props: UpdateUserInfoProps) {
  const { userInfo, isClicked, setIsClicked } = props;

  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [nickname, setNickname] = useState("");
  const [intro, setIntro] = useState("");
  const [imgFile, setImgFile] = useState("");
  const [saveImg, setSaveImg] = useState<File>();
  const imgRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setNickname(userInfo.nickname);
    setIntro(userInfo.intro);
    setImgFile(userInfo.profileUrl);
  }, [isClicked]);

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

  // 비밀번호 확인
  const CheckPwd = () => {
    let msg = "";
    if (pwd !== confirmPwd) msg = "❌ 비밀번호가 일치하지 않습니다.";
    return <div className="err_message">{msg}</div>;
  };

  // 프로필 이미지 변경
  const saveProfileImage = async (id: number) => {
    let imageFormdata = new FormData();
    if (saveImg !== undefined) imageFormdata.append("profile", saveImg);

    await axios.post("/profile/update/image", imageFormdata, {
      params: { id: id },
    });
  };

  // 회원 정보 수정
  const handleUpdateInfo = (e: any) => {
    e.preventDefault();
    let formdata = new FormData();
    if (pwd !== "") formdata.append("password", pwd);
    if (nickname !== userInfo.nickname) formdata.append("nickname", nickname);
    if (intro !== userInfo.intro) formdata.append("intro", intro);

    axios
      .post("/profile/update", formdata)
      .then((res) => {
        if (res.data) {
          saveProfileImage(res.data.id);
          alert("수정완료");
        }
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  };

  return (
    <div className={`update_container ${isClicked ? "active" : "hidden"}`}>
      <button onClick={() => setIsClicked(false)}>X</button>
      <form name="frm" onSubmit={handleUpdateInfo} encType="multipart/form">
        {/* 프로필 사진 변경 */}
        <div className="profile">
          <div>
            <img
              src={!imgFile.endsWith("/null") ? imgFile : profile}
              alt="profile"
            />
          </div>
          <label htmlFor="file">프로필 사진 변경</label>
          <input
            type="file"
            id="file"
            accept="image/*"
            ref={imgRef}
            onChange={ImgLoader}
            name="update_profile"
          />
        </div>
        {/* 회원 정보 변경 */}
        <div className="info">
          <input type="email" value={userInfo.email || ""} readOnly />
          <input
            type="password"
            value={pwd}
            placeholder="변경할 비밀번호"
            onChange={(e) => setPwd(e.target.value)}
          />
          <input
            type="password"
            value={confirmPwd}
            placeholder="변경할 비밀번호 확인"
            onChange={(e) => setConfirmPwd(e.target.value)}
          />
          <CheckPwd />
          <input
            value={nickname || ""}
            placeholder="*닉네임"
            onChange={(e) => setNickname(e.target.value)}
          />
          <input
            placeholder="간단한 자기소개를 입력해주세요.😊"
            value={intro || ""}
            onChange={(e) => setIntro(e.target.value)}
          />
        </div>
        <input
          type="submit"
          className="confirmBtn"
          value="수정"
          name="update_info"
        ></input>
      </form>
    </div>
  );
}

export default UpdateUserInfo;

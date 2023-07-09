import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Redirect() {
  // 인가 코드 받기
  const AUTHORIZE_CODE = new URL(window.location.href).searchParams.get("code");
  const { type } = useParams();
  const history = useNavigate();
  //  인가 코드 백엔드에 전달
  axios
    .get("/redirect", {
      params: { code: AUTHORIZE_CODE, type: type },
      withCredentials: true,
    })
    .then((res) => {
      if (res.data) {
        // 토큰 발급에 성공하면 공통 헤더 설정
        const token = res.data;
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        // 메인 페이지로 이동
        history("/main/chats");
      }
    })
    .catch((err) => {
      alert(err.response.data.error);
      history("/login");
    });

  return <div className="redirect">로그인 진행 중입니다!😉</div>;
}

export default Redirect;

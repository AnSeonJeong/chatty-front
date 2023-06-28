import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Redirect() {
  // 인가 코드 받기
  const AUTHORIZE_CODE = new URL(window.location.href).searchParams.get("code");
  const { type } = useParams();
  const history = useNavigate();
  //  인가 코드 백엔드에 전달
  axios
    .get("/redirect", { params: { code: AUTHORIZE_CODE, type: type } })
    .then((res) => {
      console.log(res.data.type);
      if (res.data.type && res.data.type !== type) {
        // 다른 소셜로 가입한 경우, 로그인 페이지로 이동
        const errMsg = `이미 Chatty의 회원 입니다.\n${res.data.type}로 다시 시도해주십시오.😅`;
        alert(errMsg);
        history("/login");
      } else if (res.data && !res.data.type) {
        // 토큰 발급에 성공하면 공통 헤더 설정
        const token = res.data;
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        // 메인 페이지로 이동
        history("/main?success=true");
      }
    })
    .catch((err) => console.log(err));

  return <div className="redirect">로그인 진행 중입니다!😉</div>;
}

export default Redirect;

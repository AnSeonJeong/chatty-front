import axios from "axios";
import { useParams } from "react-router-dom";

function Redirect() {
  // 인가 코드 받기
  const AUTHORIZE_CODE = new URL(window.location.href).searchParams.get("code");
  const { type } = useParams();

  // 인가 코드 백엔드에 전달
  axios
    .get("/redirect", { params: { code: AUTHORIZE_CODE, type: type } })
    .then((res) => {
      console.log(res.data);
      // 토큰 발급에 성공하면
      if (res.data) {
        // 토큰 저장 후
        // 메인 페이지로 이동
        window.location.href = "http://localhost:9000/main?success=true";
      }
    })
    .catch((err) => console.log(err));

  return <div className="redirect">로그인 진행 중입니다!😉</div>;
}

export default Redirect;

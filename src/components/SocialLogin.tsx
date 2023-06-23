import axios from "axios";

// 카카오 소셜 로그인
export const kakaoLogin = () => {
  // 백엔드에서 clientId와 redirect_uri를 받는다
  axios.get("/login", { params: { type: "kakao" } }).then((res) => {
    const REST_API_KEY = res.data.key;
    const REDIRECT_URI = res.data.uri;
    // OAuth 요청 URL
    const KAKAOURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    // 해당 URL로 이동
    window.location.href = KAKAOURL;
  });
};

// 네이버 소셜 로그인
export const NaverLogin = () => {};

// 구글 소셜 로그인
export const GoogleLogin = () => {};

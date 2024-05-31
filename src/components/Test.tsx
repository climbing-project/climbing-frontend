import { SERVER_ADDRESS } from "@/constants/constants";
import { requestData } from "@/service/api";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

// api 테스트를 위한 컴포넌트
// 전체페이지에서 't' 클릭시 작동
const Test = () => {
  const { data: session, status } = useSession();
  // 테스트할 함수

  const testFunc = async () => {
    alert("테스트 키 입력됨");
    const data = await requestData({
      option: "POST",
      url: `/members/login`,
      data: {
        email: "eunjitest90@gmail.com",
        password: "hello1234!",
      },
      onSuccess: async (response: Response) => {
        const responseHeaders = response.headers;
        console.log(responseHeaders);
        const responseAccessToken = responseHeaders.get("Authorization");
        const responseRefreshToken = responseHeaders.get(
          "Authorization-refresh"
        );
        if (!(responseHeaders && responseAccessToken && responseRefreshToken)) {
          throw Error("missing header or token");
        }

        // 받은 토큰
        const jwt = {
          accessToken: responseAccessToken || "tempAccess",
          refreshToken: responseRefreshToken || "tempRefresh",
        };

        // 받은 유저정보
        const body = await response.json();
        const email = body.email || "tempEmail";
        const nickname = body.nickname || "tempNickname";

        return { user: { email, nickname }, jwt };
      },
      hasBody: false,
    });
    return data;
  };

  const keyDown = async (event: {
    key: string;
    preventDefault: () => void;
  }) => {
    if (event.key === "t") {
      event.preventDefault();
      const data = await testFunc();
      console.log(data);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", keyDown);
    return () => window.removeEventListener("keydown", keyDown);
  });

  // 필요시 사용
  return <></>;
};

const S = {};

export default Test;

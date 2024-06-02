import { SERVER_ADDRESS } from "@/constants/constants";
import { requestData } from "@/service/api";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

// api 테스트를 위한 컴포넌트
// 전체페이지에서 't' 클릭시 작동
const Test = () => {
  const { data: session, status } = useSession();
  // 테스트할 함수

  const testFunc = async () => {
    alert("테스트 키 입력됨");
    // console.log(session);
    // console.log(status);
    // return session?.jwt;
    signIn("credentials", {
      email: "eunjitest90@gmail.com",
      password: "hello1234!",
      redirect: true,
      callbackUrl: "/",
    });
    return "hello";
  };

  const testFunc2 = async () => {
    alert("테스트 키2 입력됨");
    const data = {
      email: "eunjitest90@gmail.com",
      password: "hello1234!",
    };
    const result = await fetch(`${SERVER_ADDRESS}/members/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`${res.status} 에러`);
        }
        return res;
      })
      .then(async (response) => {
        const responseHeaders = response.headers;
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

        const body = await response.json();
        // const email = body.email || "tempEmail";
        // const nickname = body.nickname || "tempNickname";
        const email = body.email || "tempEmail";
        const nickname = body.nickname || "tempNickname";
        return { user: { email: email, nickname: nickname }, jwt };
      })
      .catch((error) => {
        console.log("\n로그인에러");
        console.log("옵션 : POST");
        console.log(error.stack + "\n");
      });
    console.log(result);
    return result as any;
  };

  const testFunc3 = async () => {
    alert("테스트 키3 입력됨");
    console.log(session);
    console.log(status);
    return session?.jwt;
  };

  const keyDown = async (event: {
    key: string;
    preventDefault: () => void;
  }) => {
    if (event.key === "t") {
      event.preventDefault();
      const data = await testFunc();
      console.log(data);
    } else if (event.key === "d") {
      event.preventDefault();
      const data = await testFunc2();
      console.log(data);
    } else if (event.key === "f") {
      event.preventDefault();
      const data = await testFunc3();
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

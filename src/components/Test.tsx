import { requestData } from "@/service/api";
import { useEffect } from "react";

// api 테스트를 위한 컴포넌트
// 전체페이지에서 't' 클릭시 작동
const Test = () => {
  // 테스트할 함수
  const testFunc = () => {
    alert("테스트 키 입력됨");

    // requestData({
    //   option: "POST",
    //   url: `/members/login`,
    //   sessionId: "id",
    //   data: "test",
    //   onSuccess: (data: any) => console.log(data),
    // });
    requestData({
      option: "POST",
      url: `/members/login`,
      data: { email: "dmswl6310@naver.com", password: "hello1234!" },
      onSuccess: async (response: any) => {
        const responseHeaders = await response.headers;
        const body = await response.body;
        console.log(body);
        const chunks = [];
        for await (let chunk of body) {
          chunks.push(chunk);
        }
        console.log(Buffer.concat(chunks));
        // const responseRefreshToken = responseHeaders.get(
        //   "Authorization-refresh"
        // );
        // if (!(responseHeaders && responseAccessToken && responseRefreshToken)) {
        //   throw Error("missing header or token");
        // }

        // // 받은 토큰
        // const jwt = {
        //   accessToken: responseHeaders.get("Authorization"),
        //   refreshToken: responseHeaders.get("Authorization-refresh"),
        // };

        // const data = JSON.parse(Buffer.from(response).toString("utf8"));
        // console.log(body);
        // console.log(body.json());
        // const data = await response.text();
        // 받은 유저정보
        // console.log(data);
        // console.log(responseHeaders.get("body").email);
        // email = data.email;
        // nickname = data.nickname;
      },
      hasBody: false,
    });
  };

  const keyDown = (event: { key: string; preventDefault: () => void }) => {
    if (event.key === "t") {
      event.preventDefault();
      testFunc();
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

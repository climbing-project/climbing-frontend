import { SERVER_ADDRESS } from "@/constants/constants";

const getLoginInfos = async (email: string, password: string) => {
  const sendInfo = { email: email, password: password };

  return await fetch(`${SERVER_ADDRESS}/members/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sendInfo),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status} 에러`);
      }
      return res;
    })
    .then((response) => {
      //   const responseHeaders = response.headers;
      //   const responseAccessToken = responseHeaders.get("Authorization");
      //   const responseRefreshToken = responseHeaders.get("Authorization-refresh");
      //   if (!(responseHeaders && responseAccessToken && responseRefreshToken)) {
      //     throw Error("missing header or token");
      //   }

      //   // 받은 토큰
      //   const jwt = {
      //     accessToken: responseAccessToken || "tempAccess",
      //     refreshToken: responseRefreshToken || "tempRefresh",
      //   };
      return response.json();
      //   const jwt = {
      //     accessToken: "tempAccess",
      //     refreshToken: "tempRefresh",
      //   };

      //   const body = await response.json();
      //   // const email = body.email || "tempEmail";
      //   // const nickname = body.nickname || "tempNickname";
      //   const email = body.email || "tempEmail";
      //   const nickname = body.nickname || "tempNickname";
      //   return { user: { email: email, nickname: nickname }, jwt };
    });
};

export default getLoginInfos;

import { SERVER_ADDRESS } from "@/constants/constants";
import { requestData } from "@/service/api";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    //자체 로그인
    CredentialsProvider({
      name: "credential",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        // accessToken: { label: "AccessToken", type: "string" },
        // refreshToken: { label: "RefreshToken", type: "string" },
        // type: { label: "LoginType", type: "string" },
      },
      async authorize(credentials: any) {
        console.log("일반 로그인");
        // let email = "tempEmail";
        // let nickname = "tempNickname";
        // let jwt = { accessToken: "tempAccess", refreshToken: "tempRefresh" };
        const data = {
          email: credentials.email,
          password: credentials.password,
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
            if (
              !(responseHeaders && responseAccessToken && responseRefreshToken)
            ) {
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
        // const data = await requestData({
        //   option: "POST",
        //   url: `/members/login`,
        //   data: {
        //     email: credentials.email,
        //     password: credentials.password,
        //   },
        //   onSuccess: async (response: Response) => {
        //     const responseHeaders = response.headers;
        //     const responseAccessToken = responseHeaders.get("Authorization");
        //     const responseRefreshToken = responseHeaders.get(
        //       "Authorization-refresh"
        //     );
        //     if (
        //       !(responseHeaders && responseAccessToken && responseRefreshToken)
        //     ) {
        //       throw Error("missing header or token");
        //     }

        //     // 받은 토큰
        //     // const jwt = {
        //     //   accessToken: responseAccessToken || "tempAccess",
        //     //   refreshToken: responseRefreshToken || "tempRefresh",
        //     // };
        //     jwt = {
        //       accessToken: responseAccessToken || "tempAccess",
        //       refreshToken: responseRefreshToken || "tempRefresh",
        //     };

        //     // 받은 유저정보
        //     const body = await response.json();
        //     // const email = body.email || "tempEmail";
        //     // const nickname = body.nickname || "tempNickname";
        //     email = body.email || "tempEmail";
        //     nickname = body.nickname || "tempNickname";
        //     // const user = { email: email, nickname: nickname };
        //     // const data = { user, jwt };
        //     // return;
        //     return;
        //   },
        //   hasBody: false,
        // });
        // console.log(data);

        // return { user: { email, nickname }, jwt } as any;
      },
    }),
    //     } else if (credentials.type === "oauth") {
    //       console.log("oauth 로그인");
    //       const jwt = {
    //         accessToken: credentials.accessToken || "tempAccess",
    //         refreshToken: credentials.refreshToken || "tempRefresh",
    //       };

    //       //
    //       // 유저정보
    //       const email = "tempEmail";
    //       const nickname = "tempNickname";
    //       credentials.email = "tempEmail";
    //       credentials.nickname = "tempNickname";

    //       const data = { user: { email, nickname }, jwt };
    //       return data as any;
    //     } else {
    //       // 잘못된 타입
    //       console.log("wrong type login");
    //       return null;
    //     }
    //   },
    // }),
  ],

  // jwt 설정
  session: {
    strategy: "jwt",
    // maxAge: 3 * 24 * 60 * 60, // 로그인 유지 기간 (=3일)
  },

  //  jwt나 세션 쓸때
  callbacks: {
    // async redirect({ url, baseUrl }) {
    //   // let result = url;
    //   // if (url.startsWith("/")) {
    //   //   result = `${baseUrl}${url}`;
    //   // }
    //   // return result;
    //   // Allows relative callback URLs
    //   console.log(`url: ${url}`);
    //   console.log(`baseUrl: ${baseUrl}`);
    //   if (url.startsWith("/")) {
    //     console.log("1");
    //     return `${baseUrl}${url}`;
    //   }
    //   // Allows callback URLs on the same origin
    //   else if (new URL(url).origin === baseUrl) {
    //     console.log("2");
    //     return url;
    //   }
    //   console.log("3");
    //   return baseUrl;
    // },

    // 로그인 시 return한 값이 user로 들어옴
    async jwt({ token, user }) {
      // try {
      //   const expireDate = 3000;

      // 로그인 시
      if (user) {
        return {
          ...token,
          ...user,
          jwt: user.jwt,
        };
        //   } else if (Date.now() < Date.now() + expireDate) {
        //     // 액세스 토큰 만료 전
        //     console.log("토큰 만료 전");
        //     console.log(token);
        //     return token;
        //   } else {
        //     console.log("토큰 만료 후");
        //     // 만료 후 리프레시 토큰으로 액세스 토큰 업데이트 요청
        //     if (!token.jwt.refreshToken) throw new Error("Missing refresh token");
        //     // 리프레시 토큰도 만료되었을 시, 데이터삭제 및 로그아웃
        //     return token;
        //     // return updateAccessToken(token.jwt.refreshToken);
        //   }
        // } catch (err) {
        //   console.log(`여기에러2 : ${err}`);
        //   return token;
        // }
      } else {
        return token;
      }
    },

    // jwt에서 return한 값이 token으로 들어옴
    async session({ session, token }) {
      // try {
      console.log(`session은 : ${session.jwt}`);
      console.log(`token은 : ${token.jwt}`);
      if (token) {
        session.jwt = token.jwt as any;
        session.user = token.user as any;
      }
      return session;
      // } catch (err) {
      //   console.log(`여기에러3 : ${err}`);
      //   return session;
      // }
    },
  },

  pages: {
    signIn: "/login",
    error: "/error",
  },
});

async function updateAccessToken(refreshToken: string) {
  try {
    const data = await requestData({
      option: "POST",
      url: `/token/update`,
      token: refreshToken,
      onSuccess: async (response: Response) => {
        const responseHeaders = response.headers;
        const responseAccessToken = responseHeaders.get("Authorization");
        const responseRefreshToken = responseHeaders.get(
          "Authorization-refresh"
        );
        if (!(responseHeaders && responseAccessToken && responseRefreshToken)) {
          throw Error("missing header or token");
        }

        // TODO: 토큰형식으로 리턴
      },
      hasBody: false,
    });
    return data as any;
  } catch (error) {
    // 문제있을시
  }
}

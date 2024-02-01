import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";

export default NextAuth({
  providers: [
    //자체 로그인
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // 외부 서버와 통신하여 유저 정보와 토큰을 가져오는 로직을 여기에 구현합니다.
        const { username, password } = credentials!;

        // 외부 서버와의 통신을 통해 유저 정보와 토큰을 가져옵니다.
        const response = await fetch(
          "https://http://localhost:3000/api/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username,
              password,
            }),
          }
        );

        const data = await response.json();

        if (data) {
          // 유저 정보와 토큰을 NextAuth.js 세션에 저장합니다.
          return {
            name: data.name,
            email: data.email,
            token: data.token,
          };
        } else {
          // 로그인 실패 시 null을 반환합니다.
          return null as any;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    }),
  ],
  //  jwt나 세션 쓸때
  callbacks: {
    async session(session, token) {
      // 세션에 토큰 정보를 추가합니다.
      session.token = token.token;
      return session;
    },
  },
  session: {
    jwt: true,
  },

  // async jwt({ token, account }) {
  //   if (account) {
  //     token.accessToken = account.access_token;
  //   }
  //   return token;
  // },
  // async session({ session, token, user }) {
  // session.accessToken = token.accessToken
  // return session
  // }
  // },
});

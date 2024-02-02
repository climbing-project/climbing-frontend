import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from 'next-auth/providers/naver';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    KakaoProvider({
        clientId: process.env.KAKAO_CLIENT_ID!,
        clientSecret: process.env.KAKAO_CLIENT_SECRET!
      }),
    NaverProvider({
        clientId: process.env.NAVER_CLIENT_ID!,
        clientSecret: process.env.NAVER_CLIENT_SECRET!
      }),

  ],
  //  jwt나 세션 쓸때
  callbacks: {
    async jwt({ token, account }) {
    if (account) {
    token.accessToken = account.access_token
    }
    return token
},
    // async session({ session, token, user }) {
    // session.accessToken = token.accessToken
    // return session
    // }
    }
});

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
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
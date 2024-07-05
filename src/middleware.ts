import { withAuth } from "next-auth/middleware";
import { jwtVerify } from "jose";

export default withAuth({
  callbacks: {
    authorized: async ({ token, req }) => {
      if (!token) return false;

      const { pathname } = req.nextUrl;
      const textEncoder = new TextEncoder();
      const secret = textEncoder.encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token.jwt.accessToken, secret);

      if (pathname.startsWith("/manage")) {
        return payload.role === "ROLE_MANAGER";
      }
      if (pathname.startsWith("/admin")) {
        return payload.role === "ROLE_ADMIN";
      }
      return true;
    },
  },
});

export const config = { matcher: ["/manage/:path*", "/admin/:path*"] };

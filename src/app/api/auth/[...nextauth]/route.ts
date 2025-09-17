import environtment from "@/config/environtment";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWTExtend, SessionExtend, UserExtend } from "@/types/Auth";
import authServices from "@/services/auth.service";

const handler = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  secret: environtment.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        identifier: { label: "identifier", type: "text" },
        password: { label: "password", type: "password" },
      },

      async authorize(
        credentials: Record<"identifier" | "password", string> | undefined
      ): Promise<UserExtend | null> {
        const { identifier, password } = credentials as {
          identifier: string;
          password: string;
        };

        const result = await authServices.login({ identifier, password });

        const accessToken = result.data.data;

        const me = await authServices.getProfileWithToken(accessToken);
        const user = me.data.data;

        if (
          accessToken &&
          result.status === 200 &&
          user._id &&
          me.status === 200
        ) {
          user.accessToken = accessToken;
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: { token: JWTExtend; user: UserExtend | null }) {
      if (user) {
        token.user = user;
      }

      return token;
    },

    async session({
      session,
      token,
    }: {
      session: SessionExtend;
      token: JWTExtend;
    }) {
      session.user = token.user;
      session.accessToken = token.user?.accessToken;
      return session;
    },
  },
});

export { handler as GET, handler as POST };

import environtment from "@/config/environtment";
import NextAuth, { Account } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWTExtend, SessionExtend, UserExtend } from "@/types/Auth";
import authServices from "@/services/auth.service";
import GoogleProvider from "next-auth/providers/google";
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

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async jwt({
      token,
      user,
      account,
    }: {
      token: JWTExtend;
      user: UserExtend | null;
      account?: Account | null;
    }) {
      if (user) {
        token.user = user;
      }

      // if (account?.provider === "google") {
      //   token.user = {
      //     _id: token.sub,
      //     name: token.name,
      //     email: token.email,
      //     picture: token.picture,
      //     provider: "google",
      //   } as UserExtend;
      // }

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

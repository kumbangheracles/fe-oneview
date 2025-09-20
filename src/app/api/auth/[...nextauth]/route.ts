import environtment from "@/config/environtment";
import NextAuth, { Account } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWTExtend, SessionExtend, UserExtend } from "@/types/Auth";
import authServices from "@/services/auth.service";
import GoogleProvider from "next-auth/providers/google";
import { UserProperties } from "@/types/User.type";
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

        if (identifier !== "google") {
          const result = await authServices.login({
            identifier: identifier,
            password: password,
          });

          const accessToken = result.data.data;
          const me = await authServices.getProfileWithToken(accessToken);

          if (result.status === 200 && me.status === 200) {
            return { ...me.data.data, accessToken };
          }
          return null;
        }

        const token = password;
        const me = await authServices.getProfileWithToken(token);

        if (me.status === 200) {
          return { ...me.data.data, accessToken: token };
        }

        return null;
      },
    }),

    GoogleProvider({
      clientId: environtment.AUTH_CLIENTID as string,
      clientSecret: environtment.AUTH_CLIENT_SECRET as string,
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
        token.expiresAt = (Date.now() + 60 * 60 * 1000) as number;
      }

      if (account?.provider === "google" && account.access_token) {
        try {
          const res = await authServices.loginWithGoogle(account.access_token);
          const userData = res.data.data;
          token.user = { ...user, ...userData };
          token.expiresAt = Date.now() + 60 * 60 * 1000;
        } catch (error) {
          console.error("Google login error", error);
        }
      }

      if (token.expiresAt && Date.now() > token.expiresAt) {
        return { user: undefined } as JWTExtend;
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
      session.user = token.user as UserProperties;
      session.accessToken = token.user?.accessToken;
      session.dataUser = token.user?.dataUser;
      return session;
    },
  },
});

export { handler as GET, handler as POST };

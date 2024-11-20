import { QwikAuth$ } from "@auth/qwik";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "~/prisma";
import GitHub from "@auth/qwik/providers/github";
import Google from "@auth/qwik/providers/google";
import Credentials from "@auth/qwik/providers/credentials";
import AuthController from "~/controllers/AuthController";
import { signInSchema } from "~/controllers/zod";

export const { onRequest, useSession, useSignIn, useSignOut } = QwikAuth$(
  () => ({
    providers: [
      Credentials({
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          const { email, password } =
            await signInSchema.parseAsync(credentials);
          const response = await AuthController.compareCredentials(
            email,
            password,
          );
          if (!response.status) return null;
          return response.userData;
        },
      }),
      GitHub,
      Google,
    ],
    adapter: PrismaAdapter(prisma),
    callbacks: {
      async session({ session, user }) {
        session.user.id = user.id;
        return session;
      },
      jwt({ token, user }) {
        if (user) {
          // User is available during sign-in
          token.id = user.id;
        }
        return token;
      },
    },
    pages: {
      signIn: "/login",
    },
  }),
);

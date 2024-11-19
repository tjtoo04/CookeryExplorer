import { QwikAuth$ } from "@auth/qwik";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "~/prisma";
import GitHub from "@auth/qwik/providers/github";
import Google from "@auth/qwik/providers/google";
import Credentials from "@auth/qwik/providers/credentials"
import AuthController from "~/controllers/AuthController";

export const { onRequest, useSession, useSignIn, useSignOut } = QwikAuth$(
  () => ({
    providers: [GitHub, Google, Credentials({
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const response = await AuthController.compareCredentials(credentials)
        return response && (response)
      },
    }),],
    adapter: PrismaAdapter(prisma),
    callbacks: {
      session({ session, user }) {
        session.user.id = user.id;
        return session;
      },
    },
    pages: {
      signIn: "/create",
    },
  }),
);

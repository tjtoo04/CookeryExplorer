import { QwikAuth$ } from "@auth/qwik";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "~/prisma";
import GitHub from "@auth/qwik/providers/github";
import Google from "@auth/qwik/providers/google";

export const { onRequest, useSession, useSignIn, useSignOut } = QwikAuth$(
  () => ({
    providers: [GitHub, Google],
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

import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import {
  routeAction$,
  zod$,
  z,
  Form,
  useNavigate,
} from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";
import { Button, Input } from "flowbite-qwik";
import BackArrow from "~/components/svg/BackArrow";
import Logo from "../../images/cookeryexplorer-favicon-black.webp?jsx";
import Image from "../../images/cdc-65_nbwiD3I4-unsplash.jpg?jsx";
import GithubLogo from "../../images/github-mark.png?jsx";
import GoogleLogo from "~/components/svg/GoogleLogo";
import { useSignIn } from "../plugin@auth";

export const useCreateUser = routeAction$(
  async (data) => {
    const prisma = new PrismaClient();
    const user = await prisma.user.create({
      data,
    });
    return user;
  },
  zod$({
    name: z.string(),
    email: z.string().email(),
  }),
);

export default component$(() => {
  const createUserAction = useCreateUser();
  const signInSig = useSignIn();
  const nav = useNavigate();
  return (
    <>
      <div class="flex h-screen w-full">
        <div class="flex w-1/2 flex-col items-center justify-center bg-sage-green">
          <div class="flex h-fit w-3/5 flex-col rounded-md bg-light-green py-[2rem] sm:py-[3rem] md:py-[4rem]">
            <div class="flex p-8">
              <div
                class="flex h-4 w-[10%] transform items-center justify-center transition duration-500 hover:scale-105 hover:cursor-pointer"
                onClick$={() => nav("/")}
              >
                <BackArrow />
              </div>
              <div class="flex h-4 w-full items-center justify-end">
                <Logo class="w-[50px]" />
              </div>
            </div>
            <div class="flex h-full w-full flex-col items-center justify-center gap-8">
              <Form
                action={createUserAction}
                class="flex w-full flex-col items-center gap-8"
              >
                <span class="text-5xl font-bold tracking-wide">Register</span>
                <Input
                  name="email"
                  class="w-4/5"
                  label="Email"
                  placeholder="Email"
                  required
                />
                <Input
                  name="password"
                  class="w-4/5"
                  label="Password"
                  placeholder="Password"
                  type="password"
                  required
                />
                <Input
                  name="confirmed_password"
                  class="w-4/5"
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  type="password"
                  required
                />
                <Button
                  class="w-4/5 border-sage-green text-sage-green hover:bg-sage-green"
                  size="md"
                  pill
                  outline
                >
                  Register
                </Button>
              </Form>
              <div class="flex h-full w-full items-center justify-center">
                <Form
                  action={signInSig}
                  class="flex w-full items-center justify-evenly"
                >
                  <input type="hidden" name="options.redirectTo" value="/" />
                  <Button
                    class="flex w-[35%] items-center border-sage-green text-sage-green hover:bg-sage-green"
                    size="md"
                    pill
                    outline
                    value={"github"}
                    name="providerId"
                  >
                    <div class="flex w-full items-center">
                      <GithubLogo class="h-[1.5rem] w-[1.5rem]" />
                      <span class="px-2">Sign In With Github</span>
                    </div>
                  </Button>
                  <Button
                    class="w-[35%] border-sage-green text-sage-green hover:bg-sage-green"
                    size="md"
                    pill
                    outline
                    value={"google"}
                    name="providerId"
                  >
                    <div class="flex w-full items-center">
                      <GoogleLogo />
                      <span class="px-2">Sign In With Google</span>
                    </div>
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
        <div class="h-full w-1/2">
          <Image class="h-full object-cover" />
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Register",
  meta: [
    {
      name: "description",
      content: "CookeryExplorer site register",
    },
  ],
};

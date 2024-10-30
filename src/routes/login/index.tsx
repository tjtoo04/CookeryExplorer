import { component$ } from "@builder.io/qwik";
import Image from "../../images/cdc-65_nbwiD3I4-unsplash.jpg?jsx";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Form, useLocation, useNavigate } from "@builder.io/qwik-city";
import { Input } from "flowbite-qwik";
import { Button } from "flowbite-qwik";
import BackArrow from "~/components/svg/BackArrow";
import Logo from "../../images/cookeryexplorer-favicon-black.webp?jsx";

export default component$(() => {
  const nav = useNavigate();
  const loc = useLocation();
  return (
    <>
      <div class="flex h-screen w-full">
        <div class="h-full w-1/2">
          <Image class="h-full object-cover" />
        </div>
        <div class="flex w-1/2 flex-col items-center justify-center bg-sage-green">
          <div class="flex h-3/5 w-3/5 flex-col rounded-md bg-light-green">
            <div class="flex p-8">
              <div
                class="flex h-4 w-[10%] transform items-center justify-center transition duration-500 hover:scale-105 hover:cursor-pointer"
                onClick$={() =>
                  loc.prevUrl ? window.history.back() : nav("/")
                }
              >
                <BackArrow />
              </div>
              <div class="flex h-4 w-full items-center justify-end">
                <Logo class="w-[50px]" />
              </div>
            </div>
            <div class="flex h-full w-full flex-col items-center justify-center">
              <Form class="flex h-full w-full flex-col items-center justify-evenly">
                <span class="text-5xl font-bold tracking-wide">Login</span>
                <Input
                  class="w-4/5"
                  label="Email"
                  placeholder="Email"
                  required
                />
                <Input
                  class="w-4/5"
                  label="Password"
                  placeholder="Password"
                  required
                />
                <Button
                  class="w-4/5 border-sage-green text-sage-green hover:bg-sage-green"
                  size="md"
                  pill
                  outline
                >
                  Login
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Login",
  meta: [
    {
      name: "description",
      content: "CookeryExplorer site login",
    },
  ],
};

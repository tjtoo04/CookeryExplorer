import { component$ } from "@builder.io/qwik";
import Image from "../../images/cdc-65_nbwiD3I4-unsplash.jpg?jsx";
import type { DocumentHead, JSONObject } from "@builder.io/qwik-city";
import {
  Form,
  routeAction$,
  useLocation,
  useNavigate,
} from "@builder.io/qwik-city";
import { Input } from "flowbite-qwik";
import { Button } from "flowbite-qwik";
import BackArrow from "~/components/svg/BackArrow";
import Logo from "../../images/cookeryexplorer-favicon-black.webp?jsx";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { createClient } from "@supabase/supabase-js";

const checkMatching = (postData: JSONObject) => {
  const password = postData.password as string;
  const confirmed_password = postData.confirmed_password as string;

  if (password !== confirmed_password) {
    return false;
  } else {
    return password;
  }
};

export const useRegisterUser = routeAction$(async (postData) => {
  const supabaseURL = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const email = postData.email as string;
  const password = checkMatching(postData);
  if (password) {
    const salt = genSaltSync(10);
    const hashed = hashSync(password, salt);

    const supabaseClient = createClient(supabaseURL!, supabaseKEY!);

    const { data, error } = await supabaseClient.auth.signUp({
      email: email,
      password: hashed,
    });

    return {
      success: error === null && true,
      data,
      error,
    };
  } else {
    return {
      message: "Passwords do not match",
    };
  }
});

export default component$(() => {
  const registerUser = useRegisterUser();
  const nav = useNavigate();
  const loc = useLocation();
  return (
    <>
      <div class="flex h-screen w-full">
        <div class="flex w-1/2 flex-col items-center justify-center bg-sage-green">
          <div class="flex h-5/6 w-3/5 flex-col rounded-md bg-light-green">
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
              <Form
                onSubmitCompleted$={() =>
                  registerUser.value?.success && nav("/")
                }
                action={registerUser}
                class="flex h-full w-full flex-col items-center justify-evenly"
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
                {registerUser.value?.message && (
                  <p>{registerUser.value.message}</p>
                )}
                {registerUser.value?.error && (
                  <>
                    <p>{registerUser.value.error.message}</p>
                  </>
                )}
              </Form>
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
  title: "Login",
  meta: [
    {
      name: "description",
      content: "CookeryExplorer site login",
    },
  ],
};

import type { Signal } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import { Link, useNavigate } from "@builder.io/qwik-city";
import Logo from "../svg/Logo";
import { useSession, useSignOut } from "~/routes/plugin@auth";

interface AuthNavbarProps {
  links: {
    title: string;
    link: string;
  }[];
  dynamicDisplay: Signal;
}

export const AuthNavbar = component$<AuthNavbarProps>((props) => {
  const signOutSig = useSignOut();
  const nav = useNavigate();
  const userId = useSession().value?.user?.id;

  return (
    <>
      <div
        class={`flex items-center justify-center transition-all duration-700 ease-in-out ${props.dynamicDisplay.value} fixed left-[50%]`}
      >
        <div class="fixed top-0 z-[100] my-4 flex w-[97dvw] items-center justify-around rounded-md bg-sage-green p-4 text-primary-font shadow-md shadow-gray-400">
          <div class="flex w-[20dvw] justify-center">
            <Logo />
          </div>
          <div class="flex w-3/5 justify-evenly ">
            {props.links.map((item, id) => {
              return (
                <>
                  {/* biome-ignore lint/suspicious/noArrayIndexKey: <explanation> */}
                  <Link key={id} class="bubble" href={item.link}>
                    {item.title}
                  </Link>
                </>
              );
            })}
          </div>
          <div class="flex w-[20dvw] justify-evenly">
            <button
              onClick$={() => {
                nav(`/profile/${userId}`);
              }}
              type="button"
              class="primary-btn"
            >
              Profile
            </button>
            <Link
              class="primary-btn"
              onClick$={() => signOutSig.submit({ redirectTo: "/" })}
            >
              Sign Out
            </Link>
          </div>
        </div>
      </div>
    </>
  );
});

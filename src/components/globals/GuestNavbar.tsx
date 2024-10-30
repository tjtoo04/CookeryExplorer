import { component$ } from "@builder.io/qwik";
import { Link, useNavigate } from "@builder.io/qwik-city";
import Logo from "../svg/Logo";

interface GuestNavbarProps {
  links: {
    title: string;
    link: string;
  }[];
}

export const GuestNavbar = component$<GuestNavbarProps>((props) => {
  const nav = useNavigate();
  return (
    <>
      <div class="flex items-center justify-center">
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
              onClick$={() => nav("/login")}
              type="button"
              class="primary-btn"
            >
              Login
            </button>
            <button
              type="button"
              class="primary-btn"
              onClick$={() => nav("/register")}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
});

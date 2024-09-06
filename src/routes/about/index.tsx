import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { GuestNavbar } from "~/components/globals/GuestNavbar";

export default component$(()=> {
    const links = [
        {
          title: "Home",
          link: "/",
        },
        {
          title: "About",
          link: "/about",
        },
        {
          title: "Demo",
          link: "/",
        },
      ];
    return (
        <>
            <GuestNavbar links={links} />
            <div>
                Hello
            </div>
        </>
    )
})

export const head: DocumentHead = {
    title: "About",
    meta: [
      {
        name: "description",
        content: "CookeryExplorer About Page",
      },
    ],
  };
  
import {
  $,
  component$,
  Slot,
  useOnDocument,
  useSignal,
} from "@builder.io/qwik";
import { useLocation, type RequestHandler } from "@builder.io/qwik-city";
import { GuestNavbar } from "~/components/globals/GuestNavbar";
import { AuthNavbar } from "~/components/globals/AuthNavbar";
import { useSession } from "./plugin@auth";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

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

export default component$(() => {
  const dynamicDisplay = useSignal<string>("flex");
  const location = useLocation();
  const userSession = useSession();

  useOnDocument(
    "wheel",
    $((event) => {
      if (event.deltaY < 0) {
        dynamicDisplay.value = "opacity-100 ";
      } else {
        dynamicDisplay.value = "opacity-0 -translate-y-40";
      }
    }),
  );

  return (
    <>
      {console.log("user", userSession)}
      {location.url.pathname !== "/create/" &&
        location.url.pathname !== "/login/" &&
        (!userSession.value?.user ? (
          <GuestNavbar dynamicDisplay={dynamicDisplay} links={links} />
        ) : (
          <AuthNavbar links={links} />
        ))}
      <Slot />;
    </>
  );
});

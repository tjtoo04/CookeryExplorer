import { component$, useSignal } from "@builder.io/qwik";
import { Form, type DocumentHead } from "@builder.io/qwik-city";
import { Input } from "flowbite-qwik";
import { Button } from "flowbite-qwik";
import { GuestNavbar } from "~/components/globals/GuestNavbar";
import SearchIcon from "~/components/svg/SearchIcon";

const getRecipe = async (query: string) => {
  const appID = import.meta.env.EDAMAM_APP_ID;
  const appKey = import.meta.env.EDAMAM_APP_KEY;
  const recipeData = await fetch(
    `https://api.edamam.com/api/recipes/v2?type=public&?app_id=${appID}app_key=${appKey}&q=${query}`,
  );

  return recipeData.json();
};

export default component$(() => {
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

  const val = useSignal("");

  return (
    <>
      <GuestNavbar links={links} />
      <header class="flex h-screen items-center justify-center bg-[url('/src/images/jason-briscoe-7MAjXGUmaPw-unsplash.jpg')] bg-cover">
        <div class="flex h-screen w-screen flex-col items-center justify-center rounded-md bg-light-green/50 p-4">
          <h1 class="xs:text-6xl p-4 sm:text-7xl md:text-8xl lg:text-9xl">
            Look for any recipe
          </h1>
          <Form
            onSubmit$={() => {
              const data = getRecipe(val.value);
              data.then((val) => {
                console.log(val);
              });
            }}
            class="flex w-full justify-center"
          >
            <Input
              name="query"
              bind:value={val}
              placeholder="Search for a recipe here"
              size="lg"
              class="z-0 mt-36 w-4/5 border-sage-green focus:border"
              prefix={<SearchIcon />}
              suffix={
                <Button type="submit" class="bg-sage-green">
                  Search
                </Button>
              }
            />
          </Form>
        </div>
      </header>
      <div class="flex h-screen items-center justify-center">
        <h1>Content</h1>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "CookeryExplorer",
  meta: [
    {
      name: "description",
      content: "CookeryExplorer Home Page",
    },
  ],
};

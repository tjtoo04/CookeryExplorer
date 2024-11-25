import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { Form, type DocumentHead } from "@builder.io/qwik-city";
import type { ButtonVariant } from "flowbite-qwik";
import { Input } from "flowbite-qwik";
import { Button } from "flowbite-qwik";
import { IconSearchOutline } from "flowbite-qwik-icons";
import { type RecipeDataResponseType } from "~/types/types";

const getRecipe = async (query: string) => {
  const appID = import.meta.env.EDAMAM_APP_ID;
  const appKey = import.meta.env.EDAMAM_APP_KEY;
  const recipeData = await fetch(
    `https://api.edamam.com/api/recipes/v2?type=public&?app_id=${appID}app_key=${appKey}&q=${query}`,
  );

  return recipeData.json();
};

export default component$(() => {
  const val = useSignal("");
  const suggestionVal = useSignal<RecipeDataResponseType>();
  const isTyping = useSignal(false);
  const isLoading = useSignal(false);
  const showResults = useSignal("opacity-0 -translate-y-6");

  useTask$(({ track }) => {
    const typingStatus = track(isTyping);
    const update = () => {
      if (typingStatus) {
        const timeoutId = setTimeout(() => {
          isTyping.value = false;
        }, 700);
        return () => clearTimeout(timeoutId);
      }
    };
    update();
  });

  useTask$(({ track }) => {
    const value = track(val);
    const typingStatus = track(isTyping);
    const update = async () => {
      if (value == "") {
        suggestionVal.value = undefined;
        showResults.value = "opacity-0 -translate-y-6";
        return;
      }

      if (!typingStatus && value) {
        isLoading.value = true;
        showResults.value = "opacity-100 translate-y-6"
        suggestionVal.value = undefined;
        const data = await getRecipe(val.value);
        if (data) {
          suggestionVal.value = data;
          isLoading.value = false;
        }

      }
    };
    update();
  });

  return (
    <>
      <header class="flex h-screen items-center justify-center bg-[url('/src/images/jason-briscoe-7MAjXGUmaPw-unsplash.jpg')] bg-cover">
        <div class="flex h-screen w-screen flex-col items-center justify-center rounded-md bg-light-green/50 p-4">
          <h1 class="xs:text-6xl p-4 sm:text-7xl md:text-8xl lg:text-9xl">
            Look for any recipe
          </h1>
          <Form
            onSubmit$={() => {
              const data = getRecipe(val.value);
              data.then((res) => {
                val.value = res;
                console.log(res);
              });
            }}
            class="flex w-full justify-center"
          >
            <div class="flex w-full flex-col items-center justify-center">
              <Input
                name="query"
                bind:value={val}
                onKeyPress$={() => (isTyping.value = true)}
                placeholder="Search for a recipe here"
                size="lg"
                class="z-0 mt-36 w-4/5 border-sage-green focus:border"
                prefix={<IconSearchOutline />}
                suffix={
                  <Button
                    pill
                    size="sm"
                    type="submit"
                    color={"sage-green" as ButtonVariant}
                    class="primary-btn"
                  >
                    Search
                  </Button>
                }
              />
              {/* List of suggestions */}
              <div
                class={`relative w-4/5 rounded-md bg-white transition-all duration-500 ease-in-out ${showResults.value}`}
              >
                <ol>
                  {isLoading.value && <li>Loading....</li>}
                  {suggestionVal.value?.hits &&
                    suggestionVal.value.hits.map((item, index) => {
                      return <li key={index}>{item.recipe.label}</li>;
                    })}
                </ol>
              </div>
            </div>
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

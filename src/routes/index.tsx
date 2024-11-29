import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { Form, type DocumentHead } from "@builder.io/qwik-city";
import type { ButtonVariant } from "flowbite-qwik";
import { Input } from "flowbite-qwik";
import { Button } from "flowbite-qwik";
import {
  IconSearchOutline,
  IconChervonDoubleRightSolid,
} from "flowbite-qwik-icons";
import type { RecipeDataHitsType } from "~/types/types";
import { type RecipeDataResponseType } from "~/types/types";

const getRecipe = async (query: string, nextLink = false, nextUrl = "") => {
  const appID = import.meta.env.EDAMAM_APP_ID;
  const appKey = import.meta.env.EDAMAM_APP_KEY;
  if (!nextLink && query) {
    const recipeData = await fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&?app_id=${appID}app_key=${appKey}&q=${query}`,
    );
    return recipeData.json();
  } else {
    const recipeData = await fetch(nextUrl);
    return recipeData.json();
  }
};

export default component$(() => {
  const val = useSignal("");
  const suggestionVal = useSignal<RecipeDataResponseType>();
  const suggestionArr = useSignal<RecipeDataHitsType[]>([]);
  const isTyping = useSignal(false);
  const isLoading = useSignal(false);
  const showResults = useSignal("opacity-0 -translate-y-6");
  const timeoutId = useSignal<object>();
  const suggestionRef = useSignal<Element>();

  useTask$(({ track }) => {
    let value = track(val);
    const typingStatus = track(isTyping);
    const update = async () => {
      value = value.trim();
      if (value == "") {
        suggestionVal.value = undefined;
        showResults.value = "opacity-0 -translate-y-6";
        return;
      }

      if (!typingStatus && value) {
        isLoading.value = true;
        showResults.value = "opacity-100 translate-y-6";
        suggestionVal.value = undefined;
        const data = await getRecipe(val.value.trim());
        if (data) {
          suggestionVal.value = data;
          suggestionArr.value.push(...suggestionVal.value!.hits);
          console.log(data);
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
              const data = getRecipe(val.value.trim());
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
                onKeyPress$={() => {
                  clearTimeout(timeoutId.value as NodeJS.Timeout);
                  isTyping.value = true;
                  timeoutId.value = setTimeout(() => {
                    isTyping.value = false;
                  }, 1000);
                }}
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
                ref={suggestionRef}
                class={`relative max-h-56 w-4/5 overflow-auto rounded-md bg-white transition-all duration-500 ease-in-out ${showResults.value}`}
                onScroll$={() => {
                  const div = suggestionRef;
                  if (
                    div.value!.scrollHeight -
                      div.value!.clientHeight -
                      div.value!.scrollTop <
                    1
                  ) {
                    if (!document.getElementById("loading-bar")) {
                      const loadingBarEl = document.createElement("li");
                      loadingBarEl.setAttribute(
                        "class",
                        "flex items-center justify-center p-4 text-slate-500",
                      );
                      loadingBarEl.setAttribute("id", "loading-bar");
                      loadingBarEl.innerHTML = "Loading more...";
                      div.value!.append(loadingBarEl);
                    }

                    if (suggestionVal.value?._links.next) {
                      const next = getRecipe(
                        "",
                        true,
                        suggestionVal.value._links.next.href,
                      );
                      next.then((data) => {
                        if (data) {
                          document.getElementById("loading-bar")?.remove();
                          suggestionVal.value = data;
                          suggestionArr.value.push(
                            ...suggestionVal.value!.hits,
                          );
                        }
                      });
                    } else {
                      document.getElementById("loading-bar")?.remove();
                    }
                  }
                }}
              >
                <ol>
                  {isLoading.value && <li>Loading....</li>}
                  {suggestionVal.value?.hits &&
                    suggestionArr.value.map((item, index) => {
                      return (
                        <li
                          class="flex cursor-pointer items-center p-4 hover:bg-slate-200/75"
                          key={index}
                        >
                          <img
                            width={80}
                            height={60}
                            src={item.recipe.images.SMALL.url}
                            alt={item.recipe.label}
                            class="mr-4"
                          />
                          <span class="ml-4 flex w-full">
                            {item.recipe.label}
                          </span>
                          <span class="mr-2 justify-self-end">
                            <IconChervonDoubleRightSolid class="w-12" />
                          </span>
                        </li>
                      );
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

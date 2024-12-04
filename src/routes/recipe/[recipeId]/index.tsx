/* eslint-disable qwik/jsx-img */
import { component$, useSignal } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

export const useGetRecipe = routeLoader$(async ({ params, status }) => {
  const appID = import.meta.env.VITE_EDAMAM_APP_ID;
  const appKey = import.meta.env.VITE_EDAMAM_APP_KEY;
  console.log(appID);
  console.log(appKey);
  const recipeId = params.recipeId;

  const res = await fetch(
    `https://api.edamam.com/api/recipes/v2/${recipeId}/?type=public&app_id=${appID}&app_key=${appKey}`,
  );
  const recipeDetails = await res.json();
  console.log(recipeDetails);
  return recipeDetails;
});

const tabs = ["Nutritional Information", "B", "C", "D"];

export default component$(() => {
  const recipeInformation = useGetRecipe();
  const selectedTab = useSignal<number>(0);
  return (
    <>
      <div class="flex h-screen w-full flex-col items-center justify-center">
        <div class="mt-32 h-full w-[97%] rounded-md border border-[sage-green] p-4">
          <div class="flex h-[10%] items-center justify-between border-b-[1px] p-2">
            <h1 class="p-4 text-3xl">{recipeInformation.value.recipe.label}</h1>
          </div>
          {/* Content Container */}
          <div class="flex h-[90%] w-full">
            <div class="flex h-full w-1/2 items-center justify-center border-r-[1px] p-4">
              <img
                class="h-full w-3/4 object-contain"
                src={recipeInformation.value.recipe.images.REGULAR.url}
                alt="image"
              />
            </div>
            <div class="h-full w-1/2">
              <div class="flex items-center justify-evenly bg-sage-green text-primary-font p-1">
                {tabs.map((tab, index) => {
                  return (
                    <span
                      onClick$={()=> selectedTab.value = index}
                      class={
                        `bubble flex-1 text-center ` +
                        (selectedTab.value === index && "active")
                      }
                      key={index}
                    >
                      {tab}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

/* eslint-disable qwik/jsx-img */
import {
  component$,
  createContextId,
  useContextProvider,
  useSignal,
  useStore,
} from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import NutritionalInfo from "~/components/NutritionalInfo";
import {
  type RecipeInformation,
  type NutritionalInformation,
  type RecipeIngredients,
} from "~/types/types";
import Ingredients from "~/components/RecipeIngredients";

export const useGetRecipe = routeLoader$(async ({ params }) => {
  const appID = import.meta.env.VITE_EDAMAM_APP_ID;
  const appKey = import.meta.env.VITE_EDAMAM_APP_KEY;
  const recipeId = params.recipeId;

  const res = await fetch(
    `https://api.edamam.com/api/recipes/v2/${recipeId}/?type=public&app_id=${appID}&app_key=${appKey}`,
  );
  const recipeDetails = await res.json();
  return recipeDetails;
});
export const NutritionInfoContext = createContextId<NutritionalInformation>(
  "recipe.nutrition.info",
);
export const IngredientContext =
  createContextId<RecipeIngredients>("recipe.ingredient");

export const RecipeInformationContext =
  createContextId<RecipeInformation>("recipe.information");

const tabs = ["Nutritional Information", "Ingredients"];

export default component$(() => {
  const recipeInformation = useGetRecipe();
  const selectedTab = useSignal<number>(0);
  const nutritionInfo = useStore<NutritionalInformation>({
    calories: recipeInformation.value.recipe.calories,
    diet_labels: recipeInformation.value.recipe.dietLabels,
    total_daily: recipeInformation.value.recipe.totalDaily,
    total_nutrients: recipeInformation.value.recipe.totalnutrients,
    cautions: recipeInformation.value.recipe.cautions,
    health_labels: recipeInformation.value.recipe.healthLabels,
  });
  const recipeIngredients = useStore<RecipeIngredients>({
    ingredient_lines: recipeInformation.value.recipe.ingredientLines,
    ingredients: recipeInformation.value.recipe.ingredients,
  });
  const informationRecipe = useStore<RecipeInformation>({
    cuisine_type: recipeInformation.value.recipe.cuisineType,
    dish_type: recipeInformation.value.recipe.dishType,
    meal_type: recipeInformation.value.recipe.mealType,
  });
  useContextProvider(NutritionInfoContext, nutritionInfo);
  useContextProvider(IngredientContext, recipeIngredients);
  useContextProvider(RecipeInformationContext, informationRecipe);
  return (
    <>
      <div class="flex h-screen w-full flex-col items-center justify-center">
        <div class="mt-32 h-full w-[97%] rounded-md border border-[sage-green] p-4">
          <div class="flex h-[10%] items-center justify-between border-b-[1px] p-2">
            <h1 class="p-4 text-3xl">{recipeInformation.value.recipe.label}</h1>
          </div>
          {/* Content Container */}
          <div class="flex h-[90%] w-full">
            <div class="flex h-full w-2/5 items-center justify-center border-r-[1px] p-4">
              <img
                class="h-full w-3/4 object-contain"
                src={recipeInformation.value.recipe.images.REGULAR.url}
                alt="image"
              />
            </div>
            <div class="h-full w-3/5">
              <div class="flex items-center justify-evenly bg-sage-green p-1 text-primary-font">
                {tabs.map((tab, index) => {
                  return (
                    <span
                      onClick$={() => (selectedTab.value = index)}
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
              {selectedTab.value === 0 ? (
                <NutritionalInfo />
              ) : selectedTab.value === 1 ? (
                <Ingredients />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

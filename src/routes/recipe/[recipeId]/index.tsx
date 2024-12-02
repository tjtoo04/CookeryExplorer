import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

export const useGetRecipe = routeLoader$(async ({ params, status }) => {
  const recipeId = params.recipeId;
});

export default component$(() => {
  return <>hello</>;
});

import { component$, useContext } from "@builder.io/qwik";
import { IngredientContext } from "~/routes/recipe/[recipeId]";

export default component$(() => {
  const recipeIngredients = useContext(IngredientContext);
  console.log(recipeIngredients);
  return (
    <div class="h-full w-full">
      HELOOOOO
      {recipeIngredients.ingredient_lines.map((item) => {
        return <span>{item}</span>;
      })}
    </div>
  );
});

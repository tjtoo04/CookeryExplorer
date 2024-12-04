import { component$, useContext } from "@builder.io/qwik";
import { NutritionInfoContext, RecipeInformationContext } from "~/routes/recipe/[recipeId]";

export default component$(() => {
  const nutritionInfo = useContext(NutritionInfoContext);
  const recipeInfo = useContext(RecipeInformationContext);
  console.log(nutritionInfo);
  return (
    <div class="h-full w-full">
      HELOOOOO
      {recipeInfo.cuisine_type.map((item)=> item)}
      {nutritionInfo.cautions.map((item) => {
        return <span>{item}</span>;
      })}
    </div>
  );
});

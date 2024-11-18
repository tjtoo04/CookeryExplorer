import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <div>Hello</div>
    </>
  );
});

export const head: DocumentHead = {
  title: "About",
  meta: [
    {
      name: "description",
      content: "CookeryExplorer About Page",
    },
  ],
};

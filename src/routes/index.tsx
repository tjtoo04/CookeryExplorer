import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
	return (
		<>
			<header class="flex justify-center items-center h-screen">
				<div>
					<h1 class="xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl">Look for any recipe</h1>
					<input type="text" name="search"/>
				</div>
			</header>
			<div class="flex justify-center items-center h-screen">
				<h1>Content</h1>
			</div>
		</>
	);
});

export const head: DocumentHead = {
	title: "Welcome to Cookery Explorer",
	meta: [
		{
			name: "description",
			content: "Qwik site description",
		},
	],
};

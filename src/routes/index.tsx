import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { GuestNavbar } from "~/components/globals/GuestNavbar";

const links = [
	{
		title: "Home",
		link: "/",
	},
	{
		title: "About",
		link: "/",
	},
	{
		title: "Demo",
		link: "/",
	},
];

export default component$(() => {
	return (
		<>
			<GuestNavbar links={links} />
			<header class="flex justify-center items-center h-screen">
				<h1>Look for any recipe</h1>
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

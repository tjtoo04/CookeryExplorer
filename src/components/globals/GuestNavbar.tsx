import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

interface GuestNavbarProps {
	links: {
		title: string;
		link: string;
	}[];
}

export const GuestNavbar = component$<GuestNavbarProps>((props) => {
	return (
		<>
			<div class="flex justify-center items-center">
				<div class="flex w-[97dvw] bg-sage-green p-4 rounded-md text-primary-font justify-around items-center my-4 shadow-md shadow-gray-400 top-0 fixed">
					<div class="flex w-[20dvw] justify-center">
						<img src="" alt="CookeryExplorer" width="150" height="50"/>
					</div>
					<div class="flex w-3/5 justify-evenly ">
						{props.links.map((item, id) => {
							return (
								<>
									{/* biome-ignore lint/suspicious/noArrayIndexKey: <explanation> */}
									<Link key={id} class="bubble" href={item.link}>
										{item.title}
									</Link>
								</>
							);
						})}
					</div>
					<div class="w-[20dvw] flex justify-evenly">
						<button type="button" class="primary-btn">
							Login
						</button>
						<button type="button" class="primary-btn">
							Register
						</button>
					</div>
				</div>
			</div>
		</>
	);
});

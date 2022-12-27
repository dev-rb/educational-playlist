import { createRouteData } from 'solid-start';

export function routeData() {
	return createRouteData(() => {});
}

export default function Home() {
	return (
		<main>
			<h1 class="text-sm color-white"> Test </h1>
		</main>
	);
}

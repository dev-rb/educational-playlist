import {
	createEffect,
	createSignal,
	For,
	onMount,
	Resource,
	Suspense,
} from 'solid-js';
import { createRouteData, useRouteData } from 'solid-start';

export function routeData(): Resource<any[]> {
	return createRouteData(async () => {
		const result = await fetch(
			`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails&id=UC9RM-iSvTu1uPJb8X5yp3EQ&key=${
				import.meta.env.VITE_YOUTUBE_API_KEY
			}`
		);
		const data = (await result.json()).items[0].contentDetails.relatedPlaylists
			.uploads;
		if (data.length) {
			const playlistInfo = await fetch(
				`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&playlistId=${data}&maxResults=20&key=${
					import.meta.env.VITE_YOUTUBE_API_KEY
				}`
			);
			return (await playlistInfo.json()).items;
		}
	});
}

export default function Home() {
	const videos = useRouteData<typeof routeData>();

	const [ref, setRef] = createSignal<HTMLIFrameElement>();

	const [currentVideo, setCurrentVideo] = createSignal<string>('MY8AB1wYOtg');

	return (
		<main class="w-full h-full">
			<div class="flex items-center justify-center gap-4 m-auto h-full w-full">
				<iframe
					ref={setRef}
					id="player"
					src={`http://www.youtube.com/embed/${currentVideo()}?autoplay=1`}
					width="640"
					height="390"
					allowfullscreen
					frameBorder="0"
				></iframe>
				<div class="flex flex-col gap-4 max-h-120 overflow-y-scroll custom-scrollbar bg-dark-8 p-4">
					<Suspense>
						<For each={videos()}>
							{(video) => (
								<button
									class="color-white appearance-none p-4 bg-dark-4 text-xs border-none rounded-sm cursor-pointer max-w-60"
									onClick={() => setCurrentVideo(video.contentDetails.videoId)}
								>
									{video.snippet.title}
								</button>
							)}
						</For>
					</Suspense>
				</div>
			</div>
		</main>
	);
}

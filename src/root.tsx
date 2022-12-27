// @refresh reload
import { Suspense } from 'solid-js';
import {
	A,
	Body,
	ErrorBoundary,
	FileRoutes,
	Head,
	Html,
	Meta,
	Routes,
	Scripts,
	Title,
} from 'solid-start';
import './root.css';
import 'uno.css';

export default function Root() {
	return (
		<Html lang="en">
			<Head>
				<Title>Educ8</Title>
				<Meta charset="utf-8" />
				<Meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<Body>
				<Suspense>
					<ErrorBoundary>
						<Routes>
							<FileRoutes />
						</Routes>
					</ErrorBoundary>
				</Suspense>
				<Scripts />
				<script src="https://www.youtube.com/iframe_api"></script>
			</Body>
		</Html>
	);
}

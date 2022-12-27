import solid from 'solid-start/vite';
import { defineConfig } from 'vite';
import uno from 'unocss/vite';

export default defineConfig({
	plugins: [solid(), uno()],
});

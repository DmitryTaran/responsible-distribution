import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import 'dotenv/config';
import { devEnv } from './config/env-config/envs';

export default defineConfig({
	plugins: [react()],
	define: devEnv,
	resolve: {
		alias: {
			'app': '/src/app',
			'entities': '/src/entities',
			'features': '/src/features',
			'pages': '/src/pages',
			'shared': '/src/shared',
			'widgets': '/src/widgets',
		},
	},
});

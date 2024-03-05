export default (excludedRegex: RegExp) => ({
	test: /\.[jt]sx?$/,
	exclude: excludedRegex,
	loader: 'esbuild-loader',
	options: {
		target: 'es2015',
	},
})
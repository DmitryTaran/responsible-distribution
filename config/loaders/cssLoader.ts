export default (excludedRegex: RegExp) => ({
	test: /\.css$/,
	exclude: excludedRegex,
	use: [
		'style-loader',
		'css-loader',
		{
			loader: 'esbuild-loader',
			options: {
				minify: true,
			},
		},
	],
})
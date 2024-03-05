export default (excludedRegex: RegExp) => ({
	test: /\.module\.scss$/,
	exclude: excludedRegex,
	use: ['style-loader',
		{
			loader: 'css-loader',
			options: {
				modules: {
					localIdentName: '[local]--[hash:base64:5]',
				},
			},
		},
		'sass-loader',
	],
})
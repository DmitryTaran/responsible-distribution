export default (excludedRegex: RegExp) => ({
	test: /\.(png|jp(e*)g|gif)$/,
	exclude: excludedRegex,
	type: 'asset/resource',
})
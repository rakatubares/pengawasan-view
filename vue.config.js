// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	lintOnSave: false,
	runtimeCompiler: true,
//   configureWebpack: {
//     //Necessary to run npm link https://webpack.js.org/configuration/resolve/#resolve-symlinks
//     resolve: {
//        symlinks: false
//     }
//   },
	configureWebpack: {
		// plugins: [
		// 	new BundleAnalyzerPlugin()
		// ],
		optimization: {
			runtimeChunk: 'single',
			splitChunks: {
				chunks: 'all',
				maxInitialRequests: Infinity,
				minSize: 0,
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name(module) {
							const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
							return `npm.${packageName.replace('@', '')}`;
						},
					},
				},
			},
		},
	},
	transpileDependencies: [
		'@coreui/utils',
		'@coreui/vue'
	]
}

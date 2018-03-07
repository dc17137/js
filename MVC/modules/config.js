require.config({
	baseUrl: './modules',
	// css插件
	map: {
		'*': {
			css: 'lib/css'
		}
	},
	// 将MVC模块化
	shim: {
		'lib/MVC': {
			exports: 'MVC'
		}
	}
})
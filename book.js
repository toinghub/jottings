/*
 * @Author: xiangzhenxing
 * @Date: 2023-08-31 15:26:24
 * @LastEditors: xiangzhenxing
 * @LastEditTime: 2023-08-31 16:16:44
 * @Description:
 */
module.exports = {
	// 书籍信息
	title: "课堂随笔",
	description: "日常课堂的笔记记录",
	isbn: "图书编号",
	author: "作者",
	language: "zh-hans",

	// 插件列表
	plugins: [
		"-lunr",
		"-search",
		"search-pro",
		"code",
		"expandable-chapters",
		"theme-lou",
		"lightbox",
	],

	// 插件全局配置
	pluginsConfig: {
		code: {
			copyButton: true,
		},
		"theme-lou": {
			// color: "#FF4848", // 主题色
			color: "#20A3FF", // 主题色
			favicon: "static/favicon.ico", // favicon图标
			logo: "static/logo.png", // 顶部左侧图标
			appleTouchIconPrecomposed152: "static/apple.png", // apple图标
			copyrightLogo: "assets/copyright.png", // 底部水印LOGO
			"search-placeholder": "搜索", // 搜索框默认文本
			"book-summary-title": "说明文档", // 目录标题
			"book-anchor-title": "", // 本章目录标题
			"hide-elements": [
				".summary .gitbook-link",
				".summary .divider",
				".book-anchor-title",
				".title",
				".book-summary-title",
			], // 需要隐藏的标签
		},
		lightbox: {
			includeJQuery: false,
			sameUuid: true,
			options: {
				resizeDuration: 200,
				wrapAround: true,
			},
		},
	},

	// 模板变量
	variables: {
		// 自定义
	},
};

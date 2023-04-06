# tsconfig

```json
{
	"compilerOptions": {
		"target": "ESNext", //遵循那个版本的语法es5 es6
		"useDefineForClassFields": true, //是否使用定义类字段
		"module": "ESNext", //编译后要遵循的模块规则
		"moduleResolution": "Node", //选择模块解析策略，有'node'和'classic'两种类型
		"strict": true, //是否启动所有类型检查
		"jsx": "preserve", //指定jsx代码用于的开发环境: 'preserve', 'react-native', or 'react'
		"resolveJsonModule": true, //允许导入带有“json扩展名的模块
		"isolatedModules": true, //将每个文件作为单独的模块
		"esModuleInterop": true, //允许export=导出，由import from 导入
		"lib": ["ESNext", "DOM"], //包含在编译中的库文件
		"skipLibCheck": true, //// 所有声明文件（*.d.ts）的类型检查，解决打包不报错
		"noEmit": true, //不输出任何文件
		"skipDefaultLibCheck": true, //是否跳过默认库声明文件的类型检查
		"baseUrl": "./", //解析非绝对模块名的基准目录
		"paths": {
			//	设置路径映射 路径别名
			"@": ["src"],
			"@/*": ["src/*"],
			"@comp/*": ["src/components/*"],
			"@utils/*": ["src/utils/*"],
			"@interfaces/*": ["src/types/*"],
			"@stores/*": ["src/stores/*"],
			"@imgs/*": ["src/assets/images/*"],
			"@hooks/*": ["src/hooks/*"]
		},
		"types": ["vite/client"] //加载的声明文件包
	},
	"include": [
		//指定被编译文件所在的目录。
		"src/**/*.ts",
		"src/**/*.d.ts",
		"src/**/*.tsx",
		"src/**/*.vue",
		"shims-vue.d.ts"
	],
	"references": [
		//项目引用，它允许将 TS 程序组织成更小的部分
		{
			"path": "./tsconfig.node.json"
		}
	]
}

```


# [vite](https://cn.vitejs.dev/guide/why.html)

# vite与webpack的区别

### webpack

* 支持commonjs和esmdule两种规范
* 侧重点是兼容性
* 统一模块化代码时，会将所有的依赖全部读一遍

### vite

* 仅支持esmdule规范
* 侧重点是浏览器端的开发体验
* 按需加载所需的页面，减少加载时间



# 依赖预构建

## 路径补全

* 在处理中，遇到有非绝对路径或者相对路径，则会进行路径补全
* 找寻依赖的过程是由当前目录依次向上查找，直到搜寻到根目录或找到对应依赖为止

```js
import _ from "lodash"
//相等
imprt _ from "/node_modeles/.vite/lodash"
```

### 作用

* vite会找到对应的依赖，然后调用`esbuild`，将其他规范的代码转换成esmodule规范，然后放到当前目录下面（node_modules/.vite/），同时对esmodule规范的各个模块进行统一集成

* 依赖预构建仅适用于开发模式，并使用 `esbuild` 将依赖项转换为 ES 模块。在生产构建中，将使用 `@rollup/plugin-commonjs`。 

### 解决的问题：

1. 将不同的三方包中会有不同的导出格式进行统一
2. 对路径的处理可以直接进行使用.vite/，方便路径重新
3. 解决网络多包传入性能问题（一个包可能有无数个引用依赖），无论有多少个额外的export 和 import，vite都尽可能的将它们集成，最后只生成一个或者多个模块（将需要引入的额外依赖，修改代码，使其按需加载）



# 配置文件

## 语法提示配置

`defineConfig `vite代码提示

```css
import { defineConfig } from "vite";
export default defineConfig()=>{}
```

## 环境处理

```js
import { defineConfig, ConfigEnv, UserConfig } from "vite";
import viteBaseConfig from "./vite.base.config"
import viteDevConfig from "./vite.dev.config"
import viteProdsConfig from "./vite.prod.config"

const envResolver = {
  "build": () => {
    return { ...viteBaseConfig, ...viteDevConfig }
  },
  "server": () => {
    return { ...viteBaseConfig, ...viteProdsConfig }
  },
}

export default defineConfig(({ mode, command }: ConfigEnv): UserConfig => {
  return
})
//ConfigEnv  传递的类型 
//command:'build' | 'serve' 当前所处环境
export default defineConfig(({ mode, command }: ConfigEnv): UserConfig => {
  return  envResolver[command]()
})
```

## 环境变量

> 指定模式的文件（例如 `.env.production`）会比通用形式的优先级更高 （例如 `.env`）。

| .env                  | \# 所有情况下都会加载                      |
| --------------------- | ------------------------------------------ |
| **.env.local**        | **\# 所有情况下都会加载，但会被 git 忽略** |
| **.env.[mode]**       | **\# 只在指定模式下加载**                  |
| **.env.[mode].local** | **\# 只在指定模式下加载，但会被 git 忽略** |

#### 服务端(vite.config.js)

> vite是通过`dotenv`的第三方库解析

##### dotenv

`dotenv`自动读取.env文件，并且将其变量注入到`process`(node全局对象)下

##### loadEnv

> mode  -- package.json文件命令行 --mode 后面的内容
>
> process.cwd()  -- 返回当前node进程的工作目录
>
> prefixes  -- 更改加载的默认前缀（默认： VITE_ ）

##### 步骤：

1. 找到.env文件，解析其中变量，并放进一个对象
2. 将传入的mode拼接成 `.dev.${mode}`，根据提供的目录(process.cwd())去取对应的配置文件，并放进一个对象
3. 注意：后者的对象读覆盖前者的对象

```js
import { loadEnv } from 'vite'

export default defineConfig(({ mode}: ConfigEnv): UserConfig => {
 const viteEnv = loadEnv(mode, process.cwd(), '')
})
```

#### 客户端

* Vite 在一个特殊的 **`import.meta.env`** 对象上暴露环境变量 
* 默认 `VITE_`为前缀，可在`config`中使用`envPrefix`更改默认前缀



## 加载静态资源

> 本质上做的事情是一个字符串的替换

* `path.resolv`将路径适配成服务端可识别的
* `__dirname`始终返回当前文件所在的目录

```CSS
import { resolve } from "path";
resolve: {
      alias: [
        { find: "@", replacement: resolve(__dirname, "./src") },
      ]
    },
```

## vite插件

> 在生命周期的不同阶段中去调用不同的插件以达到不用的目的

#### [vite-aliases](https://github.com/subwaytime/vite-aliases)

> 检测当前目录下包括src在内的所有文件夹，并且自动生成别名
>
> 使用`vite-aliases`,就不需要`resolve.alias`了

```js
plugins: [
      ViteAliases()
    ]
```

####  **[vite-plugin-html](https://github.com/vbenjs/vite-plugin-html)**

> 动态的去控制整个html文件的内容
>
> 本质上是读取文件，字符串替换

```js
createHtmlPlugin({
     inject: { data: { title: '主页', } },//html中的title
})
```

### [vite独有钩子](https://cn.vitejs.dev/guide/api-plugin.html#vite-specific-hooks)

```js
plugins: [{
 config(options){}, //解析 Vite 配置前调用
 configureServer(server){ server.middlewares.user(()=>{}) }, //配置开发服务器的钩子
}]
```

### 性能优化

#### 分包策略

##### 定制分包条件

> 把不会常规更新的文件，单独打包处理

```js
 build: { 
      rollupOptions: { 
        output:{
           manualChunks:(id:string)=>{//id：文件名
               // 默认环境在es6之前，可在tsconfig文件里compilerOptions.lib配置
               if(id.includes("node_modules")){
                   return 'vendor' //vendor  打包后的单独文件名
               }
           }
        },
      },
    },
```

##### 多出口分包

> 一个项目有多个出口时，配置对应的html文件

```js
build: { 
      rollupOptions: { 
       input:{
           main:path.resolve(_dirname,'./index.html'),
           product:path.resolve(_dirname,'./product.html')
       }
      },
    },
```

#### gzip压缩 -- vite-plugin-compression

> 将所有的静态文件压缩，减少体积
>
> 得到.gz文件，浏览器会花费直接进行解压，最好设置压缩门槛

```js
viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: "gzip",
        ext: ".gz"
}),
```

#### cdn加速  -- 内容分发网络

> 将以来的第三方模块，写成cdn形式，保证自己代码的小体积

#####  [vite-plugin-cdn-import](https://github.com/MMF-FE/vite-plugin-cdn-import) 

```js
import importToCDN from 'vite-plugin-cdn-import'

 plugins: [
        importToCDN({
            modules: [
                {
                    name: 'react', //需要 CDN 加速的包名称
                    var: 'React', //全局分配给模块的变量
                    path: `umd/react.production.min.js`,//指定 CDN 上的加载路径
                }
            ],
        }),
    ],
```



## 处理跨域

> 跨域限制是服务器响应了，但是浏览器在中间拦截了
>
> 发送请求是不会被拦截的

```js
server: {
	// 服务器主机名，如果允许外部访问，可设置为 "0.0.0.0"
	host: "0.0.0.0",
	port: 9032,
	cors: true,
	// 跨域代理配置
	proxy: {
		"/api": {
			target: "http://47.108.254.19:8001/", //重定向地址
			changeOrigin: true,
			rewrite: (path) => path.replace(/^\/api/, "") //删除请求地址中多余的字段
		}
	}
},
```



# vite.config.js

```js
import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import viteCompression from "vite-plugin-compression";
import { resolve } from "path";


export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const viteEnv = loadEnv(mode, process.cwd(), "");
  return {
    resolve: {
      alias: [
        { find: "@", replacement: resolve(__dirname, "./src") },
      ]
    },
    server: {
      // 服务器主机名，如果允许外部访问，可设置为 "0.0.0.0"
      host: "0.0.0.0",
      port: 9032,
      cors: true,
      // 跨域代理配置
      proxy: {
        "/api": {
          target: "http://47.108.254.19:8001/", //test/
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "")
        }
      }
    },
    optimizeDeps: {
      exclude: [], // 将指定数组中的依赖不进行依赖预构建
    },
    envPrefix: 'ENV_',//更改env文件获取变量默认前缀
    css: {
      preprocessorOptions: { //配置css预处理器
        less: { //整个配置对象会给到less的执行参数(全局参数)中去 -- 可以写入less的命令行语句
          additionalData: `@import "@/assets/styles/parameter.less";` //引入附加的less文件
        }
      },
      postcss: {}, //配置关于postcss的内容，优先级比配置文件高,
    },
    build: { //构建打包后的配置
      outDir: "dist", //配置输出目录名
      assetsDir: "static", //配置输出目录中的静态目录名字
      rollupOptions: { //配置rollup（模块打包工具）的构建政策
        output: { //控制输出
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]",//静态资源
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
        },
      },
      chunkSizeWarningLimit: 1500,//大于1500kb的图片会被转化成base64格式
      emptyOutDir: true, //清楚输出目录中的所有文件 -- 默认为true
    },
    plugins: [//插件
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: "gzip",
        ext: ".gz"
      }),
    ],
  }
})


```


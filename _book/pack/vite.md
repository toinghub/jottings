# vite

# 注意：

* 



# [命令行界面](https://cn.vitejs.dev/guide/cli.html)



# 功能

## 导入

### 支持裸模块导入

```js
import { someMethod } from 'my-dep'
```

### 静态资源处理

>  服务时引入一个静态资源会返回解析后的公共路径 

```js
import imgUrl from './img.png' //./img.png
//显式加载资源  未被包含在内部列表或 assetsInclude 中的资源，可以使用 ?url 后缀显式导入为一个 URL
import assetAsURL from './asset.js?url'
// 在构建时 Web Worker 内联为 base64 字符串
import InlineWorker from './worker.js?worker&inline'
```

### JSON

```js
// 导入整个对象
import json from './example.json'
// 对一个根字段使用具名导入
import { field } from './example.json'
```

### [Glob 导入](https://cn.vitejs.dev/guide/features.html#glob-import)

> 匹配到的文件默认是懒加载的，通过动态导入实现，并会在构建时分离为独立的 chunk
>
>   Vite 独有的功能 

```js
const modules = import.meta.glob('./dir/*.js')
// vite 编译后等用于
const modules = {
  './dir/foo.js': () => import('./dir/foo.js'),
  './dir/bar.js': () => import('./dir/bar.js'),
}
```

> 倾向于直接引入所有的模块，可以传入第二个参数 `{ eager: true }` 

```js
const modules = import.meta.glob('./dir/*.js', { eager: true })
// vite 生成的代码
import * as __glob__0_0 from './dir/foo.js'
import * as __glob__0_1 from './dir/bar.js'
const modules = {
  './dir/foo.js': __glob__0_0,
  './dir/bar.js': __glob__0_1,
}
```

### 动态导入

> 变量仅代表一层深的文件名 

```js
const module = await import(`./dir/${file}.js`)
```


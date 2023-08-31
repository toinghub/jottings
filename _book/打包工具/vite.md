# vite

### [命令行界面](https://cn.vitejs.dev/guide/cli.html)



## 依赖预编译

### 路径补全

* 在处理中，遇到有非绝对路径或者相对路径，则会进行路径补全
* 找寻依赖的过程是由当前目录依次向上查找，直到搜寻到根目录或找到对应依赖为止

```js
import _ from "lodash"
imprt _ from "/node_modeles/.vite/lodash"
```



## 依赖预构建

> vite会找到对应的依赖，然后调用esbuild，将其他规范的代码转换成esmodule规范，然后放到当前目录下面（node_modules/.vite/），同时对esmodule规范的各个模块进行统一集成

#### 作用：

1. 将不同的三方包中会有不同的导出格式进行统一
2. 对路径的处理可以直接进行使用.vite/，方便路径重新
3. 解决网络多包传入性能问题（一个包可能有无数个引用依赖），无论有多少个额外的export 和 import，vite都尽可能的将它们集成，最后只生成一个或者多个模块


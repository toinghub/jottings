# [webpack](https://webpack.js.org/)

## 命令行

> webpack-cil  命令行

```js
npx webpack --help //查看参数
npx webpack --watch //会一直监听文件变化
```

## webpack.config.js

```js
// [contenthash] 根据文件的内容生产一个哈希的字符串
// [ext] 表示原有的扩展名
const HtmlWebpackPlugin = require('html-webpack-plugin') // webpack构建后生成html文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 抽离css文件
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin') // 抽离css文件

module.exports = {
  entry, //入口文件
  output: { //输出文件
    filename, //文件名，也可以编辑路径 srtipt/[name].[contenthash].js
    path, //打包的输出路径  必须为绝对路径
    clean: true, //删除上一次的打包内容 
    assetModuleFilename: 'image/[contenthash][ext]', //设置资源模块文件名和路径
    pubicPath, //html中link标签上引入的域名
  },
  mode, //打包环境类型 production  development
  devtoll: 'evel', //错误定位
  plugins: [ //插件
    new HtmlWebpackPlugin({ //必须实例化
      template, //模板的路径
      fileName, //文件名
      inject, //文件里 script 标签生成地方
    }),
    new MiniCssExtractPlugin() //参数和上面一样
  ],
  devServe: { //基础的服务
    static, //需要启动的路径    
  },
  module: { //配置模块
    rules: [ //配置规则
      {
        test: /\.png$/, //匹配规则
        //asset/resource 可以加载全部文件
        type: 'asset/resource', //发送单独的文件，并且导出url 本地的图片资源
        generator: {
          filename, //设置资源的文件名 优先级高于assetModuleFilename
        }
      },
      {
        test: /\.svg$/,
        type: 'asset/lnline', // 导出资源的data的url，bese64
      },
      {
        test: /\.text$/,
        type: 'asset/source', // 导出资源的源代码
      },
      {
        test: /\.jpg$/,
        type: 'asset', //resource和lnline选择,默认情况下 大于8k就会生成一个资源文件,否则则是bese64
        parser: { //解析器
          dataUrlCondition: { //条件
            maxSize, //更改asset生产资源的判断条件，默认是8k
          }
        }
      },
      {
        test: /\.(css | less)/, //当匹配到时，执行下方use
        // 注意：下方数组中有执行顺序，从后到前，先执行的less-loader
        use: [miniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      },
      {
        test: /\.js/,
        exclude: /node_modules/, //排除条件
        use: {
          loader: 'babel-lader',
          options: {
            parser: ['@babel/perser-env'],
            plugins: [
              [
                "@babel/plugin-transform-runtime"
              ]
            ]
          }
        }
      }
    ]
  },
  optimization: { //优化
    minimizer: [ //压缩
      new CssMinimizerWebpackPlugin()
    ],
    splitChunks: { //将公共的方法分离成一个文件
      cacheGroups: { //缓存组
        vendor: {
          test: /[\\]node_modules[\\]/,
          name: 'vendors', //打包的名
          chunks: 'all'
        }
      }
    }
  },
  performance: { //性能配置
    hints: false, //提示关闭
  },
  resolve: { //模块解析
    alias: { //配置别名
      'assets': '@/assets',
      'components': '@/components'
    },
    extensions: ['.json', 'js', 'vue'], //配置扩展名优先级，从前往后
  },
  externalsType: 'script', //下方链接放入的标签类型
  externals: { //定义外部的第三方包
    //$ 表示暴露的Jquery别名
    jquery: ['JQuery的链接', '$']
  },
}
```



## 代码分离

#### 入口起点

> 使用entry配置手动的分离代码

```js
 entry: { //配置多入口
    index: './index.js',
    another: './another.js',
  },
 output: { //输出文件
    //[name]根据入口名，自动生成出口文件名
    filename:'[name].js', //文件名
    path, //输出路径  必须为绝对路径
  },
```

#### 防止重复

>使用Entry dependencies 或者 SplitChunksPlugin 去重和分离代码

##### Entry dependencies 

```js
 entry: {
    index: {
      import: 'index.js', //入口文件路径
      dependOn: 'shared', //将共享的文件定义出来,shared为文件名
    },
    output: {
      import: 'output.js', //入口文件路径
      dependOn: 'shared', //将共享的文件定义出来
    },
    shared: 'lodash', //将lodash分离出来，单独为一个文件
  },
```

##### SplitChunksPlugin 

```js
optimization: { 
    splitChunks: { //将公共的方法分离成一个文件
      chunks: 'all'
    }
  }
```

#### 动态导入

> 通过模块的内调函数来分离代码

```js
function getInfo(){
    import('lodash') //动态导入
    	.then(res){
        return res
    }
}
```

##### 懒加载

```js
//当执行add这个方法时，才加载index.js这个文件，并且index.js会被打包成一个包
// /*webpackChunkName:'indexInt'*/ 修改index.js打包后的文件名
function add(){
    import( /*webpackChunkName:'indexInt'*/ './index.js')
        .then(res=>{})
}
```

##### 预获取/预加载模块

```js
//预获取(prfetch)
//webpackPrfetch 首页内容加载完毕，在网络空闲的时候，提前下载好index.js文件
function add(){
    import( /*webpackPrfetch:true*/ './index.js').then(res=>{})  
}

//预加载(preload)
//webpackPrfetch 和懒加载类似,但是页面模块会并行加载
function add(){
    import( /*webpackPrfetch:true*/ './index.js').then(res=>{})  
}

```



### 缓存

> 当文件内容改变，文件名没有变化时，浏览器则会使用上一次的缓存
>
> [contenthash] 根据文件的内容生产一个哈希的字符串

##### 缓存第三方库

```js
optimization: {
    splitChunks: { //将公共的方法分离成一个文件
      cacheGroups: { //缓存组
        vendor: {
          test: /[\\]node_modules[\\]/,
          name: 'vendors', //打包的名,保持文件名不变化，浏览器下次访问直接使用缓存
          chunks: 'all'
        }
      }
    }
  }

```



### 拆分开发和生产环境配置

##### 深合并

```js
const { merge }  = require('webpack-merge')
module.exports = (env)=>{
    switch(true){
      case env.dev;
         return merge(commonConfig,devConfig) //代码合并
    }
}


```



## source-map

```js
 devtoll: 'evel'

```

* evel  默认值  每个module都会封装在evel中【 末尾有注释 、能锁定代码错误行数 】
* source-map  生成一个sourceMap文件【 末尾有注释 、能锁定代码错误行数 】
* hidden-source-map   和上方一样 【 末尾没有注释 、不能锁定代码错误行数 】
* inline-source-map   DataUrl形式的map文件链接 【 末尾有注释 、能锁定代码错误行数 】
* evel-source-map  module都会封装在evel中,后方生成DataUrl的map文件链接 【 末尾有注释 、能锁定代码错误行数 】
* cheap-source-map  只保留代码行数的map文件【不能锁定代码错误行数 】
* cheap-module-source-map  只保留代码行数的map文件,对于外部的混入,也可以剔除出去【 、能锁定代码错误行数 】 推荐使用



## devServe

```js
const path = qeruire('path')
module.exports = {
  mode: 'development',
  entry: './main.js',
  devServe: {
    static: path.resolve(__dirname, './dist'), //指向当前的物流路径
    compress: true, //是否进行代码压缩
    port: 3000, //配置端口号
    headers: {}, //请求头信息配置
    proxy: {}, //设置代理
    https: true, //将http改成https
    http2: true, //和上面一样，自带有https自签名证书
    //当是单页面应用时，路由可能识别不了，可以配置historyApiFallback来避免报错
    historyApiFallback: true,
    host: '0.0.0.0', //开发服务器主机,
    hot: true, //模块热替换，默认true
    liveReload: true, //热更新功能，默认true
  }
}

```



## 模块解析

```js
  resolve: { //模块解析
    alias: { //配置别名
      'assets': '@/assets',
      'components': '@/components'
    },
    extensions: ['.json', 'js', 'vue'], //配置扩展名优先级，从前往后
  }

```

## webWorks

##### index.js

```js
const worker = new Worker(new URL('./work.js',import.meta.url))
worker.postMessage({}) //数据传给worker中
worker.onmessage = (message)=>{} //worker返回的结果

```

##### work.js

```js
self.onmessage = (message)=>{ //接受主线程发过来的信息
    self.postMessage({ //把信息返回给主线程
        info:111
    })
}

```



## 外部扩展

```js
externalsType: 'script', //下方链接放入的标签类型
  externals: { //定义外部的第三方包
    //$ 表示暴露的Jquery别名
    jquery: ['JQuery的链接', '$']
  }

```



## sideEffects

> 文件是否具体副作用

###### package.json	

```js
sideEffects:true //保留所有未引用的文件 
sideEffects:false //删除所有未引用的文件 css文件注入后不会被引用
sideEffects:['*.css','index.js'] //指定保留的文件名

```



## shimming 预置依赖

> 兼容 第三方库的全局变量
>
> 实现follify(运行时环境的垫片) 按需加载

##### 预置全局变量

```js
const webpack = require('webpack')
module.exports = {
  plugins: [
    new webpack.ProvidePlugin({ //将下方的lodsh和jquery配置成全局变量
      _: 'lodsh',
      $: 'JQuery'
    })
  ],
}

```

##### 覆盖打包后文件的this指向

> 当模块运行在common.js上下文时，this指向的是module.exports中

```js
 module: {
    rules: {
      rest: require.resolve('./index.js'),// require.resolve 路径解析
      use: 'imports-loader?wrapper=window' //覆盖this指向为window
    }
  }

```



## 模块联邦（Module Federation）

#### 待引用应用

```js
const {
  ModuleFederationPlugin
} = require('webpack').container

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'anv', //模块联邦的名字，后续其他模块用名字来访问知道模块
      filename: 'index.js', //使用此模块联邦的应用名
      remotes, //引用其他应用的模块联邦名字
      exposes: { //暴露给外部使用的组件
        './Header': './sec/head.js', //前面是key值，外部应用使用时拼接用的
      },
      shared: {}, //共享的模块
    })
  ]
}

```

#### 引用应用

```js
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      //使用上面的模块联邦
      //nav为上面的模块联邦名  name: 'anv', 
      //index.js为上面的应用名  filename: 'index.js',
      remotes: {
        nav: 'nav@http://xxxxx:3000/index.js'
      }
    })
  ]
}
//这儿的haider就是上面的 './Header': './sec/head.js'
import('nav/Header').then(message=>{})

```



## babel

> transformRuntime  全部辅助函数，兼容 await和async 语法糖

```json
"babel-loader": "^6.26.0",//webpack中babel解析es6的桥梁，解析成低版本js代码
"@babel/core": "^7.8.4",//babel核心模块
"@babel/plugin-transform-runtime": "^7.18.5", //需要transformRuntime时，自动require打包
"@babel/preset-env": "^7.18.2",//babel预设 babel插件的集合
"@babel/register": "^7.8.3",

```

## 补充

绝对路径

```js
const path = qeruire('path')
//__dirname 获取到当前文件的绝对路径
//./dist 基于上面的路径，获取到dist的绝对路径
path.resolve(__dirname,'./dist') 

```

查看模块依赖图 --- webpack-bundle-analyzer
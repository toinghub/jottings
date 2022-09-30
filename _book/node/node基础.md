#  一、nvm指令

```javascript
nvm list     //查看已安装的nodejs版本
nvm on      // 启用node.js版本管理 
nvm off   // 禁用node.js版本管理(不卸载任何东西)
nvm install <version>       // 安装node.js的命名 version是版本号 例如：nvm install 8.12.0
nvm use <version>      //使用某一version的nodejs
nvm uninstall <version>   // 卸载指定版本的nodejs
nvm alias default <version> //切换默认版本
```

### 代码工具

`lodash` npm搜索  官网`lodash.com`

`underscore`  

[开源项目CDN](https://www.bootcdn.cn/)

***



# 二、NPM知识

### 命令行

```javascript
npm init -y //创建package文件
--sava //安装  -S 简写
--dev  //开发环境使用 -D 简写
-g     //全局安装
install //安装 i 简写
npm uninstall gulp -D //卸载包
npm list //显示包管理的关系
npm list | grep 包名  //显示指定包管理的关系  三层关系
npm i --production //只装生产环境的包
npm view 包名  versions  //查看包版本号 -V 简写
npm i 包名@版本号 -S  //安装包指定版本号  版本号可不写
npm outdated //查看那些包已过期
npm update //更新包
npm cache clean --force //强制清除缓存
npm config get registry  //查看当前源
npm config set registry 地址 //切换源
npm i git+https://git@  (git地址) //下载git项目（当hhs时，把https改成ssh）
```

* 使用`npm i`可以重新直接安装`package`里的内容
* `package-lock` 显示包依赖关系

```javascript
__dirname  //当前代码所在文件的物理路径
```

> 包类型  1.内置的包    2.第三方库   3.自己定义的包

### 上传包

1. npm init  -y  初始化
2. npm adduser 添加账户
3. npm publish 上传包



***



# 三、package 文件解析

> package中的 ^1.12.1的^表示当前版本号需要按语义做适配
>
> major 主版本号  minor 次版本号  patch 补丁号

```javascript
^1.12.2   //锁定主版本号（major ）
~1.12.2   //锁定主版本号和次版本号（minor）
1.12.2    //锁定所有版本号（patch）
*		  //最新版本
```

### 配置信息：

```json
 "name": "opipjl", //发布包的名
 "version": "1.0.0",  //版本号
 "description": "",  //描述
 "main": "index.js",  //包的入口
 "keywords": [], //关键字
 "author": "", //作者
 "license": "MIT", //许可证协议
 "repository":{"type":"Git","url":"git+ " } //包的git地址
```

### NPM脚本 

>  package.json中的 scripts 字段

​	全局 --> 本地

```javascript
&  //可以连接两个命令行 不分先后
&& //依次执行  分先后
```

* test   start    //可以简写，不写run
* process.env.npm_package_变量名  //能拿到package里的值(只能在脚本中访问)
* echo $npm_package_config_dev   //window疑似不支持

### Cross-env (命令兼容平台)

```javascript
npm install --sava-dev cross-env  //安装  简写：npm i -S -D cross-env

cross-env NODE_ENV=test1 node ./test1.js  //NODE_ENV 为命令中的变量名和变量值  后面为执行命令
process.env.NODE_ENV  //在./test1.js中获取NODE_ENV的值
```

***

# 四、NRM 管理源

npm的镜像源管理工具

```javascript
npm i -g nrm  //安装nrm
nrm ls  //查看可选源
nrm use taobao //切换源
nrm test  //测试源响应速度
```

***

### NPX 

```javascript
npx gulp -D //当galp未安装时，会生成一个临时路径安装gulp
npx --on--install http-server //强制使用本地模块
npx --ignore--existing  http-server   //强制安装远程模块
```

***

### commonJs

解意：nodeJs的第三方规范

> 四步骤使用模块
>
> > 定义模块  --创建文件且写入内容
> >
> > 暴露模块 --将写入内容暴露给外部
> >
> > 引入模块 --其他文件引入模块
> >
> > 使用模块  --使用定义的模块

```javascript
module.export = {name,age} //对象写法
exprot.name = name //赋值写法

//衍生写法
exports.default = {  }
module.exports = { default }
```



# 五、nodeJs内置模块

### JS日志工具(log4js)

```javascript
const log4js = require('log4js')
log4js.configure({
  appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } },
})

const logger = log4js.getLogger('cheese')
logger.level = 'debug'
logger.debug()
```



### 1、url

```javascript
const url = require('url')
const urlString = 'https://www.baidu.com:443/pathh/index.html?id=1#tag=2'
const urlObj = { parse解析出的对象 }
url.parse(urlString,true)  //parse  数据解析 (true时，query为对象格式)
url.format(urlObj) //format 反向编译路径
url.resolve("http://www.baiducom/a","../") //回到上一层
url.resolve("http://www.baiducom/a","/b")  //替换a为b

const urlParams = new URLSearchParams(url.parse(urlString).search) 
urlParams.get('id') //获取search指定字段
```



### 2、qureySring

```javascript
const querystring = require('querystring')

const query = 'id=2&name=tongy&from=上海'
querystring.parse(query,':', '/') //解析 第一个参数key和value中的分隔符，第二个是value和key分隔符

querystring.escape(query) //编码 percent-encoded查询字符串
querystring.unescape(queryEscape) //解码

const queryObj = { id: 2, name: 'toingyi', from: '北京' }
id=2&name=toingyi&from=%E5%8C%97%E4%BA%AC
querystring.stringify(queryObj, ':', '/') //编译对象，后面两个参数替换的=和&符号

const newQuery = querystring.stringify(queryObj, null, null, {
  encodeURIComponent(string) {  //中文保持不变
    return querystring.unescape(string)
  },
})
```



### 3、http

```javascript
//request  本地请求的函数   response服务器返回函数
http.createServer((request,  response) => {    
  response.writeHead(404, {"content-type":} ) //第一个返回状态码，第二个对象，返回头部的配置
  response.write('home111') //返回内容  不会断开   
  response.end() //返回内容 会断开 
})
```

​                                                                 

#### 3.1、get 请求

```javascript
https.get(
    'https://www.xiaomiyoupin.com/mtop/mf/resource/data/list', //请求的地址
    (result) => {
      let data = ''
      result.on('data', (chunk) => {  //chunk传回的数据
        data += chunk
      })
      result.on('end', () => { 
       //利用response返回数据
      })
    }
  )
```



#### 3.2、post 请求

```javascript
const postData = querystring.stringify({})

const options = {
  protocol: 'http:', //协议
  hostname: 'localhost', //主机名
  method: 'post', //方法类型
  port: '3000', //端口号
  path: '/data', //路径
  headers: { //请求的首部字段
    'content-type': 'application/x-www-form-urlencoded',
    'content-length': Buffer.byteLength(postData),
  },
}

const server = http.createServer((request, response) => { //
  const req = http.request(options, (result) => {})
  req.write(postData)
  req.end()
  response.end()
})

server.listen(80808,()=>{})  //监听端口号
```



#### 请求头部信息

 content-type :  [对照表](https://www.runoob.com/http/http-content-type.html)



####  node浏览器调试

```javascript
//   --inspect-brk  第一行打断点
node  --inspect  --inspect-brk  server.js
```



#### node进程管理工具

```javascript
supervisor
nodemon  //热更启动
forever
pm2 //部署
insomnia  //调试工具  post请求
```



#### 3.3、跨域（JSONP\CORS\middleware\爬虫）

#### JSONP 

原理：利用在浏览器端请求js不跨域的特性

```javascript
//前端代码
 <script>
    function getData(data){
      console.log(data)
    }
 </script>
 <script src="http://localhost:8080/api/data?cb=getData"></script>

//后端代码
const server = http.createServer((request, response) => {
  let urlStr = request.url 
  let urlObj = url.parse(urlStr, true)
  switch (urlObj.pathname) {
    case '/api/data':
      response.write(`${urlObj.query.cb}("hello")`) //spanp中的p是填充的意思
      break
    default:
      response.write('page no found')
  }
  response.end()
})
```



#### CORS

原理：设置Access-Control-Allow-Origin白名单

```javascript
response.writeHead(200, {
    'content-type': 'application/json;charser=utf-8',
    'Access-Control-Allow-Origin': '*', //后面的是白名单
})
```



#### proxy

middleware(http-proxy-middleware)

[文档地址](https://www.npmjs.com/package/http-proxy-middleware)

```javascript
if (/\/wph/.test(urlStr)) {
    const proxy = createProxyMiddleware('/wph', {
      //'/wph'确定应该将哪些请求代理到目标主机
      target: 'https://mapi-rp.vip.com/', //要代理到的目标主机
      changeOrigin: true, //是否确认代理
      pathRewrite: {  //路径重写
        '^/wph': '',
      },
    })
proxy(request, response)
```



#### 爬虫

```javascript
cheerio  //爬到数据后，可以建立虚拟DOM树来解析
function filterData(data){
  const $ = cheerio.load(data)
  $('.xxxx p').each((index,el)=>{}) //each == foreach  
}
```



## 4、event(自定义事件)

```javascript
const EventEmilter = require('events')

class MyEventEmilter extends EventEmilter {} //继承EventEmilter

const event = new MyEventEmilter()

event.on('play', (value) => { //绑定事件（监听作用）
  console.log(value)
})

event.emit('play', '执行') //触发事件

```



## 5、文件操作

注：错误优先的回调函数

#### 5.1 文件夹操作

```javascript
//创建文件
fs.mkdir('logs', (err) => { if (err) throw err  })  //  throw 抛出异常

//修改文件名/文件夹名
fs.rename('logs', 'log', (err) => {}) //待修改名   修改名  回调

//删除文件夹
fs.rmdir('./log', (err) => {})

//读取文件夹
fs.readdir('./logs', (err, result) => {})

```



#### 5.2 文件操作

```javascript
//创建文件
fs.writeFile('./logs/log1.log', 'hello\nwordd', (err) => {})

// 追加文件
fs.appendFile('./logs/log1.log', '!!!', (err) => {})

// 删除文件
fs.unlink('./logs/log1.log', (err) => {})

// 读取文件
fs.readFile('./logs/log1.log', 'utf-8', (err, content) => {}) //读取文件路径  返回内容格式   回调

// 同步读取文件
const content = fs.readFileSync('./logs/log1.log', 'utf-8', (err, content) => {})

//promise同步读取(node版本10以上)
const fsPromises = require('fs').promises
;async () => {
  let result = await fsPromises.readFile('./logs/log1.log')
}

//判断某个文件是否存在
fs.existsSync("./index.html")

```

#### 5.3 遍历目录所有文件

```javascript
function readdir(dir) {
  fs.readdir(dir, (err, content) => { //读取文件夹
    content.forEach((value, index) => { 
      let joinDir = `${dir}/${value}`
      fs.stat(joinDir, (err, stats) => { // stat获取文件或目录的信息
        if (stats.isDirectory()) { //isDirectory  是否为目录
          readdir(joinDir)
        } else {
          fs.readFile(joinDir, 'utf-8', (err, content) => {
            console.log(content)
          })
        }
      })
    })
  })
}
```



### 5.4 监听文件

```javascript
//文件路径   是否监听文件   是否监视所有子目录  字符编码
//eventType:rename或change（文件名出现或者消失时，触发rename）   filename:触发事件的文件名称
fs.watch('./logs/log0',true,true,'utf8' (eventType,filename) => {})  

//文件路径  是否为二进制  是否监听文件  监听间隔
fs.watchFile('./logs/log0',true,true,5000 (err) => {})

fs.watch  //有一小部分平台文件名出现或者消失时,不触发rename，但是效率更高   
fs.watchFile //没有上面的平台问题

```





### 5.5 文件流 （zlib压缩文件）

```javascript
const fs = require('fs')
const zlib = require('zlib')

const gizp = zlib.createGzip() 

const readStream = fs.createReadStream('./logs.txt') //读取流
const writeStream = fs.createWriteStream('./logs.gzip') //写入流

readStream.pipe(gizp).pipe(writeStream) //pipe  管道注入内容
```



### 5.6 逐行读取

```javascript
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What do you think of Node.js? ', (answer) => {
  // TODO：记录答案到数据库中
  console.log(`Thank you for your valuable feedback: ${answer}`);

  rl.close();
});
```



## 6、加密（crypto）

```javascript
const crypto = require('crypto')

const passsword = 'abc'
const hash = crypto
  .createHash('sha256') //sha256 加密的算法也可以是md5
  .update(passsword) //加密谁
  .digest('hex') //加密的形式   hex：十六进制  dec：十进制  oct：八进制  bin：二进制


```



36集
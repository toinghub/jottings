# JavaScript随笔

```javascript
location.reload(); //刷新页面
this.$route.query  //获取路由参数
window.location   //获取网址信息
Object.values(a) // 枚举a对象所有的属性值
arr.flat(Infinity) // 扁平化数组,Infinity默认深度最深，也可指定深度
[a,b] = [b,a]  //使用解构，快速交互ab值
window.location.href=url    //(动态输出跳转)  跳转链接
click.once   //方法只执行一次
this.$nextTick  //数据渲染完毕后执行
array.at(-1 ) //数组负索引（-1为最后一位）
let b =  a !== 0 ? ( a ? a: "-") : 0 //括号可省略
@Watch("$route", { immediate: true }) //监听route可以获取页面显示
```

单行代码

```js
//数组去重
const uniqueArr = (arr) => [...new Set(arr)];

//从url获取参数并转为对象
const getParameters = URL => JSON.parse(`{"${decodeURI(URL.split("?")[1]).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')}"}`)

//检查对象是否为空
const isEmpty = obj => Reflect.ownKeys(obj).length === 0 && obj.constructor === Object;

//反转字符串
const reverse = str => str.split('').reverse().join('');

//生成随机十六进制颜色
const randomHexColor = () => `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")}`

//检查当前选项卡是否在后台
const isTabActive = () => !document.hidden; 

//两日期之间相差的天数
const dayDiff = (date1, date2) => Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000);

//将 RGB 转换为十六进制
const rgbToHex = (r, g, b) =>   "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
```



知识

```javascript
$attrs // 封装第三方库文件   使用attrs数据会及时响应
```

扩展运算符

```js
let aobj = {a:1,b:2}
let bobj = {a:3,b:4,c:5}
aobj = {...aobj,...bobj} //{a:3,b:4,c:5}
```



操作符

```javascript
cat?.name //可选链操作符  可以读取cat深处的值，不用担心是否有效
a ?? b  //空值合并操作符 左侧为 null 或者 undefined 时，返回右侧数据
a ??= b //空值赋值运算符  左侧为 null 或者 undefined 时,右侧数据赋值给左侧
!.  //非空断言操作符  ts内容  暂不解释
```



防抖动

```javascript
debounce (wait, fun,data) {
      if (this.timer) {
        clearInterval(this.timer)
      }
      this.timer = setTimeout(() => {
        fun(data)
      }, wait)
    },
```



节流

```javascript
throttling (wait, fun) {
      let _this = this
      let now = +new Date()
      if (!this.last || (now - this.last) > wait) {
        _this.last = now
        fun()
      }
    },
```



截取视频指定帧图片( [上传并保存在阿里云服务器](https://help.aliyun.com/document_detail/64555.html?spm=a2c4g.11174283.6.1736.7a6a7da2WHCSlD) )

> ?x-oss-process=video/snapshot,t_0,f_jpg,w_0,h_0,m_fast,ar_auto
>
> > t：指定截图时间
> > w：指定截图宽度
> > h：指定截图高度
> > m：指定截图模式（默认模式，根据时间精确截图，fast则截取该时间点之前的最近的关键帧）
> > f：图片的格式
> > ar：是否根据视频信息自动旋转图片





多字节替换

```javascript
let searchStr = this.search
      searchStr = searchStr.replace(new RegExp(" ", "gm"), "|");
      searchStr = searchStr.replace(new RegExp(",", "gm"), "|");
```



查找数组最大最小值

```javascript
let data = [1,20,20,33,55,33,66,77]
let maxNum = Math.max(...data);
let minNum = Math.min(...data);
```



uniapp 刷新页面

```js
 // 获取当前页面栈实例
 const pages = getCurrentPages()
 // 获取当前页面
 const curPage = pages[pages.length - 1]
 // 声明一个当前页面
 curPage.onLoad(curPage.options) // 传入参数
```



浏览器关闭提醒

```javascript
 window.onbeforeunload = function (e) {
      e = e || window.event;
      // 兼容IE8和Firefox 4之前的版本
      if (e) {
        e.returnValue = '关闭提示';
      }
      // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
      return '关闭提示';
    };
```

时间格式   

```javascript
Vue.filter('formatDate1', function (value, fmt) {
  let getDate = new Date(value);
  let o = {
    'M+': getDate.getMonth() + 1, //月份
    'd+': getDate.getDate(),//日
    'h+': getDate.getHours(),//小时
    'm+': getDate.getMinutes(),//分钟
    's+': getDate.getSeconds(),//秒数
    'q+': Math.floor((getDate.getMonth() + 3) / 3),//季度
    'S': getDate.getMilliseconds()//毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (getDate.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt;
})
```

****


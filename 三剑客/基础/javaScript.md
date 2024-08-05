# 数据类型

* 属性定义为函数称之为方法

##  **基本数据**

* Number、String、Boolean、Null、Undefined 
* 本质上：栈（Stack）--  自动分配的内存空间 

##  **引用数据**

*  对象类型Object type，比如：Object 、Array 、Function 、Data等 
* 在它的 栈内存 中，存储的是堆内存的引用地址
*  堆（Heap）-- 动态分配的内存空间 



# 循环

  ```js
for(let key in obj){}  //循环对象
for(let item of array){} //循环可枚举变量
while (判断条件){ 执行代码 } //先判断，后执行;
do{ 执行代码 }while( 判断条件 ) //先执行，后判断
  ```



# 函数

* 命名函数会函数提升，匿名函数则不会函数提升（和变量提升，一个意思）
* 全局环境不会被回收

## 作用域

#### 函数保存外部（有引入，不会被销毁）,防止函数反复创建,域就可保留

```js
function hd(){
    let n = 1;
    return function sum(){
        ++n
    }
    sum()
}
hd();hd();hd()  //1 1 1

let newHd = hd()
newHd();newHd();newHd()  //1 2 3
```

## 闭包

* **闭包是指有权访问另一个函数作用域中变量的函数**
* 在一个函数内部创建另一个函数 
* 外部函数执行完成后，占用的内存会被回收，函数内部作用域会被销毁，但是内部函数还在使用，所以就不会对其回收
* 频繁使用闭包，会导致**内存泄漏**（无法被垃圾回收机制识别为垃圾回收）

```css
// 例:
function foo(a) {
    setTimeout(function timer(){
        console.log(a)
    }, 1000)
}
foo(2);
```

## [尾调用优化](https://juejin.cn/post/7130161240181047309)

> 当函数调用时,会在内存中形成调用记录, 又称"调用帧"（call frame）
>
> 当在文章末尾调用函数时，可以使用 return,来删除外层函数的调用记录，只保留内层函数的调用记录

```js
function f() {
  let m = 1;
  let n = 2;
  return g(m + n);
}
```

## 尾递归

> 因为仅有 1 个调用记录 ，所以不会存在内存溢出问题

```js
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}
factorial(5); // 120
```



# 对象

## window 对象

```js
//原页面表单中的内容会丢失
window.history.go(-1)：//后退+刷新；
window.history.go(1)：//前进；
//原页面表单中的内容会保留
window.history.back()：//后退
window.history.back(0)：//刷新
window.history.back(1)：//前进
//关闭当前页面
window.close()
```

### history

#### window.history.pushState(data, title, targetURL)

#### window.history.replaceState(data, title, targetURL);

- @状态对象：传给目标路由的信息,可为空
- @页面标题：目前所有浏览器都不支持,填空字符串即可
- @可选url：目标url，不会检查url是否存在，且不能跨域。如不传该项,即给当前url添加data

## Object 常用方法

|          方法名          |                        注释                        |
| :----------------------: | :------------------------------------------------: |
|       Object.keys        |   遍历对象本身可枚举属性，不包含原型链可枚举属性   |
|      Object.values       | 遍历对象本身可枚举属性值，不包含原型链可枚举属性值 |
|      Object.freeze       |              冻结一个对象的第一层属性              |
|     Object.isFrozen      |             判断一个对象是否已经被冻结             |
|  Object.hasOwnProperty   |  检测对象自身属性中是否具有指定的属性，返回布尔值  |
|      Object.entries      |     返回一个给定对象自身可枚举属性的键值对数组     |
| Object.assign（new,old） | 所有可枚举属性的值从一个或多个源对象复制到目标对象 |

### Object.is 和 ===的区别

>object.is 可以区别-0和+0
>
>object.is NaN等于另一个NaN值

### Object.assign  和 扩展运算符... 的区别

> Object.assign 会直接改变原数据的值
>
> 扩展运算符只能通过赋值都方式改变数据的值



## 访问器

> 访问器优先级高于优先级

```css
let user = {
    data:{name:"测试",age:10},
    set age(value){
		this.data.age = value
    },
    get age(){
        return this.data.age
    }
}
```



# 原型

* *Object*.create(null, { }) -- 原型传nul，则该对象没有原型
* 取值基于**就近原则**
* 顶级原型 -- Object.protoType

## 关系

* **对应名称**

  * prototype：原型
  * __ protp __ ：原型链（链接点）—— 本质上是一个属性访问器

* **从属关系**

  * prototype => 函数的一个属性：对象{}
  * __ proto __ =>对象Object的一个属性：对象{}
  * 对象的__ proto __ 保存着该对象的构造函数的prototype

  ```css
  function Test(){}
  const test = new Test()
  
  test.__proto__ === Test.prototype //true
  Text.prototype.__proto__ === Object.protoType //true
  test = Test.__proto__.constructor
  ```

* **区别**
  *  `prototype`是函数独有的，而`__ proto __`是每个对象都会拥有的(包括函数) 
  *  `__ proto __`的作用是当访问一个对象的属性时,如果内部没有该属性,就往上查找，直到null 
  *  `prototype`的作用是保存所有实例公共的属性和方法 
  *  `constractor`属性,指向该对象的构造函数本身 
  *  任意一个函数(包括构造函数)都有一个`prototype`属性,指向**该函数的原型对象** 
  *  任意一个构造函数实例化的对象,都有一个 `__ proto __`对象,它指向**构造函数的原型对象** 

## 基础类型

```css
let arr = []
arr.__proto__ === Array.prototype
let str = ""
str.__proto__ === String.prototype
```

## 继承

* 通过将User的原型对一个空的对象原型赋值，然后将赋值的原型给Admin，从而实现继承
* 只能进行单个原型继承

```css
function User(){}
function Admin(){}

Admin.prototype = Object.create(User.prototype) 
```

## 拷贝

### 浅拷贝

* 拷贝的仅仅是“引用地址” 

```css
let newData = data
```

* 可以实现一级引用类型的深拷贝，当有多级引用类型时，二级属性之后的就是浅拷贝

```css
Object.assign({},data)
let newData = {...data}
```



### 深拷贝

*  **把引用地址和值一起拷贝过来,两个原型链** 

#### 递归拷贝

```css
const copy = (obj: Array<any> | Object) => {
	let res: any = obj instanceof Array ? [] : {}
	for (const [k, v] of Object.entries(obj)) {
		res[key] = typeof v === 'object' ? copy : v;
	}
	return res
}
let newObject = copy(data)
```

#### Json拷贝

> 对象内容项为undefined,null,Date,RegExp,function,error的时候 ,可能会出问题

```css
JSON.parse(JSON.stringify(obj))
```



# 类

* 关键字 `class` 定义
* 本质上就是函数，用语法糖修饰了的
* 构造的函数，不支持遍历`prototype`中的方法
* 属性属于构造的方法，而方法则是属于原型上，大家共享的

## 工作机制

* 本质上是进行原型操作
* 将方法放入`prototype`中 -- 保证构造后都可以使用原型方法
* 构造器`constructor`传参和下方形参传参一致  -- 保证构造后对象属性的唯一

```css
class User {
    constructor(name){
        this.name = name
    }
    show(){}
}

//上下一致

function Hd(name){
    this.name = name
}
Hd.prototype.show = function(){}
```

## 属性

## static -- 静态属性

[应用举例](https://www.bilibili.com/video/BV1NJ411W7wh?p=238&vd_source=c8d975fdf8d354d9a9971f42ded47482)

> 静态名称避免使用特殊名字[例：length,call]
>
> 所有的构造函数都可见，共用的，没有唯一性

```js
class myClass {
  static x = 0;
  static printX() {
    myClass.x //可以直接获取
  }
}
const a = myClass.x

```

### 原理

* 当添加了`static`关键字后，本质上，变量和方法就没有挂载到上级原型`prototype`中，而且挂载到了当前对象原型`__proto_`上

```js
class User{
    static x = 0;
    static show(){}
}
//上下结果相同
User.__proto__.x = 0
User.__proto__.show = function(){}
```

## 私有属性

###  _

*  区分私有和共有最简单的方式就是加个下划线 _，从命名上来区分

```js
class User {
	constructor() {
		this._name = 'dong';
		this.friend = 'guang';
	}
}
```

### Symbol

* 通过`symbol`的唯一性，保护属性

```js
const HOST = Symbol()
class User {
	[HOST] = 'name'

	set host(val) {
		this[HOST] = val
	}

	get host() {
		return this[HOST]
	}
}
```

### WeakMap

* 相同文件可通过`host`访问

```css
const host = new Map()
class User {
	constructor(val) {
		host.set(this, val);
	}
    
    set host(val) {
		host.set(this, val);
	}

	get host() {
		return host.get(this);
	}
}
```

### #

*  ES2022正式引入了私有属性，在属性名前加上`#`来表示私有属性 

```js
class User{
	#name = "name"
    #count = ()=>{}
}
```

### private -- ts类型



## 继承

* `extends` -- 关键字

### 继承原理

#### 方法继承

* 函数继承

```js
function User(name) {}
User.porotype.show = function(){
    console.log("继承")
}
function Admin(name) {}
Admin.prototype = Object.create(User.prototype);
let hd = new Admin()
hd.show
```

* 类继承

```js
class User{
	show(){
        console.log("继承")
    }
}
const Admin extends User {}
let hd = new Admin()
hd.show  //继承
```



#### 属性继承

* 函数继承

```js
function User(name) {
	this.name = name
}
function Admin(name) {
	// 访问User函数的构造器
	User.call(this, name)
}
// Admin继承User对象
Admin.prototype = Object.create(User.prototype);
let hd = new Admin("用户")
console.log(hd)  //{name:用户}
```

* 类继承

```js
class User{
	constructor(name){
		this.name = name
	}
}
const Admin extends User {
	constructor(name){
		//访问User函数的构造器
		super(name);
	}
}
let hd = new Admin("用户")
console.log(hd)  //{name:用户}
```

## [super](https://www.bilibili.com/video/BV1NJ411W7wh/?p=246&spm_id_from=333.1007.top_right_bar_window_history.content.click&vd_source=c8d975fdf8d354d9a9971f42ded47482)

* 调用父级类的方法，变量使用当前类的
* `constructor` 为什么必须需要`super`
  * 为了让父类的`constructor` 正常执行
  * 必须写到写到`this`之前，否则子类的属性可能被父类覆盖





# 模块化

## [原理](https://www.bilibili.com/video/BV1NJ411W7wh?p=262&vd_source=c8d975fdf8d354d9a9971f42ded47482)

* 模块化里默认严格模式 -- `this` 指向`undefinde`
* 无论加载多少次，只会解析一次

```css
import { api } from ""
//批量
import * as api from ""
//别名
export { api as Api }
import { api as Api } from ""
//默认导出
export default class api {}
export { Api as default }
//混合导出
export { Api as default,user }
import Api,{ use } from ""
```



# 微任务/宏任务

* `promise`中，内部代码实际上是同步代码，`then`后面是微任务
* `js`文件放在html后面，里面代码执行会影响`dom`渲染

## 执行顺序

* **同步 - 微任务 -  宏任务**
* **主线程 - 微任务队列- 宏任务队列**

```javascript
    let promise = new Promise(() => {
        setTimeout(() => {
            resolve();
            console.log(1)
        }, 0)
        console.log(2)
    }).then(() => {
        console.log(3)
    })
    console.log(4) //2 4 1 3 
```



### 定时器

```js
	setTimeout(()=>{ //执行到此处开始实现定时器
	},2000)
	for(let i=0;i<10000;i++){} //假如此处占用1s
	//主队列执行后，执行宏任务队列中的定时器，定时器进入主队列后，1s后执行其内容
```

### promise

```js
 setTimeout(() => {
        console.log(1)
        new Promise(resolve => {
            console.log(2)
            resolve()
        }).then(() => {
            console.log(3)
        })
    }, 0)
    new Promise(resolve => {
        console.log(4)
        resolve()
    }).then(() => {
        console.log(5)
    })
    console.log(6) //465123
```

### 步骤：

* **当主队列中有宏任务时，放入宏任务队列中，当遇到微任务时，放入微任务队列中**

* **主队列执行完成后，判断当前微任务队列是否存在微任务**
  * **存在则执行微任务**
* **判断宏任务队列是否存在宏任务**
  * **存在则将宏任务队列中的首个宏任务放入主队列，主队列执行**
    * **宏任务队列中的宏任务是进行上面循环操作的**
* **主队列进行休眠**
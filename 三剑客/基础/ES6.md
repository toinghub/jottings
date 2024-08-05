# [ES6](https://www.runoob.com/w3cnote/es6-tutorial.html)

#  [新增方法(es7-es14)](https://blog.csdn.net/weixin_38664300/article/details/125332006)

## for...of

> 字符串可以循环遍历

```js
for (let item of 'randy') {
    console.log(item) // r a n d y
}
```



#### 操作符

```javascript
cat?.name //可选链操作符  可以读取cat深处的值，不用担心是否有效
a ?? b  //空值合并操作符 左侧为 null 或者 undefined 时，返回右侧数据
a ??= b //空值赋值运算符  左侧为 null 或者 undefined 时,右侧数据赋值给左侧
!.  //非空断言操作符  ts内容  
2**10  //幂运算  1024
1_000_000 // 使用数字分隔符  原意不变
a ||= b //或等于  a || (a = b)
a ||= b //与等于  a && (a = b)
```



## class 私有属性和私有方法

>  属性/方法添加一个`hashtag(#)`前缀，这个属性/方法就变成私有的了 

```js
class Person {
  #firstName = 'randy';
  #lastName = 'su';
  
  #say() {
    console.log('say hello')
  }

  get name() {
    this.#say();
    return `${this.#firstName} ${this.#lastName}`;
  }
}
```



## toSorted

>  `sort`方法的排序复制版本，区别就是`sort`是修改原数组，而`toSorted`是返回新数组 

```js
const arr = [1, 3, 5, 2, 8];
const newArr = arr.toSorted();
```





# 解构

## 数组解构

```js
//级别
let [a, b, c] = [1, 2, 3];
//嵌套
let [a, [[b], c]] = [1, [[2], 3]];
//可忽略
let [a, , b] = [1, 2, 3];
//不完全解构
let [a = 1, b] = [];
//剩余运算符
let [a, ...b] = [1, 2, 3];//b=[2, 3]
//字符串等
let [a, b, c, d, e] = 'hello';
//解构默认值
let [a = 2] = [undefined]; // a = 2
```



## 对象解构

#### **基本**

```js
let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
//别名
let { baz : foo } = { baz : 'ddd' };// foo = 'ddd'
```

#### **嵌套**

```js
let {p: [x, { y }] } = {p: ['hello', {y: 'world'}] };
// x = 'hello'
// y = 'world'
```

#### **忽略**

```js
let {p: [x, {  }] } = {p: ['hello', {y: 'world'}] };
// x = 'hello'
```

####  **不完全解构** 

```js
let {p: [{ y }, x ] } = {p: [{y: 'world'}] };
// x = undefined
// y = 'world'
```

####  **剩余运算符** 

```js
let {a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40};
// a = 10
// b = 20
// rest = {c: 30, d: 40}
```

####  **解构默认值** 

```js
let {a = 10, b = 5} = {a: 3};
// a = 3; b = 5;
//别名 + 默认值
let {a: aa = 10, b: bb = 5} = {a: 3};
// aa = 3; bb = 5;
```



# 新类型

## Symbol

>  **没有两个 Symbols 永远相等** 
>
>  **对象键可以是 Symbols** 
>
>  **Symbol 值作为属性名时，该属性是公有属性不是私有属性，可以在类的外部访问** 
>
>  **类似永不重合的字符串**

#### 定义

```js
//普通定义
let hd1 = Symbol("描述")
let hd2 = Symbol("描述")
hd1 === hd2 //false
hd1.description //提取hd1描述

//for定义 -- 全局保存 -- 名称一样 始终为同一个
let hd1 = Symbol.for("描述")
let hd2 = Symbol.for("描述")
hd1 === hd2 //true
Symbol.keyFor(hd1) //获取hd1的描述
```



# Map 与 Set

## weakSet\weakMap

*  属于弱集合新的集合数据结构，代表这些值不属于正式的引用，不会组织垃圾回收
* 当一个对象值只被weak集合引用时，当这行代码执行完成后，这个对象值就会被当作垃圾回收
* 当weak里的对象值被垃圾回收了，weak中也会随之消失

## Map 对象

>  任何值(对象或者原始值) 都可以作为一个键或一个值 

#### 方法

```js
cosnt map = new Map()  //创建
map.set(key,value)  //设置该键的值
map.get(key)  //获取该键的值
map.size //获取map的成员数量
map.clear() //清除所有成员
```

#### 遍历

```js
var myMap = new Map();
myMap.set(0, "zero");
myMap.set(1, "one");
//for
for (var [key, value] of myMap) {
  console.log(key + " = " + value);
}
//forEach
myMap.forEach(function(value, key) {
  console.log(key + " = " + value);
})
```

#### 对象操作

```js
//数组转换
var kvArray = [["key1", "value1"], ["key2", "value2"]];
var myMap = new Map(kvArray);//数组转换map
var outArray = Array.from(myMap); //map转换数组

//克隆
var myMap1 = new Map([["key1", "value1"], ["key2", "value2"]]);
var myMap2 = new Map(myMap1);
let boolean = myMap1 === myMap2 //false

//合并
var first = new Map([[1, 'one'], [2, 'two'], [3, 'three'],]);
var second = new Map([[1, 'uno'], [2, 'dos']]);
var merged = new Map([...first, ...second]);
```



## Set 对象

>  Set 对象存储的值总是唯一的 
>
> +0 与 -0 在存储判断唯一性的时候是恒等的，所以不重复 
>
> undefined 与 undefined 是恒等的，所以不重复 
>
> NaN 与 NaN 是不恒等的，但是在 Set 中只能存一个，不重复。
>
>  对象之间引用不同，即使值相同，也能存储

#### 方法

```js
const  set = new Set()
set.add(val)  //向 Set 中添加一个值
set.has(value) //判断 Set 中是否包含指定的值（布尔）
set.delete(value) //删除 Set 中指定的值(成功删除该值返回 true)
set.clear() //清空 Set 中的所有值
set.size //返回 Set 中的值的数量
set.forEach(callbackFn, thisArg) //当前值、当前值的键和 Set 对象本身
Array.from(set) //Set 对象转为 Array
```

#### 作用

```js
//去重
var mySet = new Set([1, 2, 3, 4, 4]);
[...mySet]; // [1, 2, 3, 4];

//并集
var a = new Set([1, 2, 3]);
var b = new Set([4, 3, 2]);
var union = new Set([...a, ...b]); // {1, 2, 3, 4}

//交集
var a = new Set([1, 2, 3]);
var b = new Set([4, 3, 2]);
var intersect = new Set([...a].filter(x => b.has(x))); // {2, 3}

//差集
var a = new Set([1, 2, 3]);
var b = new Set([4, 3, 2]);
var difference =new Set([...[...a].filter(x => !b.has(x)),...[...b].filter(x => !a.has(x))]); // {1,4}
```



# [Reflect 与 Proxy](https://www.runoob.com/w3cnote/es6-reflect-proxy.html)

## Proxy

>  对目标对象的读取、函数调用等操作进行拦截 ，进行操作处理 
>
>  由 **target** 和 **handler** 两个部分组成（将 **target** 对象操作拦截到 handler 中进行处理）

```js
let target = {
    name: 'Tom',
    age: 24
}
//代理陷阱：对象的操作
let handler = {
    get( target, key ) {  
        return target[key]
    },
    set( target, key, value ) { 
        target[key] = value
    }
}

let proxy = new Proxy(target, handler)
proxy.name     // 实际执行 handler.get
proxy.age = 25 // 实际执行 handler.set
```

## Reflect

>  Object 的一些明显属于语言内部的方法 

#### get

```js
//查找并返回 target 对象的 name 属性
Reflect.get(target, name, receiver)

//当 target 对象中存在 name 属性的 getter 方法， getter 方法的 this 会指向 receiver
//实际计算的值的receiver中的
Reflect.get(target, name, receiver)
```

#### set

```js
//将 target 的 name 属性设置为 value 
Reflect.set(target, name, value, receiver)

// 当 target 对象中存在 name 属性 setter 方法时，setter 方法中的 this 指向receiver 
//实际修改的是 receiver 的属性,
//当receiver没有对应修改值时，则添加一个
Reflect.set(exam, 'info', 1, receiver);
```

#### has

```js
//用于查找 name 属性在 obj 对象中是否存在。
Reflect.has(obj, name)

let exam = {
    name: "Tom",
    age: 24
}
Reflect.has(exam, 'name'); // true
```

#### deleteProperty

```js
//用于删除 obj 对象的 property 属性，返回值为 boolean
Reflect.deleteProperty(obj, property)

let exam = {
    name: "Tom",
    age: 24
}
Reflect.deleteProperty(exam , 'name') //{age: 24} 
```

#### getPrototypeOf

```js
//读取 obj 的 _proto_ 属性,obj 不是对象时会报错
Reflect.getPrototypeOf(obj)

class Exam{}
let obj = new Exam()
Reflect.getPrototypeOf(obj) === Exam.prototype // true
```

#### setPrototypeOf

```js
//设置目标对象的 prototype
Reflect.setPrototypeOf(obj, newProto)

let obj ={}
Reflect.setPrototypeOf(obj, Array.prototype); // true
```

#### apply

```js
//改变调用方法中的this指向

//func 表示目标函数
//thisArg 表示目标函数绑定的 this 对象
//rgs 表示目标函数调用时传入的参数列表
Reflect.apply(func, thisArg, args)

Reflect.apply(Math.max, Math, [1, 3, 5, 3, 1]); // 5
```

#### defineProperty

```js
//为目标对象定义属性
Reflect.defineProperty(target, propertyKey, attributes)

//value属性名是固定的
const student = {};
Reflect.defineProperty(student, "name", {value: "Mike"}); // true
student.name; // "Mike"
```



# Generator

> 主要用于异步编程，交出了函数的执行权（可以自定义暂停）
>
> 在 function 后面，函数名之前有个 星号*
>
> 函数内部有 yield 表达式，可以定义不同的内部状态 
>
> 本质上是一个异步任务的容器

```js
function* func(){
 yield '1';//定义不同的内部状态
 yield '2'; 
 return '3';
}
let _func = func() //迭代器: 每个迭代器之间的作用域都是相互独立
//分阶段的执行Generator函数
_func.next() //{ value: ' 返回值 ' ，done: " false "  } value: 返回值 ；done: 函数是否执行完毕
```

#### next()

> 带参数的会覆盖上一个yield语句的返回值

```js
function* func(){
 let n = 1
 let v = yield n+11;
 console.log(v) //abc
 yield ++n; 
 yield ++n;
}
let _func = func()
console.log(_func.next()) //12
console.log(_func.next("abc"))//2
console.log(_func.next())//3
```

#### for of 循环

```js
let _func = func()
for( let val of _func){
    console.log(val)
}
```

#### return()

> 返回给定值，并结束遍历 Generator 函数  
>
> 提供参数时，返回该参数；不提供参数时，返回 undefined  

```js
function* foo(){
    yield 1;
    yield 2;
    yield 3;
}
var f = foo();
f.return("foo");//foo
```

####  **yield\* 表达式** 

> 用于在 Generator 函数内部，调用另一个 Generator 函数 

```js
function* callee() {
    console.log('callee: ' + (yield));
}
function* caller() {
    while (true) {
        yield* callee();
    }
}
// 等同于
function* caller() {
    while (true) {
        for (var value of callee) {
          yield value;
        }
    }
}

const callerObj = caller();
callerObj.next();
// {value: undefined, done: false}
callerObj.next("a");
// callee: a
// {value: undefined, done: false}
callerObj.next("b");
// callee: b
// {value: undefined, done: false}
```



# Module

##  export 

```js
export const name = 'hello'
export function say() {
  console.log('say')
}
export class Test {
  constructor() {
      this.id = 2
  }
}
```

### as

>  输入的变量重新取一个名字 

```js
import {name as cname} from 'xxx'
```

### export default

```js
const name = 'hello'
let addr = 'BeiJing City'
var list = [1, 2, 3]
export {
  name as cname,
  addr as caddr
}
export default list

//直接导入
import list, {
  cname as name,
  caddr	
} from A

//批量导入
import list, * as mod from A
console.log(list)
console.log(mod.cname)
console.log(mod.caddr)
```


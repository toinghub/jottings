# Promise

## iterable

> Array，Map，Set 都属于 ES6 的 [iterable](https://so.csdn.net/so/search?q=iterable&spm=1001.2101.3001.7020) 类型



## Promise.resolve()

*  `new Promise`方法的[语法糖](https://so.csdn.net/so/search?q=语法糖&spm=1001.2101.3001.7020) 

```js
Promise.resolve(42) 

new Promise(function (resolve) {
    resolve(42)
})
```



## Promise.reject

*  `new Promise`方法的[语法糖](https://so.csdn.net/so/search?q=语法糖&spm=1001.2101.3001.7020) 

```js
Promise.reject(new Error("Promise reject error"))
 
new Promise(function (reject) {
    reject(new Error("Promise reject error"))
})
```



## Promise.then

* 函调函数异步执行

```js
var promise = new Promise((resolve, reject) => {})
promise.then((res) => {});
```



## Promise.catch

*  `promise.then(undefined, onRejected)` 方法的一个别名 

```js
 
// 第一种写法
Promise.resolve()
  .then((data) => console.log(data))
  .then(undefined, (err) => console.log(err));
 
// 第二种写法
Promise.resolve()
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
```



## Promise.finally

* 回调函数不接受任何参数 
* 异步完成后回调

```js
p1.then((res) => console.log(res))
  .catch((err) => console.log(err))
  .finally(() => console.log("finally"));
```





## Promise.all()

*  接收一个 **promise** 的 iterable 类型的输入 
*  返回一个**Promise**实例 
*  需要**所有异步任务**都**同时进行**并且**完成时**可以使用.all方法 
*  **任何一个输入的 promise 的 reject 回调执行或者输入不合法的 promise 会立即抛出错误** 

```js
var p1 = new Promise((resolve, reject) => {});
var p2 = new Promise((resolve, reject) => {});
var p3 = new Promise((resolve, reject) => {});
Promise.all([p1, p2, p3]).then(values => {
  console.log(values);
}, reason => {
  console.log(reason)
});
/*结果：
resx: (3) [{…}, {…}, {…}]
resy:{data: {…}, status: 200, statusText: "OK", headers: {…}, config: {…}, …}
*/
```



## Promise.allSettled()

*  有多个彼此不依赖的异步任务成功完成时，或者您总是想知道每个promise的结果时 
*  **allSettled在其中一个promise返回错误时还可以继续等待结果 ,所有结果返回后安装传参传入的顺序返回结果**

```js
var p1 = new Promise((resolve, reject) => {});
var p2 = new Promise((resolve, reject) => {});
var p3 = new Promise((resolve, reject) => { reject('reject') });
Promise.allSettled([p1, p2, p3).then(values => {
  console.log(values);
}, reason => {
  console.log(reason)
});
//结果：
//Promise {<pending>}
//(5) [{…}, {…}, {…}, {…}, {…}]
//0: {status: "fulfilled", value: "one"}
//1: {status: "fulfilled", value: "two"}
//2: {status: "fulfilled", value: "three"}
//length: 5
//[[Prototype]]: Array(0)
```



## Promise.any()

* **某个Promise 变成rejected状态不会结束，必须等到所有参数 Promise 变成rejected状态才会结束**
*  处理多个异步任务返回最快的**成功**的结果时可以使用 any 

```js
var p1 = new Promise((resolve, reject) => {});
var p2 = new Promise((resolve, reject) => {});
var p3 = new Promise((resolve, reject) => { reject('reject') });
Promise.any([p1, p2, p3]).then(values => {
  console.log(values);
}, reason => {
  console.log(reason)
});
//结果：
//Promise {<pending>}
// one
```



## Promise.race()

*   遇到立即执行的`reject`时**直接返回了reject的内容** 
*  处理多个异步任务但是不要求**返回的内容是正确和错误时**，返回最快的结果时使用 

```js
var p1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, 'one');
});
var p2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 2000, 'two');
});
var p3 = new Promise((resolve, reject) => { reject('reject') });

Promise.race([p1, p2, p3]).then(values => {
  console.log(values);
}, reason => {
  console.log(reason)
});
//结果：
//reject
//Promise {<fulfilled>: undefined}
```


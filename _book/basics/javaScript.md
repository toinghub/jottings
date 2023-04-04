# js 补充

[文章地址](https://juejin.cn/post/7130161240181047309)

### 尾调用优化

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

### 尾递归

> 因为仅有 1 个调用记录 ，所以不会存在内存溢出问题

```js
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}
factorial(5); // 120
```

### while 循环

> 只要指定条件为 true，循环就可以一直执行代码块

```js
while (条件){
    需要执行的代码
}
```

### Object.is 和 ===的区别

>object.is 可以区别-0和+0
>
>object.is NaN等于另一个NaN值

### Object.assign  和 扩展运算符... 的区别

> Object.assign 会直接改变原数据的值
>
> 扩展运算符只能通过赋值都方式改变数据的值


# [React](https://react.docschina.org/learn#adding-styles)

## index.js

```css
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// react-dom 把react组件从一个真正的dom里卸载或渲染真正的dom
const root = ReactDOM.createRoot(document.getElementById("root"));
//渲染真实dom
root.render(
	//react严格语法模式，可要可不要
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

// root.unmount()  卸载真实dom
reportWebVitals();

```

# 函数组件

## 添加样式 -- className

> 使用className关键字添加
>
> 内联 `style` 属性 使用驼峰命名法编写 

```css
<img className="avatar"  style={{backgroundColor:'red'}} />
```

## 显示数据 -- {}

> 使用大括号嵌入js元素
>
> 行内使用时，不加引号“”

```css
const user = {
	name:'哈喽'
}
return (
  <h1 >
    {user.name}
  </h1>
);
```

## 条件渲染( v-if )

### 复杂判断

```css
let content
if(isLogin){
    content = <AdminPanel />
}else{
    content = <LoginForm />
}
return <div> {content} </div>
```

### 多次判断

```css
<div>
	{isLogin ? (<AdminPanel />) : ( <LoginForm />)}
</div>
```

### 单次判断

```css
<div>
	{isLogin && <AdminPanel /> }
</div>
```

## 渲染列表 --  map

> 外层必须有父元素
>
> 必须给数组中的每一项都指定一个 `key` 

```css
const list = [
    {title:'A',id:1},
    {title:'B',id:2},
    {title:'C',id:3},
]
const nodeList = list.map(item=>{
    <li key={item.id}>
    	{item.title}
    </li>
})
return <ul> {nodeList} </ul>
```

```css
//可以直接在jsx中使用放法
 <ul>
    {people.map(person =>
      <li key={person.id}>
      </li>
    )}
  </ul>
```

## 响应事件 

> 一定要传递函数，而不是调用函数

```css
function ckickButton(){
	function  handleClick(){
        console.log("触发了事件")
    }
    return (
    	<button onClick = {handleClick}>
        	点击事件
        </button>
    )
}
```

```css
export default function Toolbar() {
    const onPlayMovie=() => alert('Playing!')
 	const onUploadImage=() => alert('Uploading!')
    
  return (
    <div>
      <Button onClick={onPlayMovie}>
        Play Movie
      </Button>
      <Button onClick={onUploadImage}>
        Upload Image
      </Button>
    </div>
  );
}

function Button({ onClick, children }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}
```

## 阻止事件冒泡

>  事件处理函数接收一个 **事件对象** 作为唯一的参数 
>
>  `e.stopPropagation()`  --  阻止触发绑定在外层标签上的事件处理函数 

```css
function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button>
  );
}
```

## 阻止默认行为 

>  某些浏览器事件具有与事件相关联的默认行为 
>
>  `e.preventDefault()`  --   阻止少数事件的默认浏览器行为。

```css
export default function Signup() {
  return (
    <form onSubmit={e => {
      e.preventDefault();
      alert('提交表单！');
    }}>
      <input />
      <button>发送</button>
    </form>
  );
}
```



## [JSX规则](https://react.docschina.org/learn/writing-markup-with-jsx#the-rules-of-jsx)

* **只能返回一个根元素**，如果包含多个元素，**需要用一个父标签把它们包裹起来** 
* **标签必须闭合**
* **使用驼峰式命名法给大部分属性命名**



## 组件

* `export default `导出
* 标签和 `return` 关键字如果不在同一行，则必须把它包裹在一对括号 
* 没有括号包裹的话，任何在 `return` 下一行的代码都将被忽略
* 方法加了<>就会解析成element
* **组件首字母必须大写**

```css
export default function MyApp() {
  const count = 1
  function handleClick(){
      return console.log('触发')
  }
  return (
    <div>
      <MyButton count={count}   onClick={handleClick}>
    </div>
  );
}
```

```css
function MyButton({ count=100, onClick }) { //需要用{}解构
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}
```

```css
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
```

### 组件插槽

```css
import Avatar from './Avatar.js';

function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

export default function Profile() {
  return (
    <Card>
      <Avatar
        size={100}
        person={{ 
          name: 'Katsuko Saruhashi',
          imageId: 'YfeOqp2'
        }}
      />
    </Card>
  );
}
```

### 纯粹

>  **只负责自己的任务。** 它不会更改在该函数调用前就已存在的对象或变量 
>
>  **输入相同，则输出相同。** 给定相同的输入，组件应该总是返回相同的 JSX 
>
>  组件不应依赖于彼此的渲染顺序 

### 注意：

* 禁止在组件中嵌套组件



## 状态管理  --   `use` 开头的函数被称为 **Hook** 

>  只能在你的组件（或其他 Hook）的 **顶层** 调用 Hook 

### useState

> 保存每次更新后的记录
>
> 多次渲染同一组件，每个组件都有自己的state
>
> **相同位置的相同组件会使得 state 被保留下来**
>
> **使用 key 来重置 state**(使用 key 重置表单)

```css
function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}
```

#### 构建原则

*  **合并关联的 state** 
*  **避免互相矛盾的 state** 
*  **避免冗余的 state** 
*  **避免重复的 state** 
*  **避免深度嵌套的 state** 

#### 合并关联

```css
const [position, setPosition] = useState({ x: 0, y: 0 });
```

#### 更新状态中对象

> 状态可以持有任何类型的 JavaScript 值 
>
> 不应该直接改变你在 React 状态中持有的对象和数组 
>
> 使用 `...` 展开语法来复制你想改变的对象和数组 

```css
setPosition({ ...position, x: 100 })
```

#### 更新状态中数组

> 更新存在状态中的数组时，你需要创建一个新数组 

```css
 setList(list.map(item => {
      return { ...item, seen: nextSeen };
  }));
```

##  useReducer 

>  将组件的所有状态更新逻辑整合到一个外部函数中 

```css
const [`有状态的值`, ` dispatch 函数`] = useReducer(`reducer 函数`, `初始的 state`);
const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
function tasksReducer(tasks, action) {
  //tasks  原始值
  //action 传入的内容
}
```

##### 注意：

*  **educers 必须是纯粹的** 
*  **每个 action 都描述了一个单一的用户交互，即使它会引发数据的多个变化** .

##  useContext -- 组件深层传递

1. 创建组件 context.js 组件 （组件名随意）

```css
import { createContext } from 'react';
export const testContext = createContext(500);
```

2. 在需要赋值的父组件插入

```css
  <ImageSizeContext.Provider
      value={500}
    >
	<list></list>
  </ImageSizeContext.Provider>
```

3. 在需要的子组件的地方插入

```css
import { testContext } from './Context.js';
const testContext = useContext(testContext);
```

## useRef

>  更改 ref 不会重新渲染组件
>
>  **不要在渲染过程中读取或写入** 
>
>  **将 ref 视为应急方案**  

```css
import { useRef } from 'react';

const inputRef = useRef(null);
//返回的对象
{ current: 0 } // 你向 useRef 传入的值 


```

#### 操作dom

* 不能在组件上直接使用，需要传入后，重新赋值

```css
<input ref={inputRef} /> 

<MyInput ref={inputRef} />
const MyInput = forwardRef((props, ref) => {
  return <input {...props} ref={ref} />;
});


```



###  useEffect

> 通常用于暂时“跳出” React 代码并与一些 **外部** 系统进行同步
>
> **`useEffect` 包裹副作用，把其中的代码分离到渲染逻辑的计算过程之外**  

```css
useEffect(() => {
  // 这里的代码会在每次渲染后执行
});

useEffect(() => {
  // 这里的代码只会在组件挂载后执行
}, []);

useEffect(() => {
  //这里的代码只会在每次渲染后，并且 a 或 b 的值与上次渲染不一致时执行
}, [a, b]);
```

##### 1、**声明 Effect** 

>  每当组件渲染时，React 将更新屏幕， `useEffect` 中的代码就会运行

```css
import { useEffect } from 'react';
 useEffect(() => {
    // 每次渲染后都会执行此处的代码
 });
```

##### 2、 **指定 Effect 依赖** 

* 将 **依赖属性** 传入 `useEffect` 的第二个参数 , 如果在上一次渲染时**依赖属性**与当前相同，就跳过重新运行 Effect 
* 如果 `ref` 是从父组件传递的，则必须在依赖项数组中指定它 

```css
import { useState, useRef } from 'react';
  useEffect(() => {
  },[`依赖属性`]);

  useEffect(() => {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }, [isPlaying]);
```

##### 3、 **必要时添加清理（cleanup）函数** 

> 在开发环境中，React 会在初始挂载组件后，立即再挂载一次，所以组件被卸载时，也要调用清理函数 
>
> 不加清楚函数，会执行两遍useEffect
>
> **在执行下一轮渲染的 Effect 之前清理上一轮渲染的 Effect** 

```css
  useEffect(() => {
    const connection = createConnection();
    connection.connect();//请求连接
    return () => {
      connection.disconnect(); //断开连接
    };
  }, []);
```

#### 注意：

*  **避免当 prop 变化时，在 Effect 中调整/重置 state** 
*  **避免在 Effect 中处理属于事件特定的逻辑**
*  **避免链接多个 Effect 仅仅为了相互触发调整 state** 
*  **避免把只需要执行一次的逻辑放在 Effect 中** 
*  **避免在 Effect 中传递数据给父组件** 
*  **避免没有清除逻辑的获取数据**  



# 类组件

## 事件响应

> 事件对象就是参数的最后一个 -- 非原生的

### this指向问题

```css
class ckickButton extends React.Component{
     //调用上级一定要用this.handleClick.bind(this)，不然this指向为undefin
    function  handleClick(){ }
    //可以把方法写成匿名箭头函数，解决这个问题,
    handleClick=（a,b）=>{}
    render(){
        return <button onClick = {this.handleClick.bind(this) >点击事件</button>
    }
}
```

### 传参问题

```css
//使用bind，来传参
class ckickButton extends React.Component{
    handleClick=（a,b）=>{
        console.log(a,b)
    }
    render(){
        return <button onClick = {this.handleClick.bind(this,1,2) >点击事件</button>
    }
}
```

## 响应式数据

> 继承 `PureComponent` 组件，当重复渲染时，会跳过
>
> `PureComponent`组件下，数组和对象，内存地址改了之后，才会更新

>必须使用`setState`更新数据，才会触发 --- 类似扩展运算符{...newObj,...oldObj}
>
>`setState`是异步更改

```css
class ckickButton extends React.PureComponent{
    state = {
        a:0
    }
    addA = ()=>{
        //方法一
        this.setState({
        	a:++this.state.a 
            b:[...this.state.b] //数组一定要更改内存地址
        })
        //方法二
        this.state.a++  
        this.setState({})
        //方法三
        this.setState((state)=>{
            return{ a:++state.a }
        })
    }
    render(){
        return <button @onClick={this.addA}>{this.state.a}</button>
    }
}
```




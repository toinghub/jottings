# [React](https://react.docschina.org/learn#adding-styles)


## 添加样式 -- className

> 使用className关键字添加
>
>  内联 `style` 属性 使用驼峰命名法编写 

```react
<img className="avatar"  style={{backgroundColor:'red'}} />
```

## 显示数据 -- {}

> 使用大括号嵌入js元素
>
> 行内使用时，不加引号“”

```react
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

```react
let content
if(isLogin){
    content = <AdminPanel />
}else{
    content = <LoginForm />
}
return <div> {content} </div>
```

### 多次判断

```react
<div>
	{isLogin ? (<AdminPanel />) : ( <LoginForm />)}
</div>
```

### 单次判断

```react
<div>
	{isLogin && <AdminPanel /> }
</div>
```

## 渲染列表 --  map

> 外层必须有父元素
>
>  必须给数组中的每一项都指定一个 `key` 

```react
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

```react
//可以直接在jsx中使用放法
 <ul>
    {people.map(person =>
      <li key={person.id}>
      </li>
    )}
  </ul>
```

## 响应事件 

> 直接传递函数，而非调用

```react
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

```react
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

```react
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

```react
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



## Hook  --   `use` 开头的函数被称为 **Hook** 

>  只能在你的组件（或其他 Hook）的 **顶层** 调用 Hook 

### useState

> 保存每次更新后的记录
>
> 多次渲染同一组件，每个组件都有自己的state
>
> **相同位置的相同组件会使得 state 被保留下来**
>
> **使用 key 来重置 state**(使用 key 重置表单)

```react
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

```react
const [position, setPosition] = useState({ x: 0, y: 0 });
```

#### 更新状态中对象

> 状态可以持有任何类型的 JavaScript 值 
>
> 不应该直接改变你在 React 状态中持有的对象和数组 
>
> 使用 `...` 展开语法来复制你想改变的对象和数组 

```react
setPosition({ ...position, x: 100 })
```

#### 更新状态中数组

> 更新存在状态中的数组时，你需要创建一个新数组 

```react
 setList(list.map(item => {
      return { ...item, seen: nextSeen };
  }));
```

## 组件

* `export default `导出
*  标签和 `return` 关键字如果不在同一行，则必须把它包裹在一对括号 
*  没有括号包裹的话，任何在 `return` 下一行的代码都将被忽略
* **组件首字母必须大写**

```react
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

```react
function MyButton({ count=100, onClick }) { //需要用{}解构
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}
```

```react
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
```

### 组件插槽

```react
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

## [JSX规则](https://react.docschina.org/learn/writing-markup-with-jsx#the-rules-of-jsx)

* **只能返回一个根元素**，如果包含多个元素，**需要用一个父标签把它们包裹起来** 
* **标签必须闭合**
* **使用驼峰式命名法给大部分属性命名**
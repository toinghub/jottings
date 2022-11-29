# css随笔

```css
position: sticky; //粘性布局	
background: linear-gradient(180deg, #f2f2f2, #ffffff);  //背景渐变
width:calc(100% - 100px)  //单位换算计算
visibility:hidden; 隐藏元素（位置保留）
:src="require('./1.jpg')" uniapp 使用本地路径加require
border-bottom: 50px solid transparent;   //transparent 透明
user-select   //用户选择文本 node:禁止 all:选中所有
filter:grayscale() //让网站变灰
```

伪类 | 伪元素

```css
:empty   //当节点为空时，执行此样式
:focus-within //元素获得焦点，或该元素的后代元素获得焦点，就会匹配
::placeholder //修改placeholder的样式
::selection //自定义选中样式 有限制样式
```

鼠标事件穿透当前层

```css
pointer-events:none //鼠标事件穿透当前层 | 禁止鼠标事件
pointer-events:auto //鼠标不会穿透当前层
```

苹果底部边距

```css
padding-bottom: constant(safe-area-inset-bottom);
padding-bottom: env(safe-area-inset-bottom);
```

字体渐变色

```css
background-image: linear-gradient(right, #7a492f, #cb7e3c); // 为元素提供渐变色背景
background-clip: text;  // 用文本剪辑背景
-webkit-text-fill-color: transparent;  //使用透明颜色填充文本  
```

撑满子元素高度

```css
overflow: hidden ;  //父元素  
margin-bottom:-200px;padding--bottom:200px //子元素
```

文本溢出

```css
//单行
overflow: hidden;            // 溢出隐藏
text-overflow: ellipsis;      // 溢出用省略号显示
white-space: nowrap;          // 规定段落中的文本不进行换行

//多行
overflow: hidden;             // 溢出隐藏
text-overflow: ellipsis;      // 溢出用省略号显示
display: -webkit-box;          // 作为弹性伸缩盒子模型显示。
-webkit-box-orient: vertical;  // 设置伸缩盒子的子元素排列方式：从上到下垂直排列
-webkit-line-clamp: 2;         // 显示的行数
```

css变量

```css
:root{   //web是:root   小程序是page
    --size:100  
}
div{ //var 读取  calc 计算
    width:calc(var(--size)*2px)
}

@padding-md:15px
padding:@padding-md
```

css 类绑定

```html
<template>
  <!-- 0. 普通写法 -->
  <div :class="color"></div>
  <!-- 1. 对象语法 -->
  <div :class="{ red: isRed }"></div>
  <!-- 2. 数组语法  解析这两个变量 添加class -->
  <div :class="[classA, classB]"></div>
  <!-- 3. 综合写法 -->
  <div :class="[classA, { classB: isB, classC: isC }]"></div>
  <!-- 4. 三元运算 -->
  <div :class="isRed ? 'red' : ''"></div>
</template>
```

让每个元素之间隔开px

```css
display: flex | grid；
gap: 20px;
```




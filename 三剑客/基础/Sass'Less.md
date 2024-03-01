# Sass/Less

### postCss

> 后处理器 --- 在less和sass预处理器处理完后，处理lees/sass的原生css内容

* 对高级的css语法降级，以此来适配低版本浏览器
* 前缀补全 ---webkit



# [Sass](https://www.sass.hk/guide/)

```css
gem install sass
```

##  变量声明

```css
$nav-color: #F90;
nav {
  $width: 100px;
  width: $width;
  color: $nav-color;
}

//编译后
nav {
  width: 100px;
  color: #F90;
}
```



## 变量引用

```css
$highlight-color: #F90;
$highlight-border: 1px solid $highlight-color;
.selected {
  border: $highlight-border;
}

//编译后

.selected {
  border: 1px solid #F90;
}
```



## 嵌套CSS

```css
#content {
  article {
    h1 { color: #333 }
    p { margin-bottom: 1.4em }
  }
   &:hover { color: red }
}
```



## 嵌套属性

```css
nav {
  border: 1px solid #ccc {
  left: 0px;
  right: 0px;
  }
}

//编译后
nav {
  border: 1px solid #ccc;
  border-left: 0px;
  border-right: 0px;
}
```



##  静默注释

```css
body {
  color: #333; // 这种注释内容不会出现在生成的css文件中
  padding: 0; /* 这种注释内容会出现在生成的css文件中 */
}
```





# [Less](https://less.bootcss.com/#%E6%A6%82%E8%A7%88)

```css
npm install -g less
```

## 变量（Variables）

```css
@width: 10px;
@height: @width + 10px;
#header {
  width: @width;
  height: @height;
}
```

编译后

```css
#header {
  width: 10px;
  height: 20px;
}
```



## 混合（Mixins）

>  将一组属性从一个规则集包含（或混入）到另一个规则集的方法 

```css
//定义的类
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}

//使用
.post a {
  color: red;
  .bordered();
}
```



##  嵌套（Nesting）

>  使用嵌套（nesting）代替层叠或与层叠结合使用的能力 

```css
#header {
  color: black;
  .navigation {
    font-size: 12px;
  }
  &:after{
    content:'';
    font-size:0
  }
}
```



##  @规则嵌套和冒泡

> @ 规则（例如 `@media` 或 `@supports`）可以与选择器以相同的方式进行嵌套
>
> @ 规则会被放在前面，同一规则集中的其它元素的相对顺序保持不变。这叫做冒泡 

```css
.component {
  width: 300px;
  @media (min-width: 768px) {
    width: 600px;
    @media  (min-resolution: 192dpi) {
      background-image: url(/img/retina2x.png);
    }
  }
}
```

**编译后**

```css
.component { width: 300px }
@media (min-width: 768px) {
  .component { width: 600px }
}
@media (min-width: 768px) and (min-resolution: 192dpi) {
  .component { background-image: url(/img/retina2x.png) }
}
```



##  calc() 特例

```css
@var: 50vh/2;
width: calc(50% + (@var - 20px));  // 结果是 calc(50% + (25vh - 20px))
```



## 映射（Maps）

```css
#colors() {
  primary: blue;
  secondary: green;
}

.button {
  color: #colors[primary];
  border: 1px solid #colors[secondary];
}
```

**编译后**

```css
.button {
  color: blue;
  border: 1px solid green;
}
```



## 作用域（Scope）

```css
@var: red;
#page {
  @var: white;
  #header {
    color: @var; // blue
  }
  @var: blue;
}
```



## 导入（Importing）

```css
@import "typo.css";
```


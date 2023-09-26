# [Grid](https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)

**容器( container )** 

*  网格布局的区域

**项目( item )** 

* 容器内部采用网格定位的子元素

**行( row )** 

* 水平区域

**列 ( column)** 

* 垂直区域

 **单元格( cell )**

* 行和列的交叉区域 
*  n 行和 m 列会产生 n x m 个单元格 

**网格线(  gridLine  )** 

*  水平网格线划分出行，垂直网格线划分出列
*  n 行有 n + 1 根水平网格线，m 列有 m + 1 根垂直网格线 

# 容器属性

##  display

> 指定一个容器采用网格布局

|      grid       |   采用网格布局 -- 块级元素   |
| :-------------: | :--------------------------: |
| **inline-grid** | **采用网格布局 -- 行内元素** |



## template-columns  /template-rows

> **grid-template-columns -- 定义每一列的列宽** 
>
> **grid-template-rows  -- 定义每一行的行高** 

```css
display: grid;
grid-template-columns: 25% 25% 25% 25%;
grid-template-rows:  25% 25% 25% 25%;
```

| **repeat()**  |          重复的值          |  repeat(4, 25%) -- (次数，内容)  |
| :-----------: | :------------------------: | :------------------------------: |
| **auto-fill** |        **自动填充**        |   **repeat(auto-fill, 100px)**   |
|    **fr**     |        **比例关系**        | **1fr 2fr (后者是前者的两倍宽)** |
|  **minmax**   |        **长度范围**        |       **minmax(min, max)**       |
|   **auto**    |      **自己决定长度**      |          **100px auto**          |
|    **[ ]**    | **指定每一根网格线的名字** |    **[r1] 100px [r2] 100px**     |



## template-areas

> **grid-template-areas --  定义区域** 

```css
display: grid;
grid-template-columns: 100px 100px 100px;
grid-template-rows: 100px 100px 100px;
grid-template-areas: 'a b c' 'd e f' 'g h i';
```

**合并某区域**

```css
grid-template-areas: 'a a a' 'b b b' 'c c c';
```

**占位符 .** 

> 该单元格不属于任何区域 

```css
grid-template-areas: 'a . a' 'b . b' 'c . c';
```

#### 注意:

*  区域的命名会影响到网格线 
*  起始网格线自动命名为**区域名-start**
*  终止网格线自动命名为**区域名-end**



## grid-template

>  **grid-template-columns、grid-template-rows 、grid-template-areas 合并简写** 
>
> 

## auto-columns / auto-rows

> 当网格只有3列，但是某一个项目指定在第5行。浏览器会自动生成多余的网格，以便放置项目。 

> grid-auto-columns --  设置浏览器自动创建的多余网格的列宽 
>
> grid-auto-rows --  设置浏览器自动创建的多余网格的行高 

```css
grid-auto-columns: 50px; 
grid-auto-rows: 50px; 
```



## row-gap / column-gap 

> **row-gap  --  行与行的间隔（行间距）** 
>
> **column-gap -- 属性设置列与列的间隔（列间距）** 

```css
gap: <grid-row-gap> <grid-column-gap>
```

```css
row-gap: 20px;
column-gap: 20px;
gap: 20px 20px;
```



## auto-flow

> **grid-auto-flow --  设置子元素顺序** 

```css
grid-auto-flow: row;
grid-auto-flow: row dense;
grid-auto-flow: column;
grid-auto-flow: column dense;
```

|       row        |         先行后列         |
| :--------------: | :----------------------: |
|  **row dense**   | **先行后列 -- 紧密填满** |
|    **column**    |       **先列后行**       |
| **column dense** | **先列后行 -- 紧密填满** |



## justify-items / align-items

> **justify-items --  单元格内容的水平位置（左中右）** 
>
> **align-items  --  单元格内容的垂直位置（上中下）** 

```css
justify-items: start | end | center | stretch;
align-items: start | end | center | stretch;

place-items: <align-items> <justify-items>;
place-items: start end;
```

|    start    |           对齐单元格的起始边缘           |
| :---------: | :--------------------------------------: |
|   e**nd**   |         **对齐单元格的结束边缘**         |
| **center**  |            **单元格内部居中**            |
| **stretch** | **拉伸，占满单元格的整个宽度（默认值）** |



## justify-content / align-content

> **justify-content --   整个内容区域在容器里面的水平位置（左中右） ** 
>
> **align-content  --   整个内容区域的垂直位置（上中下） ** 

```css
justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
  align-content: start | end | center | stretch | space-around | space-between | space-evenly; 

place-content: <align-content> <justify-content>
place-content: space-around space-evenly;
```

|       start       |            对齐容器的起始边框            |
| :---------------: | :--------------------------------------: |
|      **end**      |          **对齐容器的结束边框**          |
|    **center**     |             **容器内部居中**             |
|    **stretch**    | **拉伸占据整个网格容器 -- 未设置大小时** |
| **space-around**  |  **平均分布 -- 两边保留项目间距的一半**  |
| **space-between** |         **平均分布 -- 两边靠边**         |
| **space-evenly**  |             **完全平均分布**             |



##  grid 

>  grid-template-rows  、 grid-template-columns 、 grid-template-areas 、 grid-auto-rows 、 grid-auto-columns 、 grid-auto-flow 、简写



# 项目属性

## column-start / column-end / row-start / row-end

>  **指定项目的四个边框，分别定位在哪根网格线** 

|  grid-column-start  |   左边框所在的垂直网格线    |
| :-----------------: | :-------------------------: |
| **grid-column-end** | **右边框所在的垂直网格线**  |
|   **grid-column**   | **上方简写 -- start / end** |
| **grid-row-start**  | **上边框所在的水平网格线**  |
|  **grid-row-end**   | **下边框所在的水平网格线**  |
|    **grid-row**     | **上方简写 -- start / end** |
|      **span**       |     **跨越 -- span 2**      |

```css
//项目的左边框是第二根垂直网格线，右边框是第四根垂直网格线
grid-column-start: 2;
grid-column-end: 4;

//指定为第几个网格线，还可以指定为网格线的名字
grid-column-start: header-start;
grid-column-end: header-end;

//项目的左边框距离右边框跨越2个网格
grid-column-start: span 2;
```

#### 简写

```css
grid-column: <start-line> / <end-line>;
grid-row: <start-line> / <end-line>;

grid-column: 1 / 3;
grid-row: 1 / 2;

grid-column-start: 1;
grid-column-end: 3;
grid-row-start: 1;
grid-row-end: 2;
```



## grid-area

> **grid-area --  指定项目放在哪一个区域** 
>
> **可用作grid-row-start、grid-column-start、grid-row-end、grid-column-end的合并简写** 

```css
//直接名字指定区域
grid-area: e;

//合并简写方式指定区域
grid-area: <row-start> / <column-start> / <row-end> / <column-end>;
grid-area: 1 / 1 / 3 / 3
```



## justify-self / align-self

>  **justify-self --  单元格内容的水平位置（左中右）** 
>
>  **align-self -- 单元格内容的垂直位置（上中下）** 
>
>  **place-self -- 上方合并简写**

```css
justify-self: start | end | center | stretch;
align-self: start | end | center | stretch;

//合并简写
lace-self: <align-self> <justify-self>;
place-self: center center;
```

|    start    |           对齐单元格的起始边缘           |
| :---------: | :--------------------------------------: |
|   **end**   |         **对齐单元格的结束边缘**         |
| **center**  |            **单元格内部居中**            |
| **stretch** | **拉伸，占满单元格的整个宽度（默认值）** |
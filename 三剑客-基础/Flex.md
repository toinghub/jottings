# [Flex](http://c.biancheng.net/css3/flex.html)

# 容器属性

## flex-direction

>  弹性子元素在父容器中的位置 

|      **row**       |   横向从左到右排列   |
| :----------------: | :------------------: |
|  **row-reverse**   | **横向从右到左排列** |
|     **column**     | **纵向从上至下排列** |
| **column-reverse** | **纵向从下至上排列** |



## flex-wrap 

>  弹性盒子的子元素换行方式 

|    **nowrap**    | 单行 -- 可能溢出容器 |
| :--------------: | :------------------: |
|     **wrap**     | **多行 -- 从上至下** |
| **wrap-reverse** | **多行 -- 从下至上** |



## flex-flow

>   flex-direction 、flex-wrap 两个属性简写 



## justify-content

> 内容沿着弹性容器的主轴线对齐 
>
>  元素在行内的对齐 

|  **flex-start**   |               行头堆叠               |
| :---------------: | :----------------------------------: |
|   **flex-end**    |             **行尾堆叠**             |
|    **center**     |             **居中对齐**             |
| **space-between** |       **平均分布 -- 两边靠边**       |
| **space-evenly**  |           **完全平均分布**           |
| **space-around**  | **平均分布 -- 两边保留元素间距一半** |



## align-items 

>  弹性盒子在侧轴(纵轴)方向上的对齐 

|  flex-start  |           起始端对齐           |
| :----------: | :----------------------------: |
| **flex-end** |         **末尾段对齐**         |
|  **center**  |          **居中对齐**          |
| **baseline** |          **基线对齐**          |
| **stretch**  | **子容器尺寸拉伸到父容器一致** |



## align-content

>  各行在所在的flex容器里的对齐 
>
> 类似 justify-content

|      stretch      |          伸展占用剩余的空间          |
| :---------------: | :----------------------------------: |
|  **flex-start**   |           **起始位置堆叠**           |
|   **flex-end**    |           **结束位置堆叠**           |
|    **center**     |             **居中对齐**             |
| **space-between** |       **平均分布 -- 两边靠边**       |
| **space-around**  | **平均分布 -- 两边保留元素间距一半** |



# 项目属性

## order

> 项目在容器中出现的顺序 

```css
order: number;
```

```css
.flex div:nth-child(1) {
    order: 2;
 }
.flex div:nth-child(2) {
    order: 5;
 }
```



## align-self

>  某个项目设置不同于其它项目的对齐方式 
>
>  可以覆盖 align-items 属性的值  

|     auto      |    继承其父容器的值    |
| :-----------: | :--------------------: |
|  **stretch**  |   **拉伸以适合容器**   |
|  **center**   |     **容器的中央**     |
| **flex-star** |     **容器的顶部**     |
| **flex-end**  | **项目位于容器的底部** |
| **baseline**  |  **与容器的基线对齐**  |

```css
align-self: flex-start;
```



## flex

>  flex-grow、flex-shrink 和 flex-basis 三个属性的简写 
>
>   两个快捷值，分别为 auto（1 1 auto）和 none（0 0 auto） 

```css
flex: flex-grow flex-shrink flex-basis;
flex:1 1 auto;
```

|  flex-grow  |     number -- 默认0     | 项目相对于其他项目的增长量 |
| :---------: | :---------------------: | :------------------------: |
| flex-shrink |     number -- 默认1     | 项目相对于其他项目的收缩量 |
| flex-basis  | string \ auto \ inherit |   项目的长度 -- 默认auto   |




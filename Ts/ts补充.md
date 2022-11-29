# ts 补充

#### 注意事项

>不确定类型 , 应该使用unknown 
>
>当属性可选时，应该用类继承的方式去书写

#### vue2 补充

```js
@Watch('message',{
    immediate:true,    
    // immediate表示在watch中首次绑定的时候，是否执行handler，
    // 值为true则表示在watch中声明的时候，就立即执行handler方法，
    // 值为false，则和一般使用watch一样，在数据发生变化的时候才执行handler。
})
```


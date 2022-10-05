# vue3

## 注意

> filters过滤器被删除
>
> 页面生命周期函数名换了
>
> vue2是类写法，vue3函数写法(没有this了)
>
> 文件template下可以放多个根节点，而不像vue2只能放一个根节点

## Composition Api介绍

#### 指令

```js
//全局指令
createApp(App).directive('focus', {
  mounted(el,binding) {  //生命周期名字换了
  }
})
```

#### 路由

```js
import { useRouter,useRoute } form 'vue-router'
const router = useRouter() //router == this.$router
const route = useRoute() //route == this.$route 取值
```

##### 路由模式

```js
const router = createRouter({
  history: createWebHistory(), //history模式
  history: createWebHashHistory(), //hash模式
  routes
})
```

##### 声明式导航

```html
<!-- custom   自定义   --> 
<!-- isActive 是否被选中 --> 
<!-- navigate 点击事件回调 -->
<router-link to='/index'  custom v-slot="navigate,isActive">
	<li @click='navigate'></li> 
</router-link>
```



### 生命周期

| VUE2          | vue3            |
| :------------ | :-------------- |
| beforeCreate  | setup           |
| Created       | setup           |
| beforeMount   | onBeforeMount   |
| mounted       | onMounted       |
| beforeUpdate  | onBeUpdate      |
| updated       | onUpdate        |
| beforeDestroy | onBeforeUnmount |
| destroyed     | onUnmounted     |

```js
import { reactive,onBeforeMount,onMounted } from "vue"
setup(){
    onBeforeMount(()=>{})
    onMounted(()=>{})
}
```



### reactive

>创建响应式对象
>
>reactive参数不能是字符串或者数字，否则会警告

```vue
<div>{{obj.myname}}</div> 
<button @click="handleClick()">change</button>
<script>
import { reactive } from "vue" 
setup () {
    const obj = reactive({ //可以写多个reactive函数
      myname: "toing"  //类似data中的值
    })
    const data = reactive({}) //可以直接创建空对象、空数组
    const handleClick = () => {  //触发的方法
      obj.myname = "changeToing"
    }
    return {obj,handleClick,data} //要返回
  },
</script>
```

### ref

##### 访问原生dom节点

```vue
<view ref="myref"></view>
<script>
import { ref } from "vue" 
setup () {
    const myref = ref() //创建ref函数
    const handleClick = () => {  //触发的方法
     console.log(myref.value)
    }
    return {myref} 
  },
</script>
```

##### ref拦截字符串

> 有reactive一样的功能，可以拦截数据

```vue
<div>{{refText}}</div>  <!--> 此处默认省略了value 实际上refText.value-->
<button @click="handleClick()">change</button>
<script>
import { ref } from "vue" 
setup () {
    const refText= ref("kerwin") //可以直接拦截字符串
    const handleClick = () => {  //触发的方法
       refText.value = "changeToing" 
    }
    return {refText,handleClick} 
  },
</script>
```

### toRefs

> 把reactive里的每个属性，转化成ref对象，再通过...展开，变成多个ref对象
>
> 在template中，用ref语法，js中用reactive语法

```vue
<div>{{myname}}--{{myage}}</div> 
<script>
import { reactive,toRefs } from "vue" 
setup () {
    const obj = reactive({ 
      myname: "toing",
      myage:"100"
    })
    return {
        ...toRefs(obj),//在template中不用写obj.了
    } 
  },
</script>
```

### props&emit

```js
props:['myname']
setup(props,{emit}){
	const myname = props.myname //接受父组件数据
    const handleClick=()=>{
        emit("isShow",11) //子传父
    }
    return{myname,handleClick}
}
```

### 计算属性

```js
setup(){
	const computedList = computed(()=>{ return 1 })
    return{computedList}
}
```

### watch

```js
watch(()=>obj.name,(newValue,oldValue)=>{
   console.log(newValue,oldValue) 
})
```

### 自定义hooks

##### 将逻辑代码分离页面，写在外部的js文件中

```js
//页面vue文件
import {getData} from './app.js' //引入逻辑js文件

setup(){
    const obj = getData()
    return { obj }
}

//app.js文件   逻辑代码
import {onMouted} from "vue"
function getData()
  //  const obj = ref([])
  cosnt obj = reactive({
      list.[]
  })
  onMouted(()=>{
      obj.list = [1,2,3]
  })
  return obj
}

exprot { getData }
```

### vuex

```js
import { useStore } from 'vuex' //引入逻辑js文件

setup(){
    const store = useStore() //store == this.$store
}
```

### 依赖注入功能

>provide、inject 共享后，所有子组件都可以访问到

```js
//主要文件
const isShow = ref(true)
provide("kerwin",isShow) //提供一个名为kerwin的服务

//下级所有子组件，不限层级
const isShow = inject("kerwin")//将一个名为kerwin服务的地址栈注入到isShow中

```


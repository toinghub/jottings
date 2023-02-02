

# 基础

## 创建项目

```js
npm install -g @vue/cli  安装vuecli
vue create vue  创建vue项目
```



## 知识

>查兼容性  caniuse.com
>
>vue3生命周期销毁名字改动
>
>vue修饰符keyup后面可以直接跟键位值  keyup.65
>
>可以给input标签加上vlaue来通过$event 获取
>
>多选框可以直接通过value通过model添加进数组
>
>方法可以直接写到标签内，getData() 直接return出去了，
>
>betterScroll  实现页面中拖动滚动拉动等属性功能
>
>window 远程桌面连接



## 动态添加对象属性

vue2 无法直接拦截，vue3可以直接改

```js
vue.set(对象,属性,true)
vue set(vm.classObj,"dd",true)
```



# 组件：

```html
<div ref ></div>  <!-- 可以通过ref直接父组件修改子组件的值 -->
<div v-once ></div> <!-- 确保内容只执行一次，缓存后不会保存 --> 
```

```javascript
//中央事件主线
var bus = new Vue    //通过new vue 创建实例  
bus.$emit("kerwin",data)  //传入数据
bus.$On("kerwin",(data)=>{})  //接受数据
```



### [对象组件传值](https://cn.vuejs.org/guide/components/v-model.html)

```html
<BlogPost id=1  :title='My Journey with Vue' />
<!-- 上下相等 --> 
<BlogPost v-bind="post" />
<script>
post: {
  id: 1,
  title: 'My Journey with Vue'
 }
</script>
```



### 组件使用v-model

```html
<CustomInput
  :modelValue="searchText"
  @update:modelValue="newValue => searchText = newValue"
/>
<!-- 等同于下方 -->
<CustomInput v-model="searchText" />
<!-- 可以更改默认值modelValue为: xxx -->
<CustomInput v-model:title="searchText" />
```

```js
value: {
  get() {
 	 return this.modelValue
  },
  set(value) {
 	 this.$emit('update:modelValue', value)
  }
}
```



### [透传](https://cn.vuejs.org/guide/components/attrs.html)

> 可以在js中访问组件的所有透传  this.$attrs 

```html
<CustomLayout id="custom-layout" @click="changeValue" />
```

```js
<header>...</header>
//changeValue 将会透传到main根标签上
<main v-bind="$attrs">...</main> 
<footer>...</footer>
```





# 插槽：

```html
<!-- 旧版具名插槽-->
<div slot="a"></div>
<slot name="a"></slot> 
<!-- 新版插槽 -->
<template #a></template>
<slot name="a"></slot> 
```



### [父组件通过插槽问子组件属性](https://cn.vuejs.org/guide/components/slots.html)

#### 默认插槽

```html
<MyComponent v-slot="slotProps">
  {{ slotProps.text }} {{ slotProps.count }} <!-- 结果: greetingMessage  1 -->
</MyComponent>
<!-- MyComponent组件内部 -->
<div>
  <slot :text="greetingMessage" :count="1"></slot>
</div>
```

#### 具名插槽

```html
 <MyComponent>
    <!-- 使用显式的默认插槽 -->
    <template #default="{ message }">
      <p>{{ message }}</p>
    </template>

    <template #footer>
      <p>Here's some contact info</p>
    </template>
  </MyComponent>

<!-- MyComponent组件内部 -->
<!-- 没有name为默认插槽，name为插槽的保留字，不能用作属性名 -->
<slot message="header" ></slot>  
<slot name="footer" message="header" ></slot>
```





# 指令：

[自定义指令](https://v2.cn.vuejs.org/v2/guide/custom-directive.html#ad)

this默认指向是window

```javascript
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  inserted(el,binding) {  // inserted 被绑定元素插入父节点时调用
  }
})
vue.directive('focus',(el,binding)=>{}) //简写  创建或更新都会执行

//局部指令
directives: {
  focus: {
    inserted (el) { 
    }
  }，
  
  focus: (el){}，//简写
}

v-focus="{index:1,name:q}"  //只有一个参数，但是可以传数组和对象
```

* vue3中，指令的生命周期名字改成和组件生命周期一致了
* $nextTick()   页面渲染完毕之后再加载





# vue.config.js 文件配置

@ 别名   =》永远指向src的绝对路径

```js
module.exports={
   devServer :{
    proxy :{ //配置反向代理
        '/ajax':{ //确定应该将哪些请求代理到目标主机
            target:"https://baidu.com",//要代理到的目标主机
            changeOrigin: true, //是否确认代理
    		pathRewrite: { '^/ajax': '',}, ///路径重写
      	  }
    	},
	},
    configureWebpack:{
        resolve:{
            alias:{ //配置别名
             	'assets':'@/assets',
                'components':'@/components'
            }
        }
    }
}

```



# 路由：

##### router.js

```js
Vue.use(VueRouter) //注册路由插件，两个全局组件  router-view  router-link
routers:[ 
    {
    path: '/bill',
    component: Layout, //跳转路径
    redirect: '/bill/equipmentList', //路由重定向
    alwaysShow: true, //是否显时
    name: '账单管理',
    meta:{isShhow:true}
    children: [ //嵌套路由
      {
        path: 'billList',
        name: '账单列表',
        component: () => import('@/shopViews/bill/billList'),
       },
   	 ]
  	},
    {  //路由重定向
        path:"*",
        redirect:"/index" //未匹配到时 重定向到index
    }
]
const touter = new VueRouter({
        mode:"history",//路由模式
        routes
    })
```

```html
<router-view></router-view>  <!-- 路由容器 -->
```

### 声明式导航

```html
<a href="/#/index"></a>

<!-- router版本4之前可用 -->
<!-- to  后面为router定义的路由路径  -->
<!-- active-class 选中那个路由，那个就会添加kerwin  -->
<!-- tag 可以更改解析后的标签  默认为a便签 -->
<router-link to="/index" active-class="kerwin"></router-link> 

<!-- router版本4之后可用 -->
<!-- custom   自定义   --> 
<!-- isActive 是否被选中 --> 
<!-- navigate 点击事件回调 -->
<router-link to='/index'  custom v-slot="navigate,isActive">
	<li @click='navigate'></li> 
</router-link>
```

### 编程式导航

```javascript
this.$router.push('/index') //路由跳转  router路由大对象  route当前匹配的路由
this.$router.replace('/') //和push功能一样，但是不会留下历史记录


//返回上一级  
router.back() 

//动态路由
path:'/index/:myId' //动态路由  router.js文件
this.$router.push(`/index/${id}`)  
this.$toute.params.myId //拿到当前路由参数

//命名路由
name:'kerwin' //router.js 路由中命名
this.$router.push({ //跳转到名字为kerwi的路由
    name:'kerwi',
    params:{ id, }
}) 

```

### [路由模式](https://juejin.cn/post/7150794643985137695)

hash模式（location.hash + hashchange 事件）

>`window.onhashchange`   监听路径是否改变
>
>hash 模式的实现方式就是通过监听 URL 中的 hash 部分的变化，触发`haschange`事件，页面做出不同的响应。但是 hash 模式下，URL 中会带有 #，不太美观。 

history模式

>后端需要配置，当`url`无匹配资源时，返回同一个index.html页面
>
> history 路由模式的实现，基于 HTML5 提供的 History 全局对象 

```js
history.pushState() //向当前浏览器会话的历史堆栈中添加一个状态，会改变当前页面url，但是不会伴随这刷新
history.replaceState()//将当前的会话页面的url替换成指定的数据，replaceState 会改变当前页面的url，但也不会刷新页面
```



### 全局路由守卫

```js
meta:{isShhow:true} //to可以获取到meta的值   to.meta.isShhow
router.beforEach(to,from,next)=>{ //to 即将进入的路由对象 from 正要离开的路由对象
    next()  //直接放行
    next('/login') //也可重定向
    next({
        path:'/login',
        query:{path:'index'} //可以拼接参数
    }) 
} 
```

### 独享路由守卫

```js
 {
    path: '/bill',
    component: Layout, 
    redirect: '/bill/equipmentList', 
    alwaysShow: true, 
    name: '账单管理',
    meta:{isShhow:true},
    beforEach(to,from,next)=>{ //写在路由内部，为独享路由守卫
    	next()  
	} 
},
```

### 局部路由守卫

本质上是路由的生命周期

> `beforeRouteEnter(to,from,next)=>{}`组件创建前调用，不能使用组件实例this
>
> ` beforeRouteUpdate(to,from,next)=>{}`路由被改变，但是组件被复用时调用
>
> ` beforeRouteLeave(to,from,next)=>{}`导航离开时该组件调用



### 路由懒加载

按需加载

```js
component: () => import('@/shopViews/bill/billList'),
```



### 组件UI库

>elmentUi  pc端   饿了吗开发  [地址](https://element.eleme.cn/#/zh-CN)
>
>Vant   移动端    有赞开发  [地址](https://youzan.github.io/vant/v2/#/zh-CN/home)



### axios 请求

```js
import axios from "axios";

const service = axios.create({  //创建axios实例
  baseURL: '', 
  timeout: 10000 
});
service.interceptors.request.use(  //发请求前拦截
  config => {},
  error => {}
);

service.interceptors.response.use(  //响应后拦截
  response => {},
  error => {}
);
export default service;

```



# mixins   混入

[地址](https://v2.cn.vuejs.org/v2/api/#mixins)

```js
var mixin = new Vue({  
  created () { this.$store.commit('changeId',1) },//当没有cerated才会生效
  mounted(){ this.$store.commit('changeId',2) }
  methods:{ //当没有相同的时，会添加进去，有不添加
    a(){}
}
})
mixins: [mixin]  //混入文件写了后，可以引入需要功能的文件中
```



# 动态绑定

## 动态属性

>  当值为 `null` 意为显式移除该绑定 
>
>  在 HTML attribute 名称中都是不合法的都不可以，如空格、引号
>
>  避免在名称中使用大写字母，因为浏览器会强制将其转换为小写 
>
>  不能使用复杂的动态参数 

```typescript
<a :[A]="url"> ... </a> //等同于 :B="url"
<a @[A]="change"> //等同于  @B="change"
let A = 'B'
```



## 通过计算属性绑定class

```html
<!-- 等同于:class="{ active: isActive, text-danger: error }"  -->
<div :class="classObject"></div> 
```

```js
computed: {
  classObject() {
    return {
      active: this.isActive,
      text-danger: this.error 
    }
  }
}
```



## 通过对象绑定:style

```html
<div :style="styleObject"></div>
```

```js
styleObject: {
      color: 'red',
      fontSize: '13px'
}
```





# [依赖注入](https://cn.vuejs.org/guide/components/provide-inject.html)

## 为组件后代提供数据（provide）

```js
//提供静态数据
provide: {
  message: 'hello!'
}

//提供响应式数据
provide() {
    return {
      // 显式提供一个计算属性
      message: computed(() => this.message)
    }
  }
```

## 获取上层组件提供的数据（inject）

```js
//声明需要的数据
inject: ['message']
    
    
//注入别名
inject: {
    message: {  /* 本地属性名 */
      from:  'message', // 注入来源名 当与原注入名同名时，这个属性是可选的
      default: 'default' //注入默认值
    }
```



# 内置组件

## [Transition](https://cn.vuejs.org/guide/built-ins/transition.html#the-transition-component)

|  v-enter-from  | 进入动画的起始状态 |
| :------------: | :----------------: |
| v-enter-active | 进入动画的生效状态 |
|   v-enter-to   | 进入动画的结束状态 |
|  v-leave-from  | 离开动画的起始状态 |
| v-leave-active | 离开动画的生效状态 |
|   v-leave-to   | 离开动画的结束状态 |

```vue
<Transition name="slide-fade">//有名字的class名会以name为头
  <p v-if="show">hello</p>
</Transition>
```

```css
/*
  进入和离开动画可以使用不同
  持续时间和速度曲线。
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
```



## [TransitionGroup](https://cn.vuejs.org/guide/built-ins/transition-group.html)

>  用于对 `v-for` 列表中的元素或组件的插入、移除和顺序改变添加动画效果。 
>
>  每个元素都**必须**有一个独一无二的 `key` 

```html
<TransitionGroup name="list" tag="ul">
  <li v-for="item in items" :key="item">
    {{ item }}
  </li>
</TransitionGroup>
```

```css
.list-move, /* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: absolute;
}
```



## [Teleport](https://cn.vuejs.org/guide/built-ins/teleport.html)

>  将一个组件内部的一部分模板“传送”到该组件的 DOM 结构外层的位置去。 

```html
<button @click="open = true">Open Modal</button>

<Teleport to="body"> <!-- 将下面的标签传送到body标签下面去 -->
  <div v-if="open" class="modal">
    <p>Hello from the modal!</p>
    <button @click="open = false">Close</button>
  </div>
</Teleport>
```


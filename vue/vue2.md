# vue2

### 基础

#### 创建项目

```js
npm install -g @vue/cli  安装vuecli
vue create vue  创建vue项目
```



#### 知识

>查兼容性  caniuse.com
>
>vue3生命周期销毁名字改动
>
>vue2中，后期添加数据可以用set方法，这样就会变成响应式的
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



#### 组件：

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



#### 插槽：

```html
<!-- 旧版具名插槽-->
<div slot="a"></div>
<slot name="a"></slot> 
<!-- 新版插槽 -->
<template #a></template>
<slot name="a"></slot> 
```



#### 指令：

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



### 进阶

#### vue.config.js 文件配置

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



#### 路由：

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

##### 声明式导航

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

##### 编程式导航

```javascript
this.$router.push('/index') //路由跳转  router路由大对象  route当前匹配的路由

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

//返回上一级  
router.back() 
```

##### 路由模式

>hash 默认
>
>`window.onhashchange`   监听路径是否改变
>
>history  无#号
>
>后端需要配置，当`url`无匹配资源时，返回同一个index.html页面

##### 全局路由守卫

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

##### 独享路由守卫

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

##### 局部路由守卫

本质上是路由的生命周期

> `beforeRouteEnter(to,from,next)=>{}`组件创建前调用，不能使用组件实例this
>
> ` beforeRouteUpdate(to,from,next)=>{}`路由被改变，但是组件被复用时调用
>
> ` beforeRouteLeave(to,from,next)=>{}`导航离开时该组件调用



##### 路由懒加载

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



### Vuex  状态管理模式

[文档地址](https://vuex.vuejs.org/zh/)

>vue devtools   小工具
>
>vuex 默认管理在内存，刷新页面后公共状态会丢失
>
>vuex 持久化 todo
>
>后端数据的缓存快照，较少重复数据请求
>
>actions、mutations  中的方法可以相互调用

```js
import { mapState,mapActions,mapMutations } from 'vuex'

state:{id:1}   //公共状态
this.$store.state.id  //查看state的公共状态

this.id ////查看state的公共状态
computed: {
  ...mapState(['id'])
}


actions:{ //支持异步和同步  
    requert（store, data）{} //store 下面的为解构的
    requert（{ commit, state }, data）{ 
      http().then(id=>{ //异步请求
         commit.changeId(id) //实质上还是通过store.commit,更改state值
      })
    }
}
this.$store.dispatch('requert',data )//触发actions方法 分发
this.$store.dispatch('requert',data ).then()//有返回值，就可以then

this.requert(data)  //同上面分发语法一致
 methods: {
    ...mapActions([
      'requert',
    ]),
 }
 


mutations:{ //统一管理，可以被devtools记录  只支持同步函数
    changeId(state,enterId){
        state.id = enterId //更改state的公共状态
    } 
} 
this.$store.commit('changeId',2) //触发mutations方法  交付

import { mapMutations } from 'vuex'
this.changeId(2) // 同上面交付语法一致
 methods: {
    ...mapMutations([
      'changeId', 
    ]),
 }

```



### Vuex  持久化

[vuex-persistedstate](https://gitcode.net/mirrors/robinvdvleuten/vuex-persistedstate?utm_source=csdn_github_accelerator)

[vuex-persist](https://www.npmjs.com/package/vuex-persist)

```js
npm 1 vuex-persistedstate --save  //安装

import createPersistedState from "vuex-persistedstate" //在需要的地方安装使用
const store =newVuex.Store({
 plugins: [createPersistedState()] //缓存vuex所有数据
 plugins: [createPersistedState({ //缓存配置
   storage:'localStorage', //存储的位置
   key:'vuexData', //键位名字，默认vuex 
   reducer:(state){ //需要保存的值。默认情况下，保存整个状态。
    id:state.id 
   }
 })]   
})
```





#### mixins   混入

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


# vuex

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

# vue2

## state

```js
import { mapState,mapActions,mapMutations } from 'vuex'

state:{id:1}   //公共状态 类似data
this.$store.state.id  //查看state的公共状态

this.id //查看state的公共状态
computed: {
  ...mapState(['id'])
  ...mapState({ //取别名
      userId:(state) => state.id
  })
}

```

## getters

```js
getters:{ //类似计算属性
    getdoosId:state.id=>(id)=>{
        return state.id == id ? true :false
    }
}
computed: {
  ...mapGetter(['getdoosId'])
}
```

## actions

```js
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
```

## mutations

```js
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

## modules

> 将需要写的内容模块化出去

```js
namespaced //命名空间   当有多个模块时，需要定义命名空间


import demo from './demo'
export default new Vuex.Store({
     modules:{
         demo  //模块的名称
     }
)
```

## Vuex  持久化

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



# vue3

```js
import { useStore } from 'vuex' //引入逻辑js文件

setup(){
    const store = useStore() //store == this.$store
    const count = computed(() => store.state.count),
    const double = computed(() => store.getters.double)
    const increment = () => store.commit('increment'),
    const asyncIncrement = () => store.dispatch('asyncIncrement')
}
```


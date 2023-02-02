# 注意

> filters过滤器被删除
>
> 页面生命周期函数名换了
>
> vue2是类写法，vue3函数写法(没有this了)
>
> 文件template下可以放多个根节点，而不像vue2只能放一个根节点

# 生命周期

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



# vue3 功能介绍

> #### 副作用： 执行会直接或间接影响其他函数的执行 

## 指令

```js
//全局指令
createApp(App).directive('focus', {
  mounted(el,binding) {  //生命周期名字换了
  }
})
```

## 路由

```js
import { useRouter,useRoute } form 'vue-router'
const router = useRouter() //router == this.$router
const route = useRoute() //route == this.$route 取值
```

### 路由模式

```js
const router = createRouter({
  history: createWebHistory(), //history模式
  history: createWebHashHistory(), //hash模式
  routes
})
```

### 声明式导航

```html
<!-- custom   自定义   --> 
<!-- isActive 是否被选中 --> 
<!-- navigate 点击事件回调 -->
<router-link to='/index'  custom v-slot="navigate,isActive">
	<li @click='navigate'></li> 
</router-link>
```

## 自定义hooks

### 将逻辑代码分离页面，写在外部的js文件中

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



## CSS 功能

#### 深度选择器 -- :deep()

```css
<style scoped>
.a :deep(.b) {}
</style>
```

#### css获取js变量 -- v-bind

```html
<script setup>
const theme = {
  color: 'red'
}
</script>

<style scoped>
p {
  color: v-bind('theme.color');
}
</style>
```





# vue3 API介绍

## app.config.globalProperties

>  注册能够被应用内所有组件实例访问到的全局属性的对象 

```js
app.config.globalProperties.mes = '111'
this.$mes //111
```



## reactive()

>创建响应式对象
>
>reactive参数不能是字符串或者数字，否则会警告

```html
<template>
	<div>{{obj.myname}}</div> 
	<button @click="handleClick()">change</button>
</template>
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

## shallowReactive()

>  [`reactive()`](https://cn.vuejs.org/api/reactivity-core.html#reactive) 的浅层作用形式 
>
>  只有属性的值会被原样存储和暴露
>
>  ref 的属性**不会**被自动解包 

## isReactive()

>  检查一个对象是否是由 [`reactive()`](https://cn.vuejs.org/api/reactivity-core.html#reactive) 或 [`shallowReactive()`](https://cn.vuejs.org/api/reactivity-advanced.html#shallowreactive) 创建的代理



## ref

##### 访问原生dom节点

```html
<template>
	<view ref="myref"></view>
</template>
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

## ref()

> 接受一个内部值，返回一个响应式的、可更改的 ref 对象，此对象只有一个指向属性.value
>
> 当 ref 赋值或者被赋值 reactive 时，ref会被解包（响应栈地址改变）
>
> 当在某个响应式数组或 `Map` 这样的原生集合类型中时， ref 元素不会解包 

```html
<template>
	<div>{{refText}}</div>  <!--> 此处默认省略了value 实际上refText.value-->
	<button @click="handleClick()">change</button>
</template>
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

## isRef()

>  检查某个值是否为 ref 

```typescript
isRef(foo)
```

## unref()

>  参数是 ref，则返回内部值，否则返回参数本身 
>
>  `val = isRef(val) ? val.value : val` 计算的一个语法糖

```typescript
function useFoo(x: number | Ref<number>) {
  const unwrapped = unref(x)
  // unwrapped 现在保证为 number 类型
}
```

## shallowRef()

> ref 的内部值将会原样存储和暴露，并且不会被深层递归地转为响应式。
>
> 只对 `.value` 的访问是响应式的 

## triggerRef()

>  强制触发依赖于一个[浅层 ref](https://cn.vuejs.org/api/reactivity-advanced.html#shallowref) 的副作用 ,
>
>  通常在对浅引用(shallowRef)的内部值进行深度变更后使用 

```typescript
const shallow = shallowRef({
  greet: 'Hello, world'
})
// 这次变更不应触发副作用，因为这个 ref 是浅层的
shallow.value.greet = 'Hello, universe'
// 打印 "Hello, universe"
triggerRef(shallow)
```

## toRef()

> 基于响应式对象上的一个属性，创建一个对应的 ref。
>
> 创建的 ref 与其源属性保持同步，改变源属性的值将更新 ref 的值，反之亦然。 

```typescript
const state = reactive({
  foo: 1,
  bar: 2
})

const fooRef = toRef(state, 'foo')

// 更改该 ref 会更新源属性
fooRef.value++
console.log(state.foo) // 2

// 更改源属性也会更新该 ref
state.foo++
console.log(fooRef.value) // 3
```

## toRefs()

> 把reactive里的每个属性，转化成ref对象，再通过...展开，变成多个ref对象
>
> 在template中，用ref语法，js中用reactive语法

```html
<template>
	<div>{{myname}}--{{myage}}</div> 
</template>
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

>  将一个响应式对象转换为一个普通对象
>
>  普通对象的每个属性都是指向源对象相应属性的 ref
>
>  每个单独的 ref 都是使用 [`toRef()`](https://cn.vuejs.org/api/reactivity-utilities.html#toref) 创建的 

>  从组合式函数中返回响应式对象时 , 使用它，外部可以解构/展开返回的对象而不会失去响应性： 

```typescript
function useFeatureX() {
  const state = reactive({
    foo: 1,
    bar: 2
  })
  // 在返回时都转为 ref
  return toRefs(state)
}
// 可以解构而不会失去响应性
const { foo, bar } = useFeatureX()
```



## isProxy()

>  查一个对象是否是由 [`reactive()`](https://cn.vuejs.org/api/reactivity-core.html#reactive)、[`readonly()`](https://cn.vuejs.org/api/reactivity-core.html#readonly)、[`shallowReactive()`](https://cn.vuejs.org/api/reactivity-advanced.html#shallowreactive) 或 [`shallowReadonly()`](https://cn.vuejs.org/api/reactivity-advanced.html#shallowreadonly) 创建的代理 



## computed()

 只读 

```typescript
const plusOne = computed(() => count.value + 1)
```

可写

```typescript
const plusOne = computed({
  get: () => count.value + 1,
  set: (val) => {
    count.value = val - 1
  }
})
```



## readonly()

>  返回一个原值的只读代理 

```typescript
const copy = readonly(original)
```

## shallowReadonly()

>  [`readonly()`](https://cn.vuejs.org/api/reactivity-core.html#readonly) 的浅层作用形式 
>
>  只有根层级的属性变为了只读 
>
>  ref 的属性**不会**被自动解包 

```typescript
const state = shallowReadonly({
  foo: 1,
  nested: { bar: 2 }
})
// 更改状态自身的属性会失败
state.foo++
// ...但可以更改下层嵌套对象
isReadonly(state.nested) // false

```

## isReadonly()

>  检查传入的值是否为只读对象 



## watch()

> 监听器

```typescript
//监听一个
const count = ref(0)
watch(count, (count, prevCount) => {},{deep:true})

//监听多个
watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {})
```

|  immediate   |          立即触发回调           |
| :----------: | :-----------------------------: |
|     deep     |      深层级变更时触发回调       |
| flush:‘post’ | 回调中能访问被 Vue 更新后的 DOM |



## props&emit

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



## watch

```js
watch(()=>obj.name,(newValue,oldValue)=>{
   console.log(newValue,oldValue) 
})
```



## 依赖注入功能

### provide()

>  提供一个值，可以被后代组件注入 

```html
<script setup>
import { ref, provide } from 'vue'
import { fooSymbol } from './injectionSymbols'

// 提供静态值
provide('foo', 'bar')

// 提供响应式的值
const count = ref(0)
provide('count', count)

// 提供时将 Symbol 作为 key
provide(fooSymbol, count)
</script>
```

### inject()

>  注入一个由祖先组件或整个应用 提供的值

```html
<script setup>
import { inject } from 'vue'
import { fooSymbol } from './injectionSymbols'

// 注入值的默认方式
const foo = inject('foo')

// 注入响应式的值
const count = inject('count')

// 通过 Symbol 类型的 key 注入
const foo2 = inject(fooSymbol)

// 注入一个值，若为空则使用提供的默认值
const bar = inject('foo', 'default value')

// 注入时为了表明提供的默认值是个函数，需要传入第三个参数
const fn = inject('function', () => {}, false)
</script>
```



### 

# [TypeScript 标注类型](https://cn.vuejs.org/guide/typescript/composition-api.html)

## 组合式api

>  组合式函数约定用驼峰命名法命名，并以“use”作为开头 
>
>  尽管其响应性不依赖 ref，组合式函数仍可接收 ref 参数 
>
>  组合式函数中使用 `ref()` 



##  props 标注类型

> 传递给 `defineProps` 的泛型参数本身**不能**是一个导入的类型 

```html
<script setup lang="ts">
interface Props {
  foo: string
  bar?: number
}
const props = defineProps<Props>()
</script>
```

### Props 解构默认值

>  `withDefaults` 帮助程序为默认值提供类型检查
>
>  确保返回的 props 类型删除了已声明默认值的属性的可选标志 

```html
<script setup lang="ts">
export interface Props {
  msg?: string
  labels?: string[]
}
const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  labels: () => ['one', 'two']
})
```

通过 [响应性语法糖](https://cn.vuejs.org/guide/extras/reactivity-transform.html)开启，这个需要[手动开启](https://cn.vuejs.org/guide/extras/reactivity-transform.html#explicit-opt-in)

```html
<script setup lang="ts">
interface Props {
  name: string
  count?: number
}

// 对 defineProps() 的响应性解构
// 默认值会被编译为等价的运行时选项
const { name, count = 100 } = defineProps<Props>()
</script>

```



## emits 标注类型

>  带[调用签名](https://www.typescriptlang.org/docs/handbook/2/functions.html#call-signatures)的类型字面量 

```html
<script setup lang="ts">
// 运行时
const emit = defineEmits(['change', 'update'])

// 基于类型
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
</script>
```



## ref 标注类型

```html
<script setup lang="ts">

const year: Ref<string | number> = ref('2020')
//上下两个方法等同
const year = ref<string | number>('2020')

year.value = 2020 // 成功！
</script>
```



## reactive 标注类型

>  不推荐使用 `reactive()` 的泛型参数，因为处理了深层次 ref 解包的返回值与泛型参数的类型不同。 

```html
<script setup lang="ts">
import { reactive } from 'vue'
interface Book {
  title: string
  year?: number
}
const book: Book = reactive({ title: 'Vue 3 指引' })
</script>
```



## computed 标注类型

```html
<script setup lang="ts">
  const double = computed<number>(() => {
    // 若返回值不是 number 类型则会报错
  })
</script>
```



## 事件处理函数 标注类型

```html
<script setup lang="ts">
  function handleChange(event: Event) {
   (event.target as HTMLInputElement).value
 }
</script>
```



## provide / inject 标注类型

### provide

>  提供 `InjectionKey` 接口，继承自 `Symbol` 的泛型类型 , 用来在提供者和消费者之间同步注入值的类型 
>
>  key 的类型放在单独的文件中，这样可以被多个组件导入 

```html
<script setup lang="ts">
  import { provide, inject } from 'vue'
  import type { InjectionKey } from 'vue'
  const key = Symbol() as InjectionKey<string>
  provide(key, 'foo') // 若提供的是非字符串值会导致错误   
</script>
```

### inject

```html
<script setup lang="ts">
 // 第二个bar为默认值，没有的话类型则是 string | undefined 
const foo = inject<string>('foo', 'bar')

const foo = inject('foo') as string //强制转换类型
</script>
```



## 模板引用 标注类型

```html
<template>
  <input ref="el" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const el = ref<HTMLInputElement | null>(null)

onMounted(() => {
  el.value?.focus()
})
</script>
```



## [组件模板引用 标注类型](https://cn.vuejs.org/guide/typescript/composition-api.html#typing-component-template-refs)

> 如果想在 TypeScript 文件而不是在 Vue SFC 中使用这种技巧，需要开启 Volar 的 [Takeover 模式](https://cn.vuejs.org/guide/typescript/overview.html#volar-takeover-mode)。 

```html
<!-- MyModal.vue -->
<script setup lang="ts">
import { ref } from 'vue'

const isContentShown = ref(false)
const open = () => (isContentShown.value = true)

defineExpose({ //定义暴露
  open
})
</script>
```

>  为了获取 `MyModal` 的类型，需要通过 `typeof` 得到类型，再使用 TypeScript 内置的 `InstanceType` 工具类型获取实例类型 

```html
<!-- App.vue -->
<script setup lang="ts">
import MyModal from './MyModal.vue'

const modal = ref<InstanceType<typeof MyModal> | null>(null)

const openModal = () => {
  modal.value?.open()
}
</script>
```


# pinia

# 定义store

> 可以对defineStore的返回值进行任意命名
>
> 最好以 `use` 开头且以 `Store` 结尾。比如：useUserStore
>
> defineStore 的第二个参数可接受两类值：Setup 函数 和 Option 对象

```js
import { defineStore } from 'pinia'

// 第一个参数是你的应用中 Store 的唯一 ID。
export const useStore = defineStore('main', {})
```



# Option 对象  类型

```js
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
```



## [State](https://pinia.vuejs.org/zh/core-concepts/state.html)

>  定义为一个返回初始状态的函数， 可以同时支持服务端和客户端。 

```js
state: () => {
    return { // 所有这些属性都将自动推断出它们的类型
      count: 0,
      name: 'Eduardo',
    }
  },
```

#### TypeScript

```typescript
interface State {
  name: string
  age: number
}

const useStore = defineStore('storeId', {
  state: (): State => {
    return {
      name: '123',
      age: 123,
    }
  },
})
```

### 访问 

>  通过 `store` 实例访问 state，直接对其进行读写 

```js
const store = useStore()
store.count++
```

### 重置   --  $reset() 

>  调用 store 的 `$reset()` 方法将 state 重置为初始值 

```js
const store = useStore()
store.$reset()
```

### 变更/替换  --  $patch 

>  补丁对象在同一时间更改多个属性 

```js
const store = useStore()
store.$patch({
  count: store.count + 1,
  age: 120,
})
```

> 函数方法来修改元素集合

```js
store.$patch((state) => {
  state.items.push({ name: 'shoes', quantity: 1 }) 
  state.hasChanged = true
})
```

## [订阅  --   $subscribe()](https://pinia.vuejs.org/zh/core-concepts/state.html#subscribing-to-the-state)

>  更改内容后，触发一次

```js
const cartStore = useSomeStore() 
cartStore.$subscribe((mutation, state) => {
  mutation.type 
  // 和 cartStore.$id 一样
  mutation.storeId // 'cart'
  // 只有 mutation.type === 'patch object'的情况下才可用
  mutation.payload // 传递给 cartStore.$patch() 的补丁对象。
  // 每当状态发生变化时，将整个 state 持久化到本地存储。
  localStorage.setItem('cart', JSON.stringify(state))
})
```

> 当组件被卸载时，将被自动删除
>
> 组件卸载后依旧保留它们，将 `{ detached: true }` 作为第二个参数，将 *state subscription* 从当前组件中*分离* 

```js
const someStore = useSomeStore()
// 在组件被卸载后，该订阅依旧会被保留。
someStore.$subscribe(callback, { detached: true })
```

> 可以直接在pinia实例上侦听整个state

```js
watch(
  pinia.state,
  (state) => {
    // 每当状态发生变化时，将整个 state 持久化到本地存储。
    localStorage.setItem('piniaState', JSON.stringify(state))
  },
  { deep: true }
)
```



## Getter

> typescript 必须设置函数返回类型
>
> 可以 通过 `this` 访问到**整个 store 实例** 

```typescript
getters: {
    doubleCount(state) {
      return state.count * 2
    },
    doublePlusOne(): number {
      return this.doubleCount + 1
    },
},
```

### 访问 

```js
const store = useStore()
store.doubleCount
```

#### 访问其他store中的getter

```js
import { useOtherStore } from './other-store'
  getters: {
    otherGetter(state) {
      const otherStore = useOtherStore()
    },
  },
```



## Action

>  通过 this 访问整个 store 实例
>
> action可以是异步的

```js
actions: {
    async increment() {
      const preferences = await fetchPreferences()
      this.count++
    },
},
```

### 访问

```js
const main = useMainStore()
main.randomizeCounter()
```

### 访问其他 store 的 action

```js
import { useAuthStore } from './auth-store'
  actions: {
    fetch() {
      const auth = useAuthStore()
    }
  },
```

## [订阅  --  $onAction()](https://pinia.vuejs.org/zh/core-concepts/actions.html#without-setup)

>  监听 action 和它们的结果 
>
>  after  表示在 promise 解决后，在 action 解决后执行回调函数 
>
>  nError 在 action 抛出错误或 reject 时执行回调函数 

```js
const unsubscribe = someStore.$onAction(
  ({
    store, // store 实例，类似 `someStore`
    args, // 传递给 action 的参数数组
    after, // 在 action 返回或解决后的钩子
    onError, // action 抛出或拒绝的钩子
  }) => {
    // 这将在 action 成功并完全运行后触发。
    // 它等待着任何返回的 promise
    after((result) => {})
    // 如果 action 抛出或返回一个拒绝的 promise，这将触发
    onError((error) => {})
  }
)
// 手动删除监听器
unsubscribe()
```

> 当组件被卸载时，将被自动删除
>
> 组件卸载后依旧保留它们，将 `{ detached: true }` 作为第二个参数，将 *state subscription* 从当前组件中*分离* 

```js
const someStore = useSomeStore()
// 在组件被卸载后，该订阅依旧会被保留。
someStore.$onAction(callback, true)
```







# Setup 函数 类型

```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const plusOne = computed(() => count.value + 1)
  function increment() {
    count.value++
  }

  return { count, increment }
})
```



## State

```js
const count = ref(0)
```

### 访问

```js
 computed: {
    // 与从 store.count 中读取的数据相同
    ...mapState(useCounterStore, ['count'])
    // 与上述相同，但将其注册为 this.myOwnName
    ...mapState(useCounterStore, {
      myOwnName: 'count',
      // 你也可以写一个函数来获得对 store 的访问权
      double: store => store.count * 2,
      // 它可以访问 `this`，但它没有标注类型
      magicValue(store) {
        return store.someGetter + this.count + this.double
      },
    }),
  },
```

### 修改 --  mapWritableState() 

```js
computed: {
    // 可以访问组件中的 this.count，并允许设置它。
    ...mapWritableState(useCounterStore, ['count'])
    // 与上述相同，但将其注册为 this.myOwnName
    ...mapWritableState(useCounterStore, {
      myOwnName: 'count',
    }),
  },
  this.count++ //修改state.count属性
```





## Getter

```js
const plusOne = computed(() => count.value + 1)
```

### 访问

```js
 computed: {
    ...mapGetter(useCounterStore, ['count'])
  },
```



## Action

```js
 function increment() {
    count.value++
  }
```

### 访问

```js
const store = useStore()
store.randomizeCounter()

methods: {
  ...mapActions(useCounterStore, ['increment'])
  // 与上述相同，但将其注册为this.myOwnName()
  ...mapActions(useCounterStore, { myOwnName: 'doubleCount' }),
},
```





# [响应式解构(storeToRefs)](https://pinia.vuejs.org/zh/core-concepts/#using-the-store)

> 使用 storeToRefs  将为每一个响应式属性创建引用 
>
> 同时会跳过任何 action 或非响应式(非 ref/响应式)属性

```js
const { name, doubleCount } = storeToRefs(store)
```





# 
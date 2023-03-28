# [alova](https://alova.js.org/zh-CN/category/overview)

```js
npm install alova --save
```



# 概括

>  GET、POST、PUT、DELETE、HEAD、OPTIONS、PATCH   请求方法 

## [请求实例](https://alova.js.org/zh-CN/category/getting-started)

#### 创建请求

```js
import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
import VueHook from 'alova/vue';
const alovaInstance = createAlova({
  // 域名
  baseURL: 'https://api.alovajs.org',
  //Alova管理的状态，loading、data、error等
  statesHook: VueHook,
  // 请求适配器
  requestAdapter: GlobalFetch()
  //全局请求拦截器
  beforeRequest(method) {
 	 method.config.headers.token = 'token';
  }
  //全局响应拦截器
  responsed: {
    // 请求成功的拦截器
    onSuccess: async (response, method) => {
      return json.data;
    },
    // 请求失败的拦截器
    onError: (err, method) => {}
  }
});
```

#### 使用请求

**get -- 请求**

```js
const todoListGetter = alovaInstance.Get('/todo/list', {
  headers: {'Content-Type': 'application/json;charset=UTF-8'},
  // params参数将会以?的形式拼接在url后面
  params: { userId: 1},
  //设置超时时间
  timeout: 10000
});
```

**post -- 请求**

```js
const createTodoPoster = alovaInstance.Post('/todo/create',
  {title: 'test todo',},
  {
    headers: {'Content-Type': 'application/json;charset=UTF-8'},
    params: {}
  }
);
```





## [缓存模式](https://alova.js.org/zh-CN/get-started/response-cache)

>  缓存模式可以更好地多次利用服务端数据，而不需要每次请求时都发送请求获取数据 

> 响应数据缓存的 key 由 -- **请求方法**(method)、**请求地址**(url)、**请求头参数**(headers)、**url 参数**(params)、**请求体参数**(requestBody)**组合**作为**唯一标识**，**任意一个信息**或**位置不同**都将被**当做不同的 key**。 

### 内存模式 -- memory

>  将缓存放在内存中，这意味着刷新页面缓存即失效 
>
>  内存模式为默认模式 
>
>  GET 请求将默认设置 300000ms(5 分钟)的内存缓存时间 

```js
alovaInstance.GET('/todo/list', {
  localCache: {
    // 设置缓存模式为内存模式
    mode: 'memory',
    // 单位为毫秒
    // 当设置为`Infinity`，表示数据永不过期，设置为0或负数时表示不缓存
    expire: 60 * 10 * 1000
  },
  //简写
  localCache: 60 * 10 * 1000
});

```



### 缓存占位模式 --  placeholder 

>  如果有旧数据则使用它替代 Loading 展示，同时它将发送请求获取最新数据并更新缓存 

```js
  localCache: {
    // 设置缓存模式为持久化占位模式
    mode: 'placeholder',
    // 缓存时间
    expire: 60 * 10 * 1000
  }
```



### 恢复模式 --  restore 

>  服务端缓存数据将持久化，过期时间未到，数据不会刷新，即使刷新页面缓存也不会失效 
>
>  **FormData**、**Blob**、**ArrayBuffer**、**URLSearchParams**、**ReadableStream** 等特殊数据不会      进行缓存 

```js
  localCache: {
    // 设置缓存模式为持久化模式
    mode: 'restore',
    // 缓存时间
    expire: 60 * 10 * 1000
  }
```

#### 数据需要变动

> 每一份持久化数据都包含一个`tag`标识，当`tag`改变后原有的持久化数据将会失效，并重新获新的数据，并用新的`tag`进行标识。

```js
localCache: {
    mode: 'restore',
    expire: 60 * 10 * 1000,
    // 新增或修改tag参数，已缓存的数据将失效
    // 建议使用版本号的形式管理
    tag: 'v1'
  }
```



### 全局设置缓存模式

> 创建时进行配置
>
> 默认使用这份缓存设置，同时也可以在`Method`实例中覆盖它 
>
> 当全局设置了缓存模式后，原有的 5 分钟 GET 缓存模式将被覆盖 

```js
const alovaInstance = createAlova({
  localCache: {
    // 统一设置POST的缓存模式
    POST: {
      mode: 'placeholder',
      expire: 60 * 10 * 1000
    },
    // 统一设置HEAD请求的缓存模式
    HEAD: 60 * 10 * 1000
  }
});
```



### 过期时间类型

#### 相对时间

> 即在保存缓存数据时开始，过期的时长，以 **毫秒** 为单位 

```js
localCache: 60 * 10 * 1000;

localCache: {
    expire: 60 * 10 * 1000,
}
```

#### 绝对时间

> 以一个具体时间点为过期时间，缓存将在设定的时间点过期 

```js
localCache: new Date('2030-01-01');

localCache: {
  expire: new Date('2030-01-01');
}
```



# [发送请求时机](https://alova.js.org/zh-CN/category/request-at-the-right-time)

## 发送请求 --  useRequest 

### 初始数据请求

|     词     |                            意                            |
| :--------: | :------------------------------------------------------: |
|  loading   | 当加载时它的值为true，结束后自动更新为false，Ref类型的值 |
|    data    |                  响应数据，同样是Ref值                   |
|   error    |   请求错误对象，Ref值，请求错误时有值，否则为undefined   |
| nitialData |                 请求响应前，data的初始值                 |

```js
const {
    loading,
	data,
    error
  } = useRequest(todoListGetter, {
    initialData: []
  });
```



### 请求回调

|     词     |                  意                  |
| :--------: | :----------------------------------: |
| onSuccess  |             成功回调绑定             |
|  onError   |             失败回调绑定             |
| onComplete | 完成回调绑定，回调在成功或失败都会调 |

```js
const {
  onSuccess,
  onError,
  onComplete
} = useRequest(todoListGetter);
onSuccess(event => {});
onError(event => {});
onComplete(event => {});
```



### 手动发送请求

|    词     |                  意                  |
| :-------: | :----------------------------------: |
| immediate |   当immediate为false时，默认不发出   |
|   send    | 手动发送器请求的函数，调用后发送请求 |

```js
const {
  send: addTodo
} = useRequest(newTodo => alovaInstance.Post('/todo', newTodo), {
  immediate: false
});
const handleAddTodo = () => {
  const newTodo = {title: '新的todo项',}
  // send函数返回一个Promise对象，可接收响应数据
  addTodo(newTodo)
    .then(result => {})
    .catch(error => {});
};
```



### 强制发送请求

|  词   |                              意                              |
| :---: | :----------------------------------------------------------: |
| force | force 默认为 false，设置为 true 时将每次穿透缓存，并发送请求 |

```js
const { send } = useRequest(alovaInstance.Get('/todo'), {
  force: id => {return !!id;}
});
send(1);
```



## 状态变化请求 --  useWatcher 

|    词     |                    意                    |
| :-------: | :--------------------------------------: |
| immediate |               立即触发一次               |
| debounce  |                 防抖时间                 |
|   send    |               手动触发请求               |
|   force   | 设置为 true 时将每次穿透缓存，并发送请求 |
|   abort   |               手动中断请求               |

```js
  const keyword = ref('');
  const {send, abort = useWatcher(
    keyword => alovaInstance.Get('/todo', { params:{ keyword }}),
    [keyword], // 被监听的状态数组，这些状态变化将会触发一次请求
    {
      debounce: 500, // 设置500ms防抖
      immediate: true, //立即触发
      force: true, //每次穿透缓存
     } 
  );
```

#### [单个监听状态设置防抖时间](https://alova.js.org/zh-CN/request-timing/use-watcher#%E4%B8%BA%E5%8D%95%E4%B8%AA%E7%9B%91%E5%90%AC%E7%8A%B6%E6%80%81%E8%AE%BE%E7%BD%AE%E9%98%B2%E6%8A%96%E6%97%B6%E9%97%B4)

```js
const { loading, data, error } = useWatcher(
    () => filterTodoList(keyword, date),
    [keyword, date],
    // 以监听状态的数组顺序分别设置防抖时间，0或不传表示不防抖
    { debounce: [500, 0] }
);
```




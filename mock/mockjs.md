# mockjs

# 使用mockjs

项目安装mock

```
npm install mockjs
```

项目中新建mock文件

```js
//引入mock模块
import Mock from 'mockjs'
```

将mock文件在main.js中导入

```js
import Vue from 'vue'
import App FROM './App.vue'
import './mock/index.js'

Vue.config.productionTip = false

new Vue({
	render:h => h(App),
}).$mount('#app')
```

# mock语法

## 生成字符串

- 生成指定次数字符串

```js
import Mock from 'mockjs'
Mock.mock({
	"string|4":"哈哈"
})
```

- 生成指定范围长度字符串

```js
Mock.mock({
	"string|1-8":"哈哈"
})
```

## 生成文本

- 生成一个随机字符串

```js
Mock.mock({
	"string":"@cword"
}) 
```

- 生成指定长度和范围

```js
Mock.mock({
    string:"@cword(1)",
    str :"@cword(10,15)"
})
```

## 生成标题和句子

- 生成标题和句子

```js
Mock.mock({
    title:"@ctitle(8)",
    sentence:"@csentence"
})
```

- 生成指定长度的标题和句子

```js
Mock.mock({
    title:"@ctitle(8)",
    sentence:"@csentence(50)"
})

```

- 生成指定范围的

```js
Mock.mock({
    title:"@ctitle(5,8)",
    sentence:"@csentence(50,100)"
})

```

## 生成段落

- 随机生成段落

```js
Mock.mock({
  content:"@cparagraph()"
})

```

## 生成数字

- 生成指定数字

```js
Mock.mock({
	"number|80":1
})

```

- 生成范围数字

```js
Mock.mock({
	"number|1-99":1
})

```

## 生成自增id

- 随机生成标识

```js
Mock.mock({
	id:"@increment"
})

```

## 生成姓名-地址-身份证

- 随机生成姓名-地址-身份证

```js
Mock.mock({
	name:"@cname()",
	idCard:"@id()",
	address:"@city(true)"
})

```

## 随机生成图片

- 生成图片：@image('200x100', '#50B347', '#FFF', 'Mock.js')

```js
 Mock.mock({
	name:"@image('200x100', '#50B347', '#FFF', 'Mock.js')"
})
```

- 参数1：图片大小

- 参数2：图片背景色

- 参数3：图片前景色

- 参数4：图片格式
- 参数5：图片文字

## 生成时间

- @Date
- 生成指定格式时间：@date(yyyy-MM-dd hh:mm:ss)

指定数组返回的参数

- 指定长度：‘date|5’
- 指定范围:'data|5-10'

## 数组组合

```js
Mock.mock({
'list|50-99':[
        {
            name:'@cname',
            address:'@city(true)',
            id:'@increment()'
        }	
    ]
})

```

## mock拦截请求

```js
Mock.mock('api/post/news','post/get',(data:any)=>{
    let { id,status }  = data
    return{
        status:200,
        message:"获取数据成功"
    }
})
```



# mock 多个拦截 封装

> 在 app.vue 引用 import "./mock/mock.ts" 文件 (main.ts报错)
>
> ts 中引用 mockjs 需要在 shims-vue.d.ts 中添加声明(declare module 'mockjs';)

## mock.js

```typescript
import Mock from 'mockjs';
import * as mockList from './index';

interface mockInfoInf {
	path: string;
	code?: number;
	data: any;
	msg?: string;
}

const defaultMockInfo: mockInfoInf = {
	path: 'mock',
	code: 200,
	data: '',
	msg: '成功',
};

function init() {
	let mockmockInfos: Array<mockInfoInf> = [];
	for (let key in mockList) {
		const mockInfo = mockList[key];
		if (mockInfo.show) {
			mockmockInfos.push(mockInfo);
		}
	}
	mockmockInfos.forEach((mockInfo: any) => {
		initMock(mockInfo);
	});
}

function initMock(mockInfo: mockInfoInf) {
	mockInfo = { ...defaultMockInfo, ...mockInfo };
	const path = new RegExp(mockInfo.path.replace('/', '\\/'));
	const response = {
		code: mockInfo.code,
		data: mockInfo.data,
		msg: mockInfo.msg,
	};
	Mock.mock(path, response);
}

init();

```

## index.js

```typescript
import Mock from 'mockjs';

export class banner {
	static show: boolean = true; //是否进行拦截
	static path: string = '/admin/musicTypeCfg/store';
	static data: any = Mock.mock({
		'list|50-99': [
			{
				name: '@cname',
				address: '@city(true)',
				id: '@increment()',
			},
		],
	});
}
```


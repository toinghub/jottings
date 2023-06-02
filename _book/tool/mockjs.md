# 使用mockjs

项目安装mock

```
npm install mockjs
 npm install @types/mockjs
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
import "./mock/mock.ts";

Vue.config.productionTip = false

new Vue({
	render:h => h(App),
}).$mount('#app')
```

# mock语法

|     方法      |                      参数                       | 注释   |
| :-----------: | :---------------------------------------------: | :----- |
|   @boolean    |              min?, max?, current?               | 布尔值 |
|   @natural    |                   min?, max?                    | 自然数 |
|   @integer    |                   min?, max?                    | 整数   |
|    @float     |            min?, max?, dmin?, dmax?             | 浮动数 |
|    @cword     |                pool?, min?, max?                | 文本   |
|    @ctitle    |                   min?, max?                    | 标题   |
|  @csentence   |                      null                       | 句子   |
|  @cparagraph  |                      null                       | 段落   |
|  @increment   |                      null                       | 自增id |
|    @cname     |                      null                       | 姓名   |
|      @id      |                      null                       | 身份证 |
|  @city(true)  |                      null                       | 地址   |
|    @image     | size?, background?, foreground?, format?, text? | 图片   |
|     @date     |               yyyy-MM-dd hh:mm:ss               | 时间   |
|     @name     |                      true                       | 名字   |
|    @cname     |                      null                       | 中文名 |
|     @url      |                      null                       | 路径   |
|    @email     |                      null                       | 邮箱   |
|      @ip      |                      null                       | ip     |
| @county(true) |                      null                       | 地址   |
|     @guid     |                      null                       | guid   |





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

- 随机生成姓名-身份证-地址

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
	code?: string;
	data: any;
	msg?: string;
	total?: number;
	ok?: boolean;
}

const defaultMockInfo: mockInfoInf = {
	path: 'mock',
	code: '200',
	data: '',
	msg: '成功',
};

function init() {
	let mockmockInfos: Array<mockInfoInf> = [];
	for (let key in mockList) {
		const mockInfo = (<any>mockList)[key];
		if (mockInfo.show) {
			mockmockInfos.push(mockInfo);
		}
	}
	mockmockInfos.forEach((mockInfo: mockInfoInf) => {
		initMock(mockInfo);
	});
}

function initMock(mockInfo: mockInfoInf) {
	mockInfo = { ...defaultMockInfo, ...mockInfo };
	const path = new RegExp(mockInfo.path.replace('/', '\\/'));
	const data = mockInfo.data.data ? mockInfo.data.data : mockInfo.data;
	const response = {
		code: mockInfo.code,
		data,
		msg: mockInfo.msg,
	};
	Mock.mock(path, (data: any) => {
		handleRequest(data);
		return response;
	});
}
function handleRequest(data: any) {
	let path: string = '';
	let param: any = {};
	if (data.type === 'GET') {
		if (data.url.includes('?')) {
			const urlArray = data.url.split('?');
			path = urlArray[0];
			if (urlArray.length === 2 && urlArray[1].includes('&')) {
				const paramArray = urlArray[1].split('&');
				paramArray.forEach((item: any) => {
					const itemArray = item.split('=');
					const key = itemArray[0];
					const value = itemArray[1];
					param[key] = value;
				});
			}
		} else {
			path = data.url;
		}
	}
	if (data.type === 'POST') {
		path = data.url;
		param = JSON.parse(data.body);
	}
	console.log({ path });
	console.table(param);
}

init();


```

## index.js

```typescript
import Mock from 'mockjs';

/* 
@increment 自增id
@cname 随机姓名
@id 随机身份证
@city(true) 随机地址
@boolean 随机布尔值
@natural 随机自然数
@cword 随机字符串
@ctitle 随机标题
@csentence 随机句子
@cparagraph 随机段落
@image('200x100', '#50B347', '#FFF', 'Mock.js')  随机图片
@date(yyyy-MM-dd hh:mm:ss) 随机时间
 */
//banner
export class banner {
	static show: boolean = true;
	static path: string = '/TicketBuyList';
	static data: any = Mock.mock({
		pageSize: 10,
		total: 100,
		totalPage: 10,
		'list|50-99': [
			{
				id: '@increment()',
				name: '@cname',
				tickeName: '黑龙江@city门票',
				buyNum: '@natural(1,10)',
			},
		],
	});
}
export class banner21 {
	static show: boolean = true;
	static path: string = '/admin/languageCfg/store';
	static msg: string = '成功';
	static data: any = Mock.mock({
		'data|50-99': [
			{
				name: '@cname',
				address: '@city(true)',
				id: '@increment()',
			},
		],
	});
}

```


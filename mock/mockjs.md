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

#### 实现新闻管理案例

##### 获取数据

接口地址：：/api/get/news

接口参数：

```
pageindex：页码
pagesize:每页的条数
```

请求类型：get

返回的数据：

```json
{
    status:200,
        message:"获取新闻列表成功",
        list:[
        {
            "id":1,
            "title":"解忧杂货店",
            "content":"《解忧杂货店》是日本作家东野圭吾写作的长篇小说。2011年《小说野性时代》连载，于2012年3月由角川书店发行单行本",
            "img_url":"http://t15.baidu.com/it/u=2090705107,20534764&fm=224&app=112&f=JPEG?w=500&h=500&s=61D0718656561FFFE504A51703000067",
            "add_time":"1984-04-03 11:43:37"}
        ],
        total:50
    }
}

```

##### 添加新闻

接口地址：：/api/add/news

接口参数：

```
title：'标题'
content：内容

```

请求类型：post

返回的数据：

```json
{
    status:200,
        message:"获取新闻列表成功",
        list:[
        {
            "id":1,
            "title":"解忧杂货店",
            "content":"《解忧杂货店》是日本作家东野圭吾写作的长篇小说。2011年《小说野性时代》连载，于2012年3月由角川书店发行单行本",
            "img_url":"http://t15.baidu.com/it/u=2090705107,20534764&fm=224&app=112&f=JPEG?w=500&h=500&s=61D0718656561FFFE504A51703000067",
            "add_time":"1984-04-03 11:43:37"}
        ],
        total:50
    }
}

```



##### 删除新闻

接口地址：：/api/delete/news

接口参数：

```
id；新闻id

```

请求类型：post

返回的数据：

```js
{
    status:200,
        message:"获取新闻列表成功",
        list:[
        {
            "id":1,
            "title":"解忧杂货店",
            "content":"《解忧杂货店》是日本作家东野圭吾写作的长篇小说。2011年《小说野性时代》连载，于2012年3月由角川书店发行单行本",
            "img_url":"http://t15.baidu.com/it/u=2090705107,20534764&fm=224&app=112&f=JPEG?w=500&h=500&s=61D0718656561FFFE504A51703000067",
            "add_time":"1984-04-03 11:43:37"}
        ],
        total:50
    }
}

```


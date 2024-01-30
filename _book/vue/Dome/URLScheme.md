# URLScheme

## 注意：

* 不支持在微信浏览器使用

## 结构

` [scheme]://[host][:port]/[/path]?[query]`

- scheme:协议名称，由开发人员自定义
- host:域名
- port:端口
- path:页面路径
- query:请求参数

## 设备判断

```js
// 游览器标识
const ua = navigator.userAgent.toLowerCase();

// 是否微信内
const isWeixin = ua.indexOf("micromessenger") !== -1;

// 是否android终端
const isAndroid = /(Android)/i.test(ua);

// 是否ios终端
const isIOS = /(iPhone|iPad|iPod|iOS|Mac)/i.test(ua);
```

## vue-h5



## uniapp-app
# uniApp

## vscode开发

### 插件

>  uni-create-view   右键目录文件夹快速创建页面与组建，自动创建路由
>
>  uni-helper  代码提示安装包
>
>  uniapp小程序扩展  组件内容悬停展示

### ts类型校验

ctrl+i 代码提示

```css
//安装小程序类型声明文件
npm install -D @types/wechat-miniprogram
//uniapp类型声明文件
npm install -D @uni-helper/uni-app-types
//uni-ui 类型声明文件 -- 非官方
npm install -D @uni-helper/uni-ui-types
```

```json
"compilerOptions": {
	"types": [
		"@dcloudio/types",
		"@types/wechat-miniprogram",
		"@uni-helper/uni-app-types",
        "@uni-helper/uni-ui-types"
	]
},
"vueCompilerOptions": {
	"nativeTags": ["block", "component", "template", "slot"]
},
```

### 解决json文件注释问题

> 一般情况下,仅允许下面两个文件添加注释

![](F:\桌面\随笔\images\解决json注释报错.png)

### pinia持久化

```typescript
// 创建 pinia 实例
const pinia = createPinia()
// 使用持久化存储插件
pinia.use(persist)

// TODO: 持久化
  {
    persist: {
      storage: {
        getItem(key) {
          return uni.getStorageSync(key)
        },
        setItem(key: any, value) {
          uni.setStorageSync(key, value)
        },
      }
    },
  },
```

## uniapp 类型

```css
uniHelper. 相关类型
```

## 注册组件实例类型

```css
import XtxGuess from '@/components/XtxGuess.vue'

// 组件实例类型
export type XtxGuessInstance = InstanceType<typeof XtxGuess>
```


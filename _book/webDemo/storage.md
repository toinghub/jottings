# storage

### [文章地址](https://juejin.cn/post/7104301566857445412)

```js
const config = {
    type: "loaclStorage",// 本地存储类型 localStorage/sessionStorage
    prefix: 'CBD_1.0.0',// 名称前缀 建议：项目名 + 项目版本
    expire: 60 * 60 * 24 * 30,//过期时间 单位：秒
    isEncrypt: true,  // 是否加密
}

interface indexObj {
    [key: string]: any
}


// 名称前自动添加前缀
function autoAddPrefix(key: string) {
    const prefix = config.prefix ? config.prefix + '_' : '';
    return prefix + key;
}

// 移除已添加的前缀
function autoRemovePrefix(key: string) {
    const len: number = config.prefix ? config.prefix.length + 1 : 0;
    return key.substr(len);
}


// 设置storage
// { key:键值,value:数据,expire:过期时间,noRenewal:是否不续期 }
export function setStorage(key: string, value: any, expire?: number, noRenewal?: boolean) {
    if (!value) value = null
    expire = (expire ? expire : config.expire) * 1000
    let data: (object | string) = {
        value: value,//存储值
        time: Date.now(),//存储时间戳
        expire: expire, //过期时间
        noRenewal,
    }
    data = JSON.stringify(data);
    key = autoAddPrefix(key);
    // if (config.isEncrypt) data = encrypt(data) //加密
    (<indexObj>window)[config.type].setItem(key, data)
}

// 获取storage
// { key:键值 }
export function getStorage(key: string) {
    key = autoAddPrefix(key)
    let data = (<indexObj>window)[config.type].getItem(key)
    if (!data || JSON.stringify(data) === "null") return null
    // if (config.isEncrypt) data = decrypt(data) //解密
    const nowTime = Date.now()
    if (data.expire && data.expire < nowTime - data.time) { //判断时间是否过期
        removeStorage(key)
        return null
    }
    let value = isJson(data.value) ? JSON.parse(data.value) : data.value
    if (data.noRenewal) { //是否续期
        key = autoRemovePrefix(key)
        setStorage(key, data.value, data.expire)
    }
    return value

}


// 删除 removeStorage
// { key:键值 }
export function removeStorage(key: string) {
    (<indexObj>window)[config.type].removeItem(autoAddPrefix(key));
}

// 清空 clearStorage
export const clearStorage = () => {
    (<indexObj>window)[config.type].clear();
}


// 判断是否可用 JSON.parse
export function isJson(value: any) {
    if (Object.prototype.toString.call(value) === '[object String]') {
        try {
            const obj = JSON.parse(value);
            const objType = Object.prototype.toString.call(obj);
            return objType === '[object Object]' || objType === '[object Array]';
        } catch (e) {
            return false;
        }
    }
    return false;
}

// 派发storage的数据变化
export function dispatchEventStroage() {
    const signSetItem = localStorage.setItem
    localStorage.setItem = function (key, val) {
        signSetItem.apply(this, <any>arguments) //更改setItem的this指向，arguments传入的参数数组（name,value）
        let setEvent: any = new Event('setItemEvent') //构造函数
        setEvent.key = key
        setEvent.value = val
        window.dispatchEvent(setEvent) //发送事件到监听器上
    }
}



// 监听storage的数据变化
// window.addEventListener("setItemEvent", function (e: any) {
//     const newdata = JSON.parse(e.value);
// });
```

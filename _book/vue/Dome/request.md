# axios

# vue2+ts

```typescript
import axios, {
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

axios.defaults.withCredentials = true;
declare type Methods =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH';

/**
 * transformRequest 函数数组
 */
interface Config {
  data?: any;
  params?: any;
  url?: string;
  headers?: any;
  responseType?: string;
  transformRequest?: Array<any>;
}

export default class Request {
  private instance: AxiosInstance | null = null;

  constructor() {
    if (this.instance === null) {
        this.instance = axios.create({
          baseURL: process.env.VUE_APP_URL,
          timeout: 50000, // request timeout
        });
      this.initInterceptors();
    }
  }

  /**
   * 初始化请求响应的拦截器
   */
  private initInterceptors(): void {
    this.instance!.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        return config;
      },
      error => {
        Promise.reject(error);
      }
    );

    this.instance!.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      error => {
        return error;
      }
    );
  }

  createAPI(url: string, method: Methods, data: any = {}): AxiosPromise {
    const config: Config = {};
    if (method === 'get' || method === 'GET') {
      config.params = data;
    } else {
      config.data = data;
    }
    return this.instance!(Object.assign(config as any, { method, url }));
  }

  createFormAPI(
    url: string,
    method: Methods,
    data: any = {},
    responseType?: string
  ) {
    if (!responseType) {
      responseType = 'json';
    }
    const config: Config = {
      data: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      responseType,
      transformRequest: [],
    };
    config.transformRequest = [
      function (data: { [x: string]: string | number | boolean }) {
        let ret = '';
        for (const key in data) {
          ret += `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}&`;
        }
        return ret;
      },
    ];
    return this.instance!(Object.assign(config as any, { method, url }));
  }
}

```



# vue3+ts

```typescript

import axios, {
	AxiosInstance,
	AxiosError,
	AxiosRequestConfig,
	AxiosResponse,
	AxiosPromise,
} from "axios";
import qs from "qs";
import router from "@/routers";
import { GlobalStore } from "@/stores";
import { ElMessage } from "element-plus";
import { checkStatus } from "@utils/index";
import { ResultEnum } from "./enum";

const config = {
	// 默认地址请求地址，可在 .env.*** 文件中修改
	baseURL: import.meta.env.VITE_API_URL as string,
	// 设置超时时间（10s）
	timeout: ResultEnum.TIMEOUT as number,
	// 跨域时候允许携带凭证
	withCredentials: true,
};

class RequestHttp {
	service: AxiosInstance;

	public constructor(config: AxiosRequestConfig) {
		// 实例化axios
		this.service = axios.create(config);

		/**
		 * @description 请求拦截器
		 * 客户端发送请求 -> [请求拦截器] -> 服务器
		 * token校验(JWT) : 接受服务器返回的token,存储到vuex/pinia/本地储存当中
		 */
		this.service.interceptors.request.use(
			(config: AxiosRequestConfig): any => {
				const globalStore = GlobalStore();
				const token = globalStore.token;
				const sessionId = globalStore.sessionId;
				return {
					...config,
					headers: { ...config.headers, token, sessionId },
				};
			},
			(error: AxiosError) => {
				return Promise.reject(error);
			}
		);

		/**
		 * @description 响应拦截器
		 *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
		 */
		this.service.interceptors.response.use(
			(response: AxiosResponse) => {
				const { data } = response;
				const globalStore = GlobalStore();
				// * 登陆失效（code == 401）
				if (data.code == ResultEnum.OVERDUE) {
					ElMessage.error(data.msg);
					globalStore.setToken("");
					router.replace("/login");
					return Promise.reject(data);
				}
				// * 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
				if (data.code && data.code !== ResultEnum.SUCCESS) {
					ElMessage.error(data.msg);
					return Promise.reject(data);
				}
				// * 成功请求（在页面上除非特殊情况，否则不用在页面处理失败逻辑）
				return data;
			},
			async (error: AxiosError) => {
				const { response } = error;
				// 请求超时 && 网络错误单独判断，没有 response
				if (error.message.indexOf("timeout") !== -1)
					ElMessage.error("请求超时！请您稍后重试");
				if (error.message.indexOf("Network Error") !== -1)
					ElMessage.error("网络错误！请您稍后重试");
				// 根据响应的错误状态码，做不同的处理
				if (response) checkStatus(response.status);
				// 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
				if (!window.navigator.onLine) router.replace("/500");
				return Promise.reject(error);
			}
		);
	}

	// * 常用请求方法封装
	get<T>(url: string, params?: object): AxiosPromise {
		return this.service.get(url, { params });
	}

	post<T>(url: string, params?: object): AxiosPromise {
		return this.service.post(url, params);
	}

	formPost<T>(url: string, params?: object): AxiosPromise {
		return this.service.post(url, qs.stringify(params));
	}
}

export default new RequestHttp(config);


```

# uni-app

```css
/*
 * @Author: xiangzhenxing
 * @Date: 2024-01-05 16:00:05
 * @LastEditors: xiangzhenxing
 * @LastEditTime: 2024-04-26 16:55:42
 * @Description:请求包装
 */
import { ResultEnum } from './enum'
import { GlobalStore } from '@/stores/index'
import type { BaseResponse, OptionsInt } from '@interfaces/request'
import router from '@utils/router'
const globalStore = GlobalStore()

const config = {
  // 设置超时时间（10s）
  timeout: ResultEnum.TIMEOUT as number,
  // 跨域时候允许携带凭证
  withCredentials: true,
}

const requestInterceptor = {
  invoke(options: OptionsInt) {
    const token = globalStore.token
    if (token) {
      options.header = {
        token: token,
        ...options.header
      }
    }
    const baseUrl = import.meta.env.VITE_API_URL
    options.url = baseUrl + options.url
    options = { ...options, ...config }
    if (options.showLoading) {
      uni.showLoading({
        title: '加载中',
      })
    }
  },
}

uni.addInterceptor('request', requestInterceptor)

let uniRequest: UniApp.RequestTask | null = null
const loginRoutePath: string = '/pages/login/index'
const request = async (data: any) => {
  try {
    const requestInfo: UniApp.RequestSuccessCallbackResult | UniApp.RequestTask = await uni.request(
      { ...data },
    )
    uniRequest = requestInfo as UniApp.RequestTask
    const res: BaseResponse<any> = (requestInfo as UniApp.RequestSuccessCallbackResult)
      .data as BaseResponse<any>
    uni.hideLoading()

    // 登录失效
    if (res.code === ResultEnum.OVERDUE || res.code === ResultEnum.Unauthorized) {
      uni.showToast({
        title: res.msg,
        duration: 5000,
        icon: 'error',
      })
      console.log('清楚了数据')
      await globalStore.clearStore()
      router.replace(loginRoutePath)
      return Promise.reject(res)
    }

    return Promise.resolve(res)
  } catch (error: any) {
    if (data.showLoading) uni.hideLoading()
    return Promise.reject(error)
  }
}

// 打断请求
export const controllerCancelFn = () => {
  uniRequest!.abort()
}

class requestMethod {
  get<T>(url: string, showLoading: boolean = false, params?: object): Promise<BaseResponse<T>> {
    const data = {
      url,
      method: 'GET',
      data: params,
      showLoading,
    }
    return request(data)
  }
  post<T>(url: string, showLoading: boolean = false, params?: object): Promise<BaseResponse<T>> {
    const data = {
      url,
      method: 'POST',
      data: params,
      showLoading,
      header: {
        'content-type': 'application/json',
      },
    }
    return request(data)
  }
  formPost<T>(
    url: string,
    showLoading: boolean = false,
    params?: object,
  ): Promise<BaseResponse<T>> {
    const data = {
      url,
      method: 'POST',
      data: params,
      showLoading,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    }
    return request(data)
  }
}

export default new requestMethod()

```





### 配置文件

```typescript
export enum ResultEnum {
	SUCCESS = "200",
	ERROR = "500",
	OVERDUE = "401",
	TIMEOUT = 30000,
	TYPE = "success",
}

export const checkStatus = (status: number): void => {
	switch (status) {
		case 400:
			ElMessage.error("请求失败！请您稍后重试");
			break;
		case 401:
			ElMessage.error("登录失效！请您重新登录");
			break;
		case 403:
			ElMessage.error("当前账号无权限访问！");
			break;
		case 404:
			ElMessage.error("你所访问的资源不存在！");
			break;
		case 405:
			ElMessage.error("请求方式错误！请您稍后重试");
			break;
		case 408:
			ElMessage.error("请求超时！请您稍后重试");
			break;
		case 500:
			ElMessage.error("服务异常！");
			break;
		case 502:
			ElMessage.error("网关错误！");
			break;
		case 503:
			ElMessage.error("服务不可用！");
			break;
		case 504:
			ElMessage.error("网关超时！");
			break;
		default:
			ElMessage.error("请求失败！");
	}
};
```


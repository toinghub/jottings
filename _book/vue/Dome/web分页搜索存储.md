# web 分页搜索存储

### vue2+ts+Mixins

```js
import { Component, Vue } from 'vue-property-decorator';

//页面分页信息保存
interface pagingInt {
	name: string;
	pagingInfo: object;
}
@Component
export default class PagingStroage extends Vue {
	pageObj: any; //对页面分页和过滤进行存储
	filters: any;
	newPageObj: any;
	filterConfig: any;

	created() {
		this.getStoragePagingInfo();
	}
	beforeDestroy() {
		this.setStoragePagingInfo();
	}

	pageRoute: any = null;
	//设置当前页码分页信息
	getStoragePagingInfo() {
		this.pageRoute = this.$route;
		//获取当前分页信息
		const pagingInfo = this.getStoragePaging(this.pageRoute);
		if (!pagingInfo) return;
		//将存储的分页信息赋值给pageObj
		if (pagingInfo.pageObj) {
			this.pageObj = { ...this.pageObj, ...pagingInfo.pageObj };
		}
		//处理存储的过滤信息，并且赋值
		if (pagingInfo.filters) {
			this.filters = { ...this.filters, ...pagingInfo.filters };
			for (let key in pagingInfo.filters) {
				const value = pagingInfo.filters[key];
				if (this.filterConfig[key]) {
					this.filterConfig[key].value = value;
				}
				if (key === 'endTime' || key === 'startTime') {
					this.filterConfig.date.option[key].value = value;
				}
			}
		}
	}
	//存储当前分页信息
	setStoragePagingInfo() {
		if (!this.newPageObj) return;
		let pagingInfo: any = {
			pageObj:
				this.newPageObj.current || this.newPageObj.pageSize
					? this.newPageObj
					: null,
			filters: this.filters || null,
		};
		this.setStoragePaging(this.pageRoute, pagingInfo);
	}

	//获取分页信息
	getStoragePaging(route: any) {
		let dataJson: any = window.sessionStorage.getItem('pagingInfo');
		let data: pagingInt[] = dataJson ? JSON.parse(dataJson) : [];
		if (data.length > 0 && route) {
			let pagingInfo: any = null;
			let newData: pagingInt[] = [];
			data.forEach((item: pagingInt) => {
				if (item.name === route.name) {
					pagingInfo = item;
				} else {
					newData.push(item);
				}
			});
			if (newData.length > 0) {
				window.sessionStorage.setItem(
					'pagingInfo',
					JSON.stringify(newData)
				);
			} else {
				window.sessionStorage.removeItem('pagingInfo');
			}
			if (pagingInfo) {
				return pagingInfo.pagingInfo;
			}
		}
		return null;
	}

	//设置分页信息
	setStoragePaging(route: any, pagingInfo: object) {
		if (!pagingInfo) return;
		const newData: pagingInt = {
			name: route.name,
			pagingInfo,
		};
		let data: any = window.sessionStorage.getItem('pagingInfo');
		data = data ? JSON.parse(data) : [];
		data = [...data, newData];
		window.sessionStorage.setItem('pagingInfo', JSON.stringify(data));
	}
}
//清空分页信息
export function removeStoragePaging() {
	setTimeout(() => {
		window.sessionStorage.removeItem('pagingInfo');
	}, 0);
}

```


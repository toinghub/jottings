# web 分页搜索存储

```css

const localKey = "yPlan_platform_pageInfo"

interface pageInfoInt {
    page: pageInt,
    searchInfo: any,
}
interface pageInt {
    current: number,
    pageSize?: number,
}


//获得页面分页信息 
export const getPagePaging = (pageKey?: string) => {
    const pageInfo: pageInfoInt = getPageStorage(pageKey)
    return pageInfo.page
}
// 设置页面分页信息
export const setPagePaging = (page: pageInt, pageKey?: string) => {
    const pageInfo: pageInfoInt = getPageStorage(pageKey)
    const newPageInfo = { page: { ...{ current: 1, pageSize: 10, }, ...pageInfo.page, ...page }, searchInfo: pageInfo.searchInfo || null }
    setPageStorage(newPageInfo, pageKey)
}

// 获得页面搜索信息
export const getPageSearch = (pageKey?: string) => {
    const pageInfo: pageInfoInt = getPageStorage(pageKey)
    return pageInfo.searchInfo
}

// 设置页面搜索信息
export const setPageSearch = (searchInfo: any, pageKey?: string) => {
    const pageInfo: pageInfoInt = getPageStorage(pageKey)
    const newPageInfo = { page: pageInfo.page || null, searchInfo: { ...pageInfo.searchInfo, ...searchInfo }, }
    setPageStorage(newPageInfo, pageKey)
}

// 删除页面信息
export const deletePageInfo = (pagePath: string) => {
    const pageMap = getPageMap()
    const pageMapArr = Array.from(pageMap)
    if (pageMapArr.length === 0) return
    const filterArr: any = pageMapArr.filter((item: any) => {
        let pagePathSty: string = item[0]
        if (pagePathSty.includes('$')) {
            pagePathSty = pagePathSty.split("$")[0]
        }
        return pagePathSty !== pagePath
    })
    window.sessionStorage.setItem(localKey, JSON.stringify(filterArr));
}

// 删除-除当前页面的其他页面
export const deleteSurplusPageInfo = (pagePath: string) => {
    const pageMap = getPageMap()
    const pageMapArr = Array.from(pageMap)
    if (pageMapArr.length === 0) return
    const filterArr: any = pageMapArr.filter((item: any) => {
        let pagePathSty: string = item[0]
        if (pagePathSty.includes('$')) {
            pagePathSty = pagePathSty.split("$")[0]
        }
        return pagePathSty === pagePath
    })
    window.sessionStorage.setItem(localKey, JSON.stringify(filterArr));
}

// 删除所有页面信息
export const clearPageAllInfo = () => {
    window.sessionStorage.removeItem(localKey)
}


// 获取页面信息
const getPageStorage = (pageKey?: string,): any => {
    const pageMap = getPageMap()
    return pageMap.get(getPageKey(pageKey)) || {}
}



// 获取页面Map信息
const getPageMap = (): any => {
    const data: string | null = window.sessionStorage.getItem(localKey);
    if (!data) return new Map()
    return new Map(JSON.parse(data))
}



// 设置页面信息
const setPageStorage = (value: any, pageKey?: string) => {
    const pageMap = getPageMap()
    pageMap.set(getPageKey(pageKey), value)
    const data = JSON.stringify(Array.from(pageMap))
    window.sessionStorage.setItem(localKey, data);
}

/**
 * 页面信息
 * @param pageKey 对应的表格key值 
 * @returns {string}
 */
const getPageKey = (pageKey?: string) => {
    let pageHash = window.location.hash
    if (pageHash.includes("#")) {
        pageHash = pageHash.split("#")[1]
    }
    if (!pageKey) return pageHash
    const pageInfoKey: String = `${pageHash}$${pageKey}`
    return pageInfoKey
}




```


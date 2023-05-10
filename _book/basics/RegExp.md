# RegExp

# 类型

```js
var re = new RegExp("表达式","修饰符");

var re = /表达式/修饰符;
var re = eval(`/${a}/g`).test() //变量书写
```



# 普通字符

##  **[...]** 

> 匹配 **[...]** 中的所有字符 
>
> .+ () 放在其中指定单纯的字符本意

```js
const str = "acacaca bababa cdcd";
const patt1 = /[ab]/g;
str.match(patt1) //a,a,a,a,b,a,b,a,b,a
```

##  **[^...]** 

> 匹配除了 **[...]** 中字符的所有字符 

```js
const str = "acacaca bababa cdcd";
const patt1 = /[^ab]/g;
str.match(patt1) //c,c,c, , ,c,d,c,d
```

##  **[.-.]**

> 表示一个区间，匹配区间里的内容

```js
/[a-z]/g;  //匹配小写a到小写z的字符 
/[A-Z]/g;  //匹配大写A到大写Z的字符
/[A-z]/g;  //匹配大写A到小写z的字符 
```

##  **.** 

> 匹配除换行符（\n、\r）之外的任何单个字符 

```js
/[A-z]/g;
//等同
/[^\n\r]/g
```



##  \w | \W 

> 单词字符 

```js
/\w/g; //匹配任何单词字符,等价于:[a-zA-Z0-9]
/\W/g; //匹配任何非单词字符,等价于:[^a-zA-Z0-9]
```

##  \s |  \S

> 空白字符

```js
/\s/g; //匹配任何空白字符,等价于:[\f\n\r\t\v]
/\S/g; //匹配任何非空白字符,等价于: [^\f\n\r\t\v]
```

##  \d | \D 

> 数字字符

```js
/\d/g; //匹配一个数字字符,等价于:[0-9]
/\D/g; //匹配一个非数字字符,等价于:[^0-9]
```

##  \b | \B

> 单词边界

```js
/\b/g; //匹配一个单词边界，指单词和空格间的位置
const str = "never verb";
const patt1 = /er\b/g;
str.match(patt1) //只能匹配never中的er

/\B/g; //匹配非单词边界
const str = "never verb";
const patt1 = /er\B/g;
str.match(patt1) //只能匹配verb中的er
```



# 非打印字符

|     \r     |     \t     |      \0      |     \n     |
| :--------: | :--------: | :----------: | :--------: |
| 查找回车符 | 查找制表符 | 查找NULL字符 | 查找换行符 |



# 限定符

##  {n} 

> 匹配确定的 n 次

```js
const str = "Bob food";
const patt1 = /o{2}/g;
str.match(patt1) //只能匹配 "food" 中的两个 o
```

##  {n,} 

> 至少匹配n 次 ,上限无限

```JS
/o{1,}/g; //等价于 'o+'
/o{0,}/g; //等价于 'o*'

const str = "Bob fooooood";
const patt1 = /o{2,}/g;
str.match(patt1) //能匹配 "fooooood" 中的所有 o
```

##  {n,m} 

> 最少匹配 n 次且最多匹配 m 次 
>
> 注意在逗号和两个数之间不能有空格 

```js
/o{0,1}/g; //等价于 'o?'

const str = "Bob fooooood";
const patt1 = /o{2,4}/g;
str.match(patt1) //oooo oo  贪婪匹配

const str = "fooooood";
const patt1 = /^o{2,4}$/g;
str.match(patt1) //false str内容必须是2-4位的才为true
```

##  \ 

> 转义字符

```js
( [ { \ ^ $ | ) ? * + . ] } //需要使用转义字符的
```

##  ( ) 

> 原子组
>
> 对子表达式进行一个分组
>
> 子表达式可以获取供以后使用 

```js
//分组
var str="abz acz";
var patt1=/(ab|ac)z/g; //将abac进行分组
str.match(patt1) 

//重复使用
//验证的值前后需要一致
var str="a1@a1";
var patt1=/(a[1-3])@\1/g; //a[1-3]进行分组，后续通过\1 进行使用( 后续如果还存在原子组，则延续\1\2\3 )
str.match(patt1) 
```

## (?:)

> 在组记录中忽略其内容

```js
var str = "a1@a1.com";
var patt1 = /(a[1-3])@(?:com|org|cn)/g;
str.match(patt1) //数组中没有com
```

##  (?=n)

>断言匹配
>
>匹配任何其后紧接指定字符串 n 的字符串 

```js
//对其后紧跟 "all" 的 "is" 进行全局搜索
var str="Is this all there is";
var patt1=/is(?= all)/g;
str.match(patt1) //this 中的is被匹配
```

## (?<=n)

> 匹配任何前面紧接指定字符串 n 的字符串 

```js
//对其后紧跟 "all" 的 "is" 进行全局搜索
var str="Is this all there is";
var patt1=/(?<=all) there/g;
str.match(patt1) //there被匹配
```

##  (?!n)

> 匹配任何其后没有紧接指定字符串 n 的字符串 

```js
//对其后没有紧跟 "all" 的 "is" 进行全局搜索
var str="Is this all there is";
var patt1=/is(?= all)/g;
str.match(patt1) //前后的IS is被匹配
```

## (?<!n)

> 匹配任何前面没有紧接指定字符串 n 的字符串 

```js
//对其前面没有 "all" 的 "is" 进行全局搜索
var str="all Is this all there is";
var patt1=/(?<=all )is/g;
str.match(patt1) //is被匹配
```

## ？

> 禁止贪婪用途，使子表达式倾向少的那一方

|     +?      |     *?      |     ??      |  {2,100}?   |
| :---------: | :---------: | :---------: | :---------: |
| 只能匹配1次 | 只能匹配0次 | 只能匹配0次 | 只能匹配2次 |

```js
/hd+?/g; //只能匹配1次
/hd*?/g; //只能匹配0次
/hd??/g; //只能匹配0次
/hd{2,100}?/g; //只能匹配2次
```



|           n?            |           n+            |            n*             |
| :---------------------: | :---------------------: | :-----------------------: |
|  匹配前一项0次或者1次   |  匹配前一项一次或多次   |    匹配前一项0次或多次    |
|         **^n**          |         **n$**          |        **n \| m **        |
| 匹配任何开头为n的字符串 | 匹配任何结尾为n的字符串 | 选择符 - nm之间的一个选择 |



# 修饰符

|                   i                    |                g                 |           m           |
| :------------------------------------: | :------------------------------: | :-------------------: |
|         ignore - 不区分大小写          |        global - 全局匹配         | multi line - 多行匹配 |
|                 **s**                  |              **y**               |                       |
| 特殊字符圆点 **.** 中包含换行符 **\n** | 连续检索，当下一个未检索到是停止 |                       |



# 对象方法

##  [exec](https://www.runoob.com/jsref/jsref-exec-regexp.html) 

> 检索字符串中指定的值，并返回找到的值 

```js
var str="Hello world!";
var patt1=/Hello/g;
var result1=patt.exec(str);//Hello
var patt2=/to/g;
var result2=patt.exec(str);//null
```

##  [test](https://www.runoob.com/jsref/jsref-test-regexp.html) 

> 检索字符串中指定的值 
>
> 有匹配的值返回 true ，否则返回 false 

```js
var str="Hello world!";
var patt1=/Hello/g;
var result1=patt.test(str);//true
var patt2=/Runoob/g;
var result2=patt.test(str);//false
```

##  [toString](https://www.runoob.com/jsref/jsref-regexp-tostring.html) 

> 返回正则表达式的字符串值 

```js
var patt = new RegExp("RUNOOB", "g");
var res = patt.toString(); ///RUNOOB/g
```

##  [search](https://www.runoob.com/js/jsref-search.html) 

> 返回正则表达式相匹配的索引值 
>
> 没有找到任何匹配的子串，则返回 -1 

```js
var str="Visit Runoob!"; 
var n=str.search("Runoob"); //6
```

##  [match](https://www.runoob.com/js/jsref-match.html) 

> 找到一个或多个正则表达式的匹配 

```js
var str="The rain in SPAIN stays mainly in the plain"; 
var n=str.match(/ain/g);//ain,ain,ain
```

##  matchAll

> 返回一个迭代对象

```js
var str="The rain in SPAIN stays mainly in the plain"; 
var n=str.matchAll(/ain/g)
```



##  [replace](https://www.runoob.com/js/jsref-replace.html) 

> 替换与正则表达式匹配的子串 

|      $1      |      $&      |         $`         |         $'         | ?<name> |
| :----------: | :----------: | :----------------: | :----------------: | :-----: |
| 第一个原子组 | 匹配到的内容 | 匹配到的前面的内容 | 匹配到的后面的内容 |  别名   |

```js
var str = "abab acac adad";
var patt = new RegExp("a", "gm")
var n = str.replace(patt,"s");//sbsb scsc sdsd
var n = str.replace(patt,v=>{  return "s" });//sbsb scsc sdsd

//$1 第一个原子组
var str = "a1@a1";
var patt1 = /(a[1-3])@\1/g;
str.replace(patt1,`$1`) //a1

//$& 匹配到的内容 
//$` 匹配到的前面的内容 a1@前面的等号
//$' 匹配到的后面的内容 @a1后面的等号
var str = "=a1@a1=";
var patt1 = /(a[1-3])@\1/g;
str.replace(patt1,`$&1`) //a1@a11

//别名 可以通过matchAll直接访问到别名
var str = "=a1@a1=";
var patt1 = /(?<con>a[1-3])@\1/g;
str.replace(patt1,`$<con>`) //a1@a1
```

##  [split](https://www.runoob.com/js/jsref-split.html) 

> 把字符串分割为字符串数组 

```js
var str = "abab-acac/adad";
var patt = new RegExp("-\/", "g")
var n = str.split(patt);//abab,acac,adad
```

|     global     |   判断是否设置了 "g" 修饰符    |
| :------------: | :----------------------------: |
| **ignoreCase** | **判断是否设置了 "i" 修饰符**  |
| **multiline**  | **判断是否设置了 "m" 修饰符**  |
|   **source**   |  **返回正则表达式的匹配模式**  |
| **lastIndex**  | **用于规定下次匹配的起始位置** |


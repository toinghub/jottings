# [Moment](http://momentjs.cn/)

* `Moment` 原型通过 `moment.fn` 公开
* `Moment.prototype.format` == `moment.fn.format` == `moment＃format` 

# 解析

## moment()

> 获取当前的日期和时间 

```js
moment() 
//上下相同
moment(new Date())
```

## moment(Number)

> 时间戳转换

```js
moment(1318781876406)
```

## moment(Date)

> 使用预先存在的原生 Javascript Date 对象来创建 `Moment` 

```js
var day = new Date(2011, 9, 16);
var dayWrapper = moment(day);
```

## 默认值

```js
moment(5, "DD");  // 本月的第 5 天
moment(5, "HH");  // 今天 5:00:00.000
moment("4 05:06:07", "DD hh:mm:ss");  // 本月的第 4 天 05:06:07.000
moment(3, "MM");  // 今年第三个月（三月）
moment("Apr 4 05:06:07", "MMM DD hh:mm:ss");  // 今年四月的第 4 天 05:06:07.000
```

# 取值/赋值

##  millisecond() 

> 获取或设置毫秒，接受 0 到 999 之间的数字
>
> 超出范围，则会冒泡到秒钟 

```js
moment().millisecond(Number);
moment().milliseconds(Number);
```

##  second() 

> 获取或设置秒钟 , 接受 0 到 59 之间的数字 
>
> 超出范围，则会冒泡到分钟 

```js
moment().second(Number);
moment().seconds(Number);
```

##  minute() 

> 获取或设置分钟 , 接受 0 到 59 之间的数字 
>
> 超出范围，则会冒泡到小时 

```js
moment().minute(Number
moment().minutes(Number);
```

##  hour() 

> 获取或设置小时, 接受 0 到 23 之间的数字 
>
> 超出范围，则会冒泡到日期 

```js
moment().hour(Number);
moment().hours(Number);
```

##  date() 

> 获取或设置月份的日期, 接受 1 到 31 之间的数字 
>
> 超出范围，则它将会冒泡达到月份 

```js
moment().date(Number);
```

## month() 

> 获取或设置月份，接受 0 到 11 之间的数字
>
> 超出范围，则会冒泡到年份
>
> 月份是零索引的，因此一月是月份 0 
>
> 支持月份名称设置

```js
moment().month(string | number);
```

##  year()

> 获取或设置年份，接受 -270,000 至 270,000 之间的数字 

```js
moment().year(Number);
moment().years(Number);
```

## 链接操作

> 链接多个操作以构造一个日期，应从年份、月份、日期等依次开始 

```js
moment().year(year).month(month).date(day)
```

##  dayOfYear() 

> 获取或设置年份的日期，接受 1 到 366 之间的数字
>
>  超出范围，则会冒泡到年份 

```js
moment().dayOfYear(Number);
```

## day()

> 获取或设置星期几，此方法可用于设置星期几，其中星期日为 0、星期六为 6
>
> 超出范围，则会冒泡到其他星期 
>
> 也支持星期名称 

```js
moment().day(Number|String);
moment().days(Number|String);
```

##  week() 

> 获取或设置年份的星期 

```js
moment().week(Number);
moment().weeks(Number);
```

## quarter() 

> 获取或设置季度 ，接受 1 到 4之间的数字
>
> 超出范围，则会冒泡到下一年

```js
moment().quarter(Number);
moment().quarters(Number);
```

##  get(string)

```js
moment().get('year');
moment().get('month');
moment().get('date');
moment().get('hour');
moment().get('minute');
moment().get('second');
moment().get('millisecond');
```

##  set(string,number)

```js
moment().set('year', 2013);
moment().set('month', 3);
moment().set('date', 1);
moment().set('hour', 13);
moment().set('minute', 20);
moment().set('second', 30);
moment().set('millisecond', 123);

moment().set({'year': 2013, 'month': 3});
```

##  max ()

> 返回给定的 moment 实例的最大值 

```js
moment.max(Moment[,Moment...]);
moment.max(Moment[]);
moment.max(a, b);  // b
```

##  min()

> 返回给定的 moment 实例的最小值 

```js
moment.min(Moment[,Moment...]);
moment.min(Moment[]);
moment.min(a, b);  // a
moment.min([a, b]); // a
```

# 操作

##  add()

> 通过增加时间来改变原始的 moment 
>
> 可以使用单词简写

```js
moment().add(Number, String);
moment().add(Duration);
moment().add(Object);
```

```js
moment().add(7, 'days');
moment().add(7, 'd');
```

##  subtract()

> 通过减去时间来改变原始的 moment 

```js
moment().subtract(Number, String);
moment().subtract(Duration);
moment().subtract(Object);
```

```js
moment().subtract(7, 'days');
```

##  startOf(String) 

> 将原始的 moment 设置为时间单位的开头 

```js
moment().startOf('year');    // 设置为今年1月1日上午 12:00
moment().startOf('month');   // 设置为本月1日上午 12:00
moment().startOf('quarter');  // 设置为当前季度的开始，即每月的第一天上午 12:00
moment().startOf('week');    // 设置为本周的第一天上午 12:00
moment().startOf('isoWeek'); // 根据 ISO 8601 设置为本周的第一天上午 12:00
moment().startOf('day');     // 设置为今天上午 12:00
moment().startOf('date');     // 设置为今天上午 12:00
moment().startOf('hour');    // 设置为当前时间，但是 0 分钟、0 秒钟、0 毫秒
moment().startOf('minute');  // 设置为当前时间，但是 0 秒钟、0 毫秒
moment().startOf('second');  // 与 moment().milliseconds(0); 相同
```

##  endOf(String) 

> 将原始的 moment 设置为时间单位的末尾 

```js
moment().endOf("year"); // 将 moment 设置为今年的 12 月 31 日 23:59:59.999
```

# 显示

## format() 

>显示格式

```js
moment().format();
moment().format(String);
```

```css
年份:YYYY   月份:M  月份的日期:D  小时24:HH  小时12:hh  分钟:mm  秒钟:ss 
季度:Q  年份的星期:w  星期几：d   子午线：A(AM PM)
年份的日期：DDD   Unix 时间戳:X(秒) x(毫秒)
```

## valueOf()

> 获得当前时间戳

```js
moment().valueOf();
+moment();
```

## daysInMonth()

> 获取当月天数

```js
moment().daysInMonth();
```

##  toArray() 

>  返回一个数组，该数组反映了 `new Date()` 中的参数 

```js
moment().toArray(); // [2013, 1, 4, 14, 40, 16, 154];	
```

##  toJSON() 

> 获取UTC（世界时）格式的json字符串

```js
moment().toJSON(); //'2023-05-05T07:08:31.045Z'
```

##  toObject() 

>  返回一个包含年份、月份、月份的日期、小时、分钟、秒钟、毫秒的对象 

```js
moment().toObject(); //{years: 2023, months: 4, date: 5, hours: 15, minutes: 11, …}
```

# 查询

##  isBefore()

>  检查一个 moment 是否在另一个 moment 之前 

```js
moment('2010-10-20').isBefore('2010-10-21'); // true
```

##  isSame()

>  检查一个 moment 是否与另一个 moment 相同 

```js
moment('2010-10-20').isSame('2010-10-20'); // true
```

##  isAfter()

> 检查一个 moment 是否在另一个 moment 之后 

```js
moment('2010-10-20').isAfter('2010-10-19'); // true
```

##  isBetween()

>  检查一个 moment 是否在其他两个 moment 之间 

```js
moment('2010-10-20').isBetween('2010-10-19', '2010-10-25'); // true
moment('2010-10-20').isBetween('2010-10-19', undefined); // true, 因为 moment(undefined) 等效于 moment()
```


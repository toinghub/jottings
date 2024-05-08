# [Dart](https://dart.dev/get-dart)

> #### [下载地址](https://dart.dev/get-dart/archive)
>
> #### [安装方式](https://blog.csdn.net/weixin_48200589/article/details/130686784)

## vscode插件

> 出现乱码，`settings.json`配置` "code-runner.runInTerminal": true `

|      Dart       |     高亮     |
| :-------------: | :----------: |
| **Code Runner** | 允许dart文件 |

### main -- 入口方法

```css
main(){}
void main(){}  //表示main方法没返回值，等同于ts的const a = ():void{}
```

## 变量

### var 定义

> 自动推导类型，不能和ts一样在后面跟类型
>
> 不会进行变量提升 

```css
var str = ""
```

### 类型定义

```css
String str = ""
int number = 123
```

## 常量

* 可以通过`is`关键词判断类型

### const

> 定义处值不能为空，必须有值

```css
const bar = 1000
```

### final

> 默认可以不赋值，但是只能被赋一次

```css
final time = new DateTime.now()
```

## 类型

### string -- 字符串

> 三个引号可以达到模板字符串的作用

```css
String str = "123"
String srt = """ 1213 123 """
```

##### 字符串拼接

```css
String str1 = "123";
String str2 = "456";
print("$str1$str2");
print(str1 + str2);
```

##### 类型转换

```css
int number = 123
var str = number.toString()
```

### numbers -- 数值

> int - 整数
>
> double - 浮点数

```css
int a = 123
double a= 1.23
```

##### 类型转换

```css
String str = "123"
var num = int.parse(str)

String str = "1.23"
var num = double.parse(str)
```

### boolean -- 布尔值

```css
bool show = true
```

### List -- 数组/集合

> 本质上是js的数组

```css
var list = []
List list = []
var list = <String>[]
var list = new List() //2.0创建方法，仅作参考
var list = List.filled(2, ""); //创建指定长度集合

```

#### 常用方法

> js相同方法：length、join、split、forEach、set、map
>
> forEach 修改方法里的值，不会改变原数组

|          方法          |               描述                |
| :--------------------: | :-------------------------------: |
|          add           |               增加                |
|         addAll         |             拼接数组              |
|         remove         |       删除 -- 删除对应参数        |
|        removeAt        |    删除指定位置 -- 传入索引值     |
|  finllRange(1,4,123)   | 修改 - 在数组1-4索引位的替换为123 |
|     insert(1,123)      |       增加指定位置的一个值        |
| insertAll(1,[123,123]) |       增加指定位置的多个值        |
|         toList         |            转化成list             |

### Maps -- 映射

> key 必须加引号
>
> 比较像js的对象

```css
//普通定义
var param = {
    "name":'张三',
    "age":18
}
//Map 定义
Map param = {
    "name":'张三',
    "age":18
}

//new map定义
var param = new Map()
param["name"] = "张三"
param["age"] = 18

print(param['name'])
```

#### 常用方法

> js相同方法：forEach、map、set

|         方法         |            描述            |
| :------------------: | :------------------------: |
|         keys         |       查看所有key值        |
|        values        |      查看所有values值      |
|       isEmpty        |          是否为空          |
|     remove(key)      |    删除 -- 删除对应参数    |
|      addAll({})      |          拼接数组          |
| containsValue(value) |    判断value值是否存在     |
|         any          | 检测元素是否都有符合条件的 |
|        every         | 检测元素元素是否都符合条件 |

## 运算符 --- 基本上和js一致

## 函数

> 方法使用**箭头函数**只能写**一行**

```css
int printInfo(int n){ return n } //前面写返回类型，没有则写void
void main() {
 printInfo()
}
```

### 参数

> 可选参数 --- `[]`
>
> 默认参数 --- `=`
>
> 命名参数 --- `{}`
>
> 方法直接传入即可

```css
//可选参数
int printInfo(int n,[String sex，int age]){
    return n
}

//默认参数
int printInfo(int n,[String sex='男']){
    return n
}

//命名参数
int printInfo(int n,{String sex，int age}){
    return n
}
printInfo(123，sex:'男',age:18)
```

### 方法

```css
int fun(int n ){ return n } //命名方法
final fun = (int n ){ return n } //匿名方法
((int n ){   print(n)  })(123) //自执行方法
```

## class - 类

> 首字母大写驼峰写法

```css
class Person {
  String name = "name";
  int age = 18;
  void getInfo() {
    print("${this.name}---${this.age}");
  }
  void setAge(int age) {
    this.age = age;
  }
}

void main() {
  Person p1 = new Person();
  print(p1.name);
  p1.setAge(20);
  p1.getInfo();
}
```

### 默认构造函数

> 构造函数名和类名一致

```css
class Person {
  String? name;
  int? age;
  Person(String name, int age) { //简写` Person(this.name, this.age)`
    this.name = name;
    this.age = age;
  }
    
  void getInfo() {
    print("${this.name}---${this.age}");
  }
}

void main() {
  Person p1 = new Person('name', 20);
  print(p1);
}

```

### 命名构造函数

> 在实例化时就可直接调用

```css
class Person {
  String? name;
  int? age;
  Person(this.name, this.age);
  Person.now(String text) {
    print(text);
  }
}

void main() {
  Person p1 = new Person.now("命名构造函数");
}

```

### 私有属性/方法

> 在属性和方法前面加`_`定义为私有
>
> 同文件下,定义私有无效,必须跨文件

```css
class Person {
  String? _name;
  int? _age;
  Person(this._name, this._age);
  String _info() {
    return "${this._name}---${this._age}";
  }

  void getInfo() {
    print(this._info);
  }
}

void main() {
  Person p1 = new Person('name', 18);
  p1.getInfo();
}
```

### get/set

> `get` -- 计算属性
>
> `set` -- 监听器

```css
class Rect {
  int height;
  int width;
  Rect(this.height, this.width);
  get area {
    return this.width * this.height;
  }

  set areaHeight(int value) {
    this.height = value;
  }
}

void main() {
  Rect r = new Rect(3, 4);
  r.areaHeight = 6;
  print(r.area);
}

```

### 初始化实例变量

```css
class Rect {
  int height;
  int width;
  Rect():height=2,width=3{};
}
```

### static -- 静态

> 静态方法不能访问非静态成员,非静态方法可以访问静态成员
>
> 静态成员和方法,不用实例化即可访问
>
> 静态成员在类中直接访问

```css
class person {
  static String name = "name";
  int age = 20 ;
  
  static void show(){
    print(name);
  }
  void printInfo(){
    print(name);
    print(this.age);
  }
}
main(){
  person.show()
}
```

### 操作符

* ?  -- 条件运算符
* as -- 类型转换
* is -- 类型判断
* ..  -- 级联操作(连缀)

```css
class Person {
  String name;
  int age;
  Person(this.name, this.age);
  info() {
    print("${this.name}---${this.age}");
  }
}

void main() {
  Person p1 = new Person('name', 18);
  p1..name = "name1"
    ..age = 20
    ..info();
}
```

### 继承

> 父类属性可直接通过this使用,方法则需要访问`super`

* `extends`  --- 继承父类里可见的属性的方法, 不会继承构造函数
* `super`  -- 本质上是父类的实例

```css
class Person {
  String name;
  int age;
  Person(this.name, this.age);
  info() {
    print("${this.name}---${this.age}");
  }
}

class Web extends Person {
  Web(super.name, super.age); //默认构造函数传参
  Web(String name, int age) : super(name, age); //默认构造函数传参
  Web.now(super.name, super.age);//命名构造函数传参
  
  super.info() //子类调用父类方法
    
  @override //覆写时建议写入
  void info() {
    print("覆写的类");
  }
}

void main() {
  Web p1 = new Web('name', 18);
}
```

### 抽象类  -- abstract

##### extends -  继承  - 复用抽象类里的方法并且要使用抽象方法约束子类使用

> 主要用于定义标准 
>
> 不能直接实例化,只有继承它的子类才可以
>
> 没有方法体的方法称为抽象方法,并且**继承的子类必须实现抽象类里的抽象方法**
>
> 抽象类的普通方法和普通类没有区别

```css
abstract class Painting {
  color(); //抽象方法
  text() {} //普通方法
}

class Draw1 extends Painting {
  @override
  color() {
    print("red");
  }
}

class Draw2 extends Painting {
  @override
  color() {
    print("pink");
  }
}

void main() {
  Draw1 p1 = new Draw1();
  p1.color();

  Draw2 p2 = new Draw2();
  p2.color();   
}
```

#### 多态 -- 父类不去实现,让继承的子类实现,每个子类有不同的表现

> 将子类的实例赋值给父类的引用,这样就无法使用子类里的方法的属性

```scss
void main() {
  Painting p1 = new Draw1();
  p1.color();

  Painting p2 = new Draw2();
  p2.color();   
}
```

#### 接口

##### implements  -   接口   -  单纯的使用抽象方法和属性当作标准使用

```css
class Draw1 implements Painting1,Painting2 {}
```

### mixin  -- 待记录

## 泛型

### 泛型方法

```css
T getData<T>(T value) {
  return value;
}
void main(){
  getData<String>('');
  getData<int>(123);
}
```

### 泛型类

```css
class ListInfo<T>{
  List list = <T>[];
  void add(T value){
    this.list.add(value);
  }
}
main(){
  ListInfo list = new ListInfo<int>();
  list.add(123);
}
```

### 泛型接口

```css
abstract class Cache<T> {
  getByKey(String key);
  void setByKey(String key, T value);
}

class FileCache<T> implements Cache<T> {
  @override
  getByKey(String key) {
    return null;
  }

  @override
  void setByKey(String key, T value) {}
}

main() {
  FileCache f = new FileCache<String>();
  f.setByKey('index', '');

}
```


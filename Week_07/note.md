## 1. 运算符和表达式
运算符（优先级由高到低）：
1）Member
a.b、a[b]、foo`string`（优先级和member运算一样，但其实和member运算没有任何关系）、super.b、super[b]、new.target、new Foo()
2）New
new Foo
可以看到，带括号的new和不带括号的new的优先级是不同的，带括号的new和member运算符是相同的，不带括号的new被单独设了一个优先级New Expression，主要原因可以通过这两个例子看出来：
new a()() ：我们需要判断a 后面的第一对括号是函数调用还是new运算的结果， 我们可以从上面的优先级判断出来，因为 new fun() 优先级更高，所以第一个括号一定是跟着前面的new运算的。
new new a()：因为带括号的new运算符的优先级更高，所以它的括号会跟第二个new优先结合。
Reference：
a.b 访问的是一个属性，但它从属性取出来的不是属性值而是一个引用。引用类型并非js的7种基本类型之一， 引用类型我们称作标准中的类型，而不是语言中的类型。
reference 分为 两部分：对象和key（key可以为string或者symbol），所以它就完全记录了Member运算的前半部分和后半部分。
delete和assign这样的基础设施，其实就会用到reference类型，如果做加法或减法的运算，就会把reference直接解引用，然后像普通变量一样去使用，但Member表达式出来的，如果是放在delete之后，就需要用到引用的特性，因为我们要知道删除的是哪一个对象的哪一个key。
assign也一样，当我们把一个member运算放在等号左边，我们也同样要知道我们把右边的表达式赋值给哪一个对象的哪一个属性。
js就是用引用类型在运行时来处理删除或者赋值这样的写相关的操作的。
3）Expression（优先级低于new）：
① Call：foo()  super()   foo()['b']    foo().b   foo()`abc`
优先级低于new和Member，在括号之后加上取属性，比如方括号、.b、反引号等， 会让表达式降级为Call Expression，即后边点运算符的优先级也降低了。所以，点运算是由前面的结构来决定它的优先级。
② new a()['b']：带圆括号的new是一个Member Expression， 优先级要高于call Expression。后边带方括号的属性访问，被call Expression拉低了优先级，所以正确的理解方式是:new出来了一个a对象，然后访问它的b属性。
Left Handside & Right Handside  左手和右手运算
我们可以使用a.b = c，但不能使用a+b = c，因为a.b是一个Left  Handside Expression，a+b 是一个Right Handside Expression。只有 Left Handside Expression 才可以放到等号左边。
Left Handside Expression 几乎一定是 Right Handside Expression。
③ Update
a++，a--，--a，++a
从Update这一级开始，就已经是 Right Handside Expression了，update 自增、自减。
++ a ++：a会优先跟后边的自增相结合。++(a++)
④ Unary 单目运算符
delete a.b     void foo()    typeof a   + a    - a      ~ a       ! a       await a     
void：是将不管后面什么东西，都变成undefined，类似于空白，回车，可以起到很好的改变语法结构的作用。
⑤ Exponental
**   js唯一右结合的运算符
3**2**3          3**（2**3）
⑥ Multiplicative     
 *  / %
⑦ Additive
+ -
⑧ Shift
<< >> >>>
⑨ Relationship
< > <= >= instanceof
in 
⑩ Equality
==   !=  !== ===
11 Bitwise
&   ^   |
12 Logical
&&   ||
13  Conditional
? :


## 2. js表达式  类型转换
a+b 一定是要作用于两个字符串或者两个数字之间的，一旦a和b属于别的类型，将发生一个类型转换。
js转换规则：
![image.png](https://cdn.nlark.com/yuque/0/2021/png/265011/1618043654200-c8f0c02d-5fe2-40e4-8468-4e455134cd64.png#align=left&display=inline&height=338&margin=%5Bobject%20Object%5D&name=image.png&originHeight=676&originWidth=1973&size=632575&status=done&style=none&width=986.5)
拆箱转换：
将一个Object转成一个基本类型
ToPremitive 发生在表达式定义的方方面面，比如 Object+Object，或者Object参与运算的情况，都会调用ToPremitive过程。
对象上有三个方法的定义会影响到ToPremitive：toString、valueOf、Symbol.toPrimitive，如果定义了Symbol.toPrimitive，就会忽略toString和valueOf。否则我们在进行不同的转换的时候，会根据提示来决定调用toString和valueOf的先后。
加法先调用valueOf。


o作为属性名时，会优先调用toString方法。
转number一定会先调用valueOf
转字符串会先调用toString
```javascript
var x = {}
var o = {
	toString(){
    console.log(111);
  	return "2"
  },
  valueOf(){
    console.log(222);
  	return 1
  },
  [Symbol.toPrimitive](){
    console.log(333);
  	return 3
  }
}
x[o] = 1;
console.log("x" + o);
```
装箱转换
![image.png](https://cdn.nlark.com/yuque/0/2021/png/265011/1618045162087-c94a3371-0f37-44b4-be37-8e744b417feb.png#align=left&display=inline&height=190&margin=%5Bobject%20Object%5D&name=image.png&originHeight=380&originWidth=1556&size=282704&status=done&style=none&width=778)对每个基础类型（除了undefined和null），object都提供了一个包装的类，需要注意，Symbol对象没有办法被new调用，对象还需要用Object构造器再包一层，我们只能通过调用Symbol 来获得一个Symbol类型的值，但加了new将会抛错。
我们使用member，即使用点或者方括号去访问属性的时候，如果点或方括号之前的变量或表达式得到的是一个基础类型，就会自动调用装箱的过程。
Number类型和Number类并不是一个东西，可以通过typeof区分到底是包装后的对象还是包装前的值。


## 3. js语句 运行时相关概念
语句：简单语句、组合语句、声明
运行时：Completion Record（语句执行的结果记录）、Lexical Environment（作用域相关知识）
Completion Record：
[[type]]：normal、break、continue、return、throw
[[value]]：基本类型
[[target]]：label
简单语句：

   - ExpressionStatement        表达式语句 =
   - EmptyStatement              空语句 单独的一个分号
   - DebuggerStatement        Debugger+分号
   - ThrowStatement              
   - ContinueStatement
   - BreakStatement
   - ReturnStatement

复合语句

   - BlockStatement
   - IfStatement
   - SwitchStatement    （不建议在js中用，因为性能和if差不多，且容易写错）
   - IterationStatement
   - WithStatement
   - LabelledStatement
   - TryStatement

      try-catch-finally 中，即使try-catch里面有return语句，finally还是会执行


## 4. js语句 声明

   - FunctionDeclaration
   - GeneratorDeclaration
   - AsyncFunctionDeclaration
   - AsyncGeneratorDeclaration
   - VariableStatement
   - ClassDeclaration
   - LexicalDeclaration

作用范围只认Function body的：function、function *、async function、async function *、var，只要出现，永远被当做出现函数第一行去处理。变量提升。var 只提升声明作用，赋值不提升。
暂时性死区：class、const、let  同样是存在变量提升的


预处理
在一段代码执行之前，js引擎会对代码本身做一次预先处理。
```javascript
//理论上return后的变量声明不会被执行到 但预处理不会考虑这些 所以a=1并没有改变函数外边的a  而是赋值的里面的a
var a = 2;
void function () {
	a = 1;
  return;
  var a;
}();
console.log(a);  // 2

//  const 其实也有预处理机制  只是在声明前使用，将报错（暂时性死区）
var a = 2;
void function () {
	a = 1;
  return;
  const a;
}();
console.log(a);
```


## 5. js结构化 宏任务和微任务
宏任务：传给js引擎的任务
微任务：在js引擎内部的任务（在js中，只有promise会产生微任务）
js执行粒度（运行时）
宏任务、微任务（Promise）、函数调用（Execution Context）、语句/声明（Completion Record）、表达式（Reference）、直接量/变量/this

























































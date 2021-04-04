# 泛用语言分类方法
  + 非形式语言
    语法没有严格定义
  + 形式语言
    有一个形式化定义
    分类（乔姆斯基谱系）
    乔姆斯基谱系：是计算机科学中刻画形式文法表达能力的一个分类谱系，是由诺姆·乔姆斯基于 1956 年提出的
    - 0型 无限制文法或短语结构文法 （只要定义清楚了语言是什么样的，包含了所有的文法）
    - 1型 上下文相关文法 （生成上下文相关语言）
    - 2型 上下文无关文法 （生成上下文无关语言）
    - 3型 正则文法 （生成正则语言）
    0123四种属于一种包含关系，一个1型上下文相关文法一定也属于0型，3型一定隶属于012型，反过来不成立。
# 什么是产生式
  + 用尖括号括起来的名称来表示语法结构名
  + 语法结构分成基础结构和需要用其他语法结构定义的符合结构
    - 基础结构称终结符
    - 复合结构称非终结符
  + 引号和中间的字符表示终结符
  + 可以有括号
  + *表示重复多次
  + | 表示或
  + 表示至少一次
  使用BNF来表示四则运算：
    四则运算（1+2*3）
    终结符：Number、+ - * / 
    非终结符：MultiplicativeExpression、AddtiveExpression
  ```
    BNF
    <MultiplicativeExpression>::=<Number>|
          <MultiplicativeExpression>"*"<Number>|
          <MultiplicativeExpression>"/"<Number>|
    <AddtiveExpression>::=<MultiplicativeExpression>|
          <AddtiveExpression>"+"<MultiplicativeExpression>|
          <AddtiveExpression>"-"<MultiplicativeExpression>|
  ```
  ## 通过产生式理解乔姆斯基谱系
  + 0型 无限制文法
    ?::=?
  + 1型 上下文相关文法
    ?<A>?::=?<B>?
  + 2型 上下文无关文法
    <A>::=?
  + 3型 正则文法
    <A>::=<A>?
  思考：js是上下文相关文法还是上下文无关文法，js是否是正则文法
    js总体上属于上下文无关文法（严格意义上属于上下文相关文法 get），其中的表达式部分大部分属于正则文法（特例：** 并不是一个正则文法，因为是右结合运算，2**1**2 = 2，if之类的语句加上更不是正则文法了）
# 现代语言的分类 
  用途分类：数据描述语言（JSON、HTML、XAML、SQL、CSS）、编程语言（C、C++、JAVA、JS）
  表达方式：声明式语言（只告诉结果是怎么样的 JSON、HTML、XAML、SQL、CSS）、命令型语言（达成这个结果，每个步骤是怎么样的 C、C++、JAVA、JS）
# 编程语言的性质
  ## 图灵完备性
  + 图灵完备性
    所有的可计算的问题都可用来描述的，这样的语言就是具备图灵完备性的。
    - 命令式————图灵机
      - goto
      - if 和 while
    - 声明式————lambda
      - 递归
  ## 动态与静态
  + 动态
    - 在用户的设备/在线服务器上
    - 产品实际运行时
    - Runtime
  + 静态
    - 在程序员的设备上
    - 产品开发时
    - Compiletime
  ## 类型系统
  + 动态类型系统与静态类型系统
  + 强类型与弱类型
    - String + Number
    - String == Boolean
  + 复合类型
    - 结构体
    - 函数签名
  + 子类型
  + 泛型
    - 逆变/协变
  ## 一般命令式编程语言
  + Atom（原子级）
    - Identifier
    - Literal 
  + Expression
    - Atom
    - Operator
    - Punctuator
  + Statement
    - Expression
    - Keyword
    - Punctuator
  + Structure
    - Function
    - Class
    - Process
    - NameSpace
  + Program
    - Progranm
    - Module
    - Package
    - Library
# 语言类型
  js中的Atom
  Grammer：Literal、Variable、Keywords、Whitespace、Line Terminal
  Runtime：Types、Execution Context
  js的七种类型：Number、String、Boolean、Object、Null、Undefined、Symbol
  ## Number
  双精度浮点类型（Double Float）
    Float: 浮点数，把一个数字拆成它的指数和有效位数，有效位数决定了浮点数表示的精度，指数决定了浮点数表示的范围。
    IEEE754的双精度浮点数表示是1个符号位+11个指数位+52个精度位。每一个位是一个bit（0或1）。 
  ## String
  + Character
  + Code Point
  + Encoding
  编码方式：ASCII、Unicode、UCS、GB（GB2312、GBK(GB13000)、GB18030）、ISO-8859、BIG5
  Encoding：
    UTF
    UTF8 默认用一个字节表示一个字符
    UTF16 用两个字节表示一个字符
    在UTF8中，如果一个字节表示不了该字符，将会联合多个一起表示，比如 一 
    UTF8中表示 11100100 10111000 10000000 前四位表示要占几个字节，这个表示要占3个字节，后面两个字节将以10开头，所有有效位数就是 4+6+6
    UTF16表示  01001110 00000000
  ## Boolean
    true、false
  ## Null & Undefined
    Null 是关键字，Undefined只是全局变量
    一般使用 void 0 来获取undefined值来表示undefined
  ## Object
    任何一个对象都是唯一的，与它本身的状态无关。即使状态完全一致的两个对象，也并不相等。
    我们使用状态来描述行为，状态的改变即是行为。
    对象三要素： state、identifier、behavior
    


  

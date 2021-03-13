# 使用LL算法构建AST | 四则运算
## 概念
  AST：抽象语法树
  代码在计算机的分析过程中，
    1. 首先是把编程语言去分词
    2. 在分词后将词构成层层相嵌套的语法树的树形结构
    3. 下一步是如何去解析我们的代码去执行。
  构建AST抽象语法树的过程又被叫做语法分析。
  最著名的语法分析算法，核心思想有两种，LL算法和LR算法。（L：left的缩写，LL算法：Left Left，从左到右扫描，从左到右规约的一个缩写）
## 四则运算
### 词法定义
  * TokenNumber
    1 2 3 4 5 6 7 8 9 0 的组合
  * Operator
    +、-、*、/ 之一
  * Whitespace
    <SP>
  * LineTerminator
    <LF> <CR>
  案例：四则运算的分析，四则运算：Number，加减两种运算符以及我们允许编程语言的使用者添加一些格式化字符（eg：空格、换行等，我们需要无视掉），有意义的输入元素（可以称为token）只有两种，Number和Operator（运算符），四则运算就是由这两种运算符决定的。

### 语法定义
    <Expression>::=
      <AdditiveExpression><u><EOF></u>
    
    <AdditiveExpression>::=
      <MultiplicativeExpression>
      |<AdditiveExpression><u><+></u><MultiplicativeExpression>
      |<AdditiveExpression><u><-></u><MultiplicativeExpression>

    <MultiplicativeExpression>::=
      <u><Number></u>
      |<MultiplicativeExpression><u><*><Number></u>
      |<MultiplicativeExpression><u></><Number></u>
  
  因为加号和乘号，加法和乘法有一个优先级的关系，所以我们需要用在js部分的产生式去定义它的加法和乘法运算，所以我们需要把加减乘除做成一个嵌套的结构，可以认为加法是由左右两个乘法组成的，并且加法还是可以连加的，所以加法应该是一个重复自身的序列（会有一个递归的产生式的结构，也是我们在做产生式时处理无限的列表的时候的常用手法）。
  #### MultiplicativeExpression 乘法运算
    定义：用乘号或者除号相连接的Number的序列
    用递归的思想定义：规定它可以是一个单独的Number，也可以是一个乘法表达式后边加上乘号，再加上一个Number.
    其中u里面的部分为定义里面的终结符（TerminalSymbol），即直接从词法里面扫描出来的,其余为NoneTerminalSymbol 非终结符（就是拿终结符的组合定义出来的） 

    定义乘法表达式的非终结符：它可以是一个单独的Number，也可以是它自身加上一个乘号然后再加上一个Number，也可以是除号加上一个Number，遇到这样的结构就可以认为是一个乘法表达式了。

    加法的结构：跟乘法类似，只不过它的基本单元换成了一个非终结符Multiplicative ，就是数个乘法用加号或者减号连接在一起。
    所以我们可以认为，整体的一个我们能处理的表达式Expression就是一个加法表达式。

    后面我们引入了一个特殊的符号 EOF（End of File ，不是一个真实可见的字符但因为语法需要一个终结，EOF：用来标识所有的源代码的结束）
    单独的数字也认为是特殊的乘法，一个只有一项的乘法，只有乘号的认为是一种特殊的加法，只有一项的加法。这样比较方便我们去递归的定义整个的表达式 
  
  #### LL语法分析
  <AdditiveExpression>::=
      <MultiplicativeExpression>
      |<AdditiveExpression><+><MultiplicativeExpression>
      |<AdditiveExpression><-><MultiplicativeExpression>

  以加法表达式为例，我们总是从输入的一个序列里面，去看它当前我们能够拿到什么东西，在我们前面的这三条产生式的规则里面，我们发现 AdditiveExpression，如果我们在做一个策划分析，然后我们在处理一个AdditiveExpression，AdditiveExpression它找到的第一个符号symbol ，我们从产生式里可以看到，它可能会面临着两种情况
  1. 开头是一个MultiplicativeExpression 2. 为AdditiveExpression 不过不是只有这两种情况，因为一个乘法表达式很可能当前是一个还未解析的状态，所以我们需要把乘法展开

  <AdditiveExpression>::=
      <Number>
      |<MultiplicativeExpression><*><Number>
      |<MultiplicativeExpression></><Number>
      |<AdditiveExpression><+><MultiplicativeExpression>
      |<AdditiveExpression><-><MultiplicativeExpression>

  乘法的表达式可能是 Number、MultiplicativeExpression、AdditiveExpression等一系列这样的可能性，所以其实第一种符号有三种可能性
  如果我们遇到了Number、或者MultiplicativeExpression，是不是应该直接当做乘法去处理呢？只看一个字符是不够的，需要看它第二个输入的元素是乘号除号，还是加号减号，因为原来的MultiplicativeExpression还是在的。所以我们这样就可以得到一个从左到右扫描从左到右归并的语法分析的算法，即LL语法分析。


# 相关知识点
  ## regExp.Exec()
  


  

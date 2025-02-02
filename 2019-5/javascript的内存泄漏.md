# javascript的内存泄漏

对于JavaScript这门语言的使用者来说，大多数的使用者的内存管理意识都不强。因为JavaScript一直以来都只作为在网页上使用的脚本语言，而网页往往都不会长时间的运行，所以使用者对JavaScript的运行时长和内存控制都比较漠视。但随着Spa（单页应用）、node.js服务端程序和各种js工具的诞生，我们需要重新重视JavaScript的内存管理。

## 内存泄漏的定义

> 指由于疏忽或错误造成程序未能释放已经不再使用的内存的情况。内存泄漏并非指内存在物理上的消失，而是应用程序分配某段内存后，由于设计错误，失去了对该段内存的控制，因而造成了内存的浪费。

## JavaScript的内存管理

首先JavaScript是一个有Garbage Collection 的语言，也就是我们不需要手动的回收内存。不同的JavaScript引擎有不同的垃圾回收机制，这里我们主要以V8这个被广泛使用的JavaScript引擎为主。

### JavaScript内存分配和回收的关键词：GC根、作用域

GC根：一般指全局且不会被垃圾回收的对象，比如：window、document或者是页面上存在的dom元素。JavaScript的垃圾回收算法会判断某块对象内存是否是GC根可达（存在一条由GC根对象到该对象的引用），如果不是那这块内存将会被标记回收。

作用域：在JavaScript的作用域里，我们能够新建对象来分配内存。比如说调用函数，函数执行的过程中就会创建一块作用域，如果是创建的是作用域内的局部对象，当作用域运行结束后，所有的局部对象（GC根无法触及）都会被标记回收，在JavaScript中能引起作用域分配的有函数调用、with和全局作用域。

### 作用域的分类：局部作用域、全局作用域、闭包作用域

#### 局部作用域

函数调用会创建局部作用域，在局部作用域中的新建的对象，如果函数运行结束后，该对象没有作用域外部的引用，那该对象将会标记回收

#### 全局作用域

每个JavaScript进程都会有一个全局作用域，全局作用域上的引用的对象都是常驻内存的，直到进程退出内存才会自动释放。
手动释放全局作用域上的引用的对象有两种方式：

- global.foo = undefined

> 重新赋值改变引用

- delete global.foo

> 删除对象属性

#### 闭包作用域

在JavaScript语言中有闭包的概念,闭包指的是包含自由变量的代码块、自由变量不是在这个代码块内或者任何全局上下文中定义的，而是在定义代码块的环境中定义（局部变量）。

```js
var closure = (function(){
    //这里是闭包的作用域
    var i = 0 // i就是自由变量
    return function（）{
        console.log(i++)
    }
})()
// this closure is bug; (can't console)
```

闭包作用域会保持对自由变量的引用。上面代码的引用链就是:

```
window -> closure -> i
```

闭包作用域还有一个重要的概念，闭包对象是当前作用域中的所有内部函数作用域共享的，并且这个当前作用域的闭包对象中除了包含一条指向上一层作用域闭包对象的引用外，其余的存储的变量引用一定是当前作用域中的所有内部函数作用域中使用到的变量

## 常见的几种内存泄漏的方式及使用chrome dev tools的排查方法

#### 用全局变量缓存数据

将全局变量作为缓存数据的一种方式，将之后要用到的数据都挂载到全局变量上，用完之后也不手动释放内存（因为全局变量引用的对象，垃圾回收机制不会自动回收），全局变量逐渐就积累了一些不用的对象，导致内存泄漏.

如果在使用另一个组件的API(rich-markdown-editor)并将这部分API绑定到window上面，那么销毁这个组件时需要解除window上面的全局变量。

```js
var x = [];
function createSomeNodes() {
  var div;
  var frag = document.createDocumentFragment();
  for (var i = 10000; i > 0; i--) {
    div = document.createElement("div");
    div.appendChild(document.createTextNode(i + " - " + new Date().toTimeString()));
    frag.appendChild(div);
  }
  document.getElementById("nodes").appendChild(frag);
}
function grow() {
  x.push(new Array(1000000).join('x'));
  createSomeNodes();
  setTimeout(grow, 1000);
}
grow();
```

上面的代码贴一张 timeline的截图
![图片描述](https://segmentfault.com/img/bVLvWb?w=1374&h=433)
主要看memory区域，通过分析代码我们可以知道页面上的dom节点是不断增加的，所以memory里绿色的线（代表dom nodes）也是不断升高的；而代表js heap的蓝色的线是有升有降，当整体趋势是逐渐升高，这是因为js 有内存回收机制，每当内存回收的时候蓝色的线就会下降，但是存在部分内存一直得不到释放，所以蓝色的线逐渐升高

#### js错误引用DOM元素

```js
var nodes = '';
(function () {
  var item = {
    name:new Array(1000000).join('x')
  }
  nodes = document.getElementById("nodes")
  nodes.item = item
  nodes.parentElement.removeChild(nodes)
})()
```

这里的dom元素虽然已经从页面上移除了，但是js中仍然保存这对该dom元素的引用。
因为这段代码是只执行一次的，所以用timeline视图会很难分析出来是否存在内存泄漏，所以我们可以用 chrome dev tool 的 profile tab里的heap snapshot 工具来分析。
上面的代码贴一张 heap snapshot 的summary模式的截图
![clipboard.png](https://segmentfault.com/img/bVLvVx?w=1431&h=266)

通过constructor的filter功能，我们把上面代码中创建的长字符串找出来，可以看到代码运行结束后，内存中的长字符串依然没有被垃圾回收掉。
顺带提一下的是右边红框里的shadow size和 retainer size的含义

- shadow size 指的是对象本地的大小
- retainer size 指的是对象所引用内存的大小，回收该对象是会将他引用的内存也一并回收，所以retainer size 指代的是回收内存后会释放出来的内存大小

上面我们可以看到 长字符串本身的shadow size和retainer size是一样大的，这是引用长字符串没有引用其他的对象，如果有引用其他对象，那shadow size 和retainer size将不一致。

#### 闭包循环引用

```js
(function(){
    var theThing = null
    var replaceThing = function () {
        var originalThing = theThing
        var unused = function () {
            if (originalThing)
                console.log("hi")
        }
        theThing = {
            longStr: new Array(1000000).join('*'),
            someMethod: function someMethod() {
                console.log('someMessage')
            }
        };
    };
    setInterval(replaceThing,100)
})()
```

首先我们明确一下，unused是一个闭包，因为它引用了自由变量 originalThing，虽然它被没有使用，但v8引擎并不会把它优化掉，因为 JavaScript里存在eval函数，所以v8引擎并不会随便优化掉暂时没有使用的函数。

theThing 引用了someMethod，someMethod这个函数作用域隐式的和unused这个闭包共享一个闭包上下文。所以someMethod也引用了originalThing这个自由变量。

这里面的引用链是：

```
GCHandler -> replaceThing -> theThing -> someMethod -> originalThing -> someMethod(old) -> originalThing(older)-> someMethod(older)
```

随着setInterval的不断执行，这条引用链是不会断的，所以内存会不断泄漏，直致程序崩溃。
因为是闭包作用域引起的内存泄漏，这时候最好的选择是使用 chrome的heap snapshot的container视图，我们通过container视图能清楚的看到这条不断泄漏内存的引用链
![clipboard.png](https://segmentfault.com/img/bVLvU6?w=1435&h=624)

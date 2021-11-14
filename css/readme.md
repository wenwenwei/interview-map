# CSS面试题

## 一、元素属性
### css的3大特性是什么？什么是css继承？
* 三大特性：`继承、层叠、优先级`
  * **优先级：** 不同样式之间的权重比较
  * **层叠：** 当权重相当时，使用层叠（后者覆盖前者）样式
  * 继承
  
  
  
  #### 继承
  
  * 定义：<u>继承是一种规则，允许样式不仅仅应用于指定元素，也可以还可以应用于其后代元素</u>
  * 应用： <u>给根元素设置一些属性（例如：font-size、font-family、color等样式），全站的元素都会继承此样式</u>

### css的优先级（权重）是什么样的？
* 单表优先级
**权重从高到低：** `!important` > `id选择器` > `class选择器` || `属性选择器` > `标签选择器` > `通配符` > `继承` > `默认样式`

* 位置优先级
**权重从高到低：** `內联样式` > `行间样式` > `外部样式表` > `@import`

### 伪类和伪元素的区别？
伪类是选择器，具有选择器的特性；伪元素是元素，具有元素的特性；

### `position`拥有哪些值？它们之间的定位基准分别是什么？有何影响？
1. `position`的取值有：`static<default> | relative | absolute | fixed | sticky`

2. 区别
* `static<default>`：元素使用正常文档流布局，此时的`top|right|bottom|left|z-index`无效

* `relative`（相对定位）：基于自身，在不影响其它元素情况下偏移

* `absolute`（绝对定位）：基于父级具有`relative`（或相对于ICB（inital container block, 初始包含块））偏移，脱离文档流

* `fixed`（固定定位）：基于viewport视口（）可视适口偏移，脱离文档流；当祖先元素的`transform｜filter｜perspective`不为`none`时，基于最近祖先定位

* `sticky`（粘性定位）：元素根据正常文档流布局，再基于最近滚动祖先和块级祖先偏移
`粘性定位`可以理解为是固定定位和相对定位的结合，固定定位基于最近祖先滚动元素偏移、相对定位基于最近块级祖先元素；固定定位只在最近块级祖先元素范围内生效

### 如何设置盒子模型？它们有什么区别？
1. `box-sizing`的取值有：`content-box<default> | border-box`
2. `content-box`的width = contentWidth；`border-box`的width = content + padding + border



### 使用trasform属性，先平移后旋转和先旋转后平移有区别吗？
有区别，旋转之后会修改平移坐标轴的方向



### 使用transform和绝对定位移动元素，有何不同？



### css动画如何使用？动画如何加速？



### BEM是什么？



### margin的百分比的基准是什么？负margin原理是什么？有什么作用？

#### 1. margin的百分比基于最近块状祖先元素



#### 2. margin具有如下特性：

* margin作用于元素不会脱离文档流
* 堆叠：使用负margin可以使元素堆叠，但是仅限从`下->上`、从`右->左`边堆叠
* 不定宽：会使元素伸张/收缩宽度或高度
* 定宽：会使元素在文档流中的位置基于当前位置偏移



#### 3.应用：

* 圣杯、双飞翼布局
* 将元素拉回上一行
* 制作堆叠效果



### BFC是什么？有什么用？怎么使用？

块格式化上下文(Block Formatting Context, BFC)是web页面可视css渲染的一部分，是块盒子布局过程中发生的区域，也是浮动元素与其它元素交互的区域。



#### 可以解决什么问题？

1. margin重叠问题
2. 浮动导致的背景覆盖、容器高度丢失问题



#### 创建BFC

1. html根元素
2. display：inline-block | flow-root
3 overflow不为visible
4. 浮动元素（float不为none）
5. 绝对定位、固定定位
6. 表格布局（table、table-cell...）
7. flex布局
8. grid布局
9. 多列布局

## 二、布局

### css布局概括

#### 布局分类

1. 传统布局方案：基于盒子模型，依赖`display`、浮动、定位
2. 表格布局
3. flex布局
4. 网格布局
5. 多列布局（下面方案中忽略）



### 2栏布局，左侧固定，右侧自适应

> 本题解析思路：

2栏布局本质上还是将2元素展示到一行，目前的5种布局方案中，具有这一功能的有：

* 传统布局: 
  * `calc() + inline-block/float/table`
  * 浮动: `BFC`、`margin-left`
  * 定位：`margin-left`
* 表格布局：`table + table-cell`
* flex布局：`flex: 1`
* grid布局: `grid-template-row: 300px auto;`



html代码结构：
```html
<div class="container">
  <div class="left">left</div>
  <div class="right">right</div>
</div>
```





#### 1. ` calc() + inline-block`

```css
.container {
  font-size: 0;
}

.left,
.right {
  display: inline-block;
  font-size: 16px;
  vertical-align: top;
}

.left {
  width: 300px;
  background-color: pink;
}

.right {
  width: calc(100% - 300px);
  background-color: #eaeaea;
}
```

* **缺点1：** 需要将容器font-size设置为0





#### 2. `float + BFC`（左侧可自适应宽）

```css
.container {
  overflow: hidden;
}
.left {
  width: 300px;
  float: left;
  background-color: pink;
}
.right {
  /* 利用BFC清楚因为float造成的覆盖区域 */
  overflow: hidden;
  background-color: #eaeaea;
}
```
**提示：** 容器需要大于左侧的固定宽度，否则左侧无法展示

#### 3. `float + margin-left`，左侧宽度固定

```css
.container {
  overflow: hidden;
}
.left {
  width: 300px;
  float: left;
  background-color: pink;
}
.right {
  margin-left: 300px;
  background-color: #eaeaea;
}
```



#### 4. `绝对定位 + margin-left`

```css
.container {
  position: relative;
}

.left {
  position: absolute;
  left: 0;
  top: 0;
  width: 300px;
  background-color: pink;
}

.right {
  margin-left: 300px;
  background-color: #eaeaea;
}
```
* **缺点：** 
  * 当左侧高度大于右侧高度时，内容会超出容器
  **解决：** 通过js同步左右内容



#### 5. `table + table-cell（表格布局）`

```css
.container {
  width: 100%;
  display: table;
}

.left,
.right {
  display: table-cell;
}

.left {
  width: 300px;
  background-color: pink;
}

.right {
  background-color: #eaeaea;
}
```



#### 6. `flex布局`



```css
.container {
  display: flex;
}

.left {
  width: 300px;
  background-color: pink;
}

.right {
  flex: 1;
  background-color: #eaeaea;
}
```
* **缺点：**低版本不支持



#### 7. `grid（网格布局）` 

```css
.container {
  display: grid;
  grid-template-columns: 300px auto;
  height: 200px;
  border: 1px solid #000;
}

.left {
  background-color: pink;
}

.right {
  background-color: #eaeaea;
}
```



### 3栏布局，2侧定宽，中间自适应切优先加载

#### 解法目录

> 1. 传统布局方案
>    1. calc() * 1
>    2. 浮动 * 1
>    3. 定位 * 2 (margin、全定位)
>    4. 浮动 + 定位: 圣杯布局
>    5. 浮动 + dom元素: 双飞翼
> 2. 表格布局
> 3. flex布局
> 4. grid布局



#### （3种）优先加载中间

> * 定位 + margin
>
> * 圣杯
> * 双飞翼



#### （5种）不优先加载中间

> * Scale()
> * 浮动
> * 表格布局
> * flex布局
> * grid布局



#### 1. `calc() + inline-block`（中不优先加载）

```html
  <style>
    .container {
      font-size: 0;
      height: 200px;
    }

    .left, .main, .right {
      display: inline-block;
      height: 100%;
      font-size: 16px;
    }

    .left {
      width: 200px;
      background-color: pink;
    }

    .right {
      width: 100px;
      background-color: green;
    }

    .main {
      width: calc(100% - 300px);
      background-color: #eaeaea;
    }
  </style>

  <div class="container">
    <div class="left">left</div>
    <div class="main">main</div>
    <div class="right">right</div>
  </div>
```



#### 2. 浮动（中不优先加载）

```html
  <style>
    .container {
      font-size: 0;
      height: 200px;
    }

    .left,
    .main,
    .right {
      height: 100%;
    }

    .left {
      float: left;
      width: 200px;
      background-color: pink;
    }

    .right {
      float: right;
      width: 100px;
      background-color: green;
    }

    .main {
      background-color: #eaeaea;
    }
  </style>

  <div class="container">
    <div class="left">left</div>
    <div class="right">right</div>
    <div class="main">main</div>
  </div>
```



#### 3. 绝对定位 + margin / 全定位

> Tips: 此方案只实现了 绝对定位 + margin

```html
  <style>
    .container {
      position: relative;
      height: 200px;
    }

    .left,
    .main,
    .right {
      height: 100%;
    }

    .left {
      position: absolute;
      top: 0;
      left: 0;
      width: 200px;
      background-color: pink;
    }

    .right {
      position: absolute;
      top: 0;
      right: 0;
      width: 100px;
      background-color: green;
    }

    .main {
      margin-left: 200px;
      margin-right: 100px;
      background-color: #eaeaea;
    }
  </style>

  <div class="container">
    <div class="main">main</div>
    <div class="left">left</div>
    <div class="right">right</div>
  </div>
```



#### 4. 绝对定位+浮动：圣杯布局

```html
  <style>
    .container {
      position: relative;
      height: 200px;
      padding-left: 200px;
      padding-right: 100px;
    }

    .left,
    .main,
    .right {
      height: 100%;
      position: relative;
      float: left;
    }

    .left {
      width: 200px;
      background-color: pink;
      margin-left: -100%;
      left: -200px;
    }

    .right {
      width: 100px;
      background-color: green;
      margin-left: -100px;
      right: -100px;
    }

    .main {
      width: 100%;
      background-color: #eaeaea;
    }
  </style>

  <div class="container">
    <div class="main">main</div>
    <div class="left">left</div>
    <div class="right">right</div>
  </div>
```

**缺点**

left元素`margin-left: -100%;`值是基于main元素的内容宽度，当main的width < left的width时，圣杯就会破裂；



#### 5. 浮动 + 多1层html：双飞翼布局

```html
  <style>
    .container {
      height: 200px;
    }

    .container::after {
      content: '';
      display: block;
      clear: both;
    }

    .main {
      height: 100%;
    }

    .left,
    .main-wrap,
    .right {
      height: 100%;
      float: left;
    }

    .left {
      width: 200px;
      background-color: pink;
      margin-left: -100%;
    }

    .right {
      width: 100px;
      background-color: green;
      margin-left: -100px;
    }

    .main-wrap {
      width: 100%;
      background-color: red;
    }

    .main {
      margin-left: 200px;
      margin-right: 100px;
      background-color: #eaeaea;
    }
  </style>

  <div class="container">
    <div class="main-wrap">
      <div class="main">main</div>
    </div>
    <div class="left">left</div>
    <div class="right">right</div>
  </div>
```



#### 双飞翼和圣杯的区别

* 布局区别：
  * 双飞翼：浮动 + 多一层html代码、但是稳定
  * 圣杯：浮动 + 相对定位

* 双飞翼：通用性强；增加了1层dom渲染
* 圣杯：稳定性差点，但是少了1层dom渲染

#### 6. 表格布局(中不优先加载)

```html
  <style>
    .container {
      width: 100%;
      height: 200px;
      display: table;
    }

    .left,
    .main,
    .right {
      display: table-cell;
      height: 100%;
    }

    .left {
      width: 200px;
      background-color: pink;
    }

    .right {
      width: 100px;
      background-color: green;
    }

    .main {
      background-color: #eaeaea;
    }
  </style>

  <div class="container">
    <div class="left">left</div>
    <div class="main">main</div>
    <div class="right">right</div>
  </div>
```



#### 7. flex布局(中不优先加载)

```html
  <style>
    .container {
      display: flex;
      height: 200px;
    }

    .left,
    .main,
    .right {
      height: 100%;
    }

    .left {
      order: 1;
      width: 200px;
      background-color: pink;
    }

    .right {
      order: 3;
      width: 100px;
      background-color: green;
    }

    .main {
      order: 2;
      flex: 1;
      background-color: #eaeaea;
    }
  </style>

  <div class="container">
    <div class="main">main</div>
    <div class="left">left</div>
    <div class="right">right</div>
  </div>
```



#### 8. grid布局（中不优先加载）

```html
  <style>
    .container {
      display: grid;
      grid-template-columns: 200px auto 100px;
      grid-auto-flow: column;
      height: 200px;
    }

    .left,
    .main,
    .right {
      height: 100%;
    }

    .left {
      background-color: pink;
    }

    .right {
      background-color: green;
    }

    .main {
      background-color: #eaeaea;
    }
  </style>

  <div class="container">
    <div class="left">left</div>
    <div class="main">main</div>
    <div class="right">right</div>
  </div>
```





### 元素水平垂直居中有哪些方式？

> 本题思路：

通过5种布局来看：

* inline-block * 1 + 定位 * 3
* 表格布局：table-cell * 1
* flex布局 * 2
* grid布局 * 2



#### 参考文章

[面试官：你能实现多少种水平垂直居中的布局（定宽高和不定宽高） - 掘金 (juejin.cn)](https://juejin.cn/post/6844903982960214029#heading-21)



**定宽高方案：**

>  因为不定宽高一定可以实现定宽高方案，所以这里列出的定宽高方案不会与它重复；即不能实现不定宽高剧中



#### （7种）不定宽高方法目录

> [目录]
>
> 	1. `inline-block + 伪元素`
> 	1. `绝对定位 + transform`
> 	1. flex布局
> 	1. flex布局：`flex + margin:auto`
> 	1. grid布局: `flex`
> 	1. grid布局：`grid + margin:auto`
> 	1. table-cell布局



#### （2种）定宽高方法目录

> [目录]
>
> 1. `绝对定位0 + margin: auto`
> 2. `绝对定位50% + 负margin`



**通用html结构**

```html
<style>
  /*基础样式 */
    .container {
      width: 200px;
      height: 200px;
      border: 1px solid #000;
    }

    .box {
      background-color: pink;
    }
</style>
<div class="container">
  <div class="box">box</div>
</div>
```



#### 1. `inline-block` + 伪元素(不定)

```css
.container {
  font-size: 0;
  text-align: center;
}

.container::after {
  content: '';
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}

.box {
  font-size: 16px;
  display: inline-block;
  vertical-align: middle;
}
```



#### 2.1 绝对定位0 + margin auto（定）

```css
.container {
  position: relative;
}

.box {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
```

#### 2.2 绝对定位50% + margin-width/height一半（定）

```css
.container {
  position: relative;
}

.box {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -50px;
  margin-top: -50px;
}
```



#### 2.3 绝对定位50% + transform(不定)

```css
.container {
  position: relative;
}

.box {
  position: absolute;
  top: 50%;
  left: 50%;
	transform: translate(-50%, -50%);
}
```



#### 3.1 flex布局(不定)

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```



#### 3.2 flex布局变异: `flex + margin:auto`（不定）

```css
.container {
  display: flex;
}
.box {
  margin: auto;
}
```





#### 4.1 grid布局：`grid + flex`(不定)

```css
.container {
  display: grid;
}
.box {
  justify-self: center;
  align-self: center;
}
```



#### 4.2 grid布局：`grid + margin: auto`（不定）

```css
    .container {
      display: grid;
    }

    .box {
      margin: auto;
    }
```

#### 5. table-cell(不定)

```css
.container {
  /* width无法使用100% */
  width: 200px;
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}

.box {
  display: inline-block;
}
```

**缺点：** 容器需要定宽



## 三、适配

### 自适应有哪些方式？
`百分比、rem、vw/vh、媒体查询`
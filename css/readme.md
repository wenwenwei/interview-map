# CSS面试题

## 一、元素属性
### 1. css的3大特性是什么？什么是css继承？
* 三大特性：`继承、层叠、优先级`
  * **优先级：** 不同样式之间的权重比较
  * **层叠：** 当权重相当时，使用层叠（后者覆盖前者）样式
* **继承**
  * 定义：<u>继承是一种规则，允许样式不仅仅应用于指定元素，也可以还可以应用于其后代元素</u>
  * 应用： <u>给根元素设置一些属性（例如：font-size、font-family、color等样式），全站的元素都会继承此样式</u>

### 2. css的优先级（权重）是什么样的？
* 单表优先级
**权重从高到低：** `!important` > `id选择器` > `class选择器` || `属性选择器` > `标签选择器` > `通配符` > `继承` > `默认样式`

* 位置优先级
**权重从高到低：** `內联样式` > `行间样式` > `外部样式表` > `@import`

### 3. 伪类和伪元素的区别？
伪类是选择器，具有选择器的特性；伪元素是元素，具有元素的特性；

### 4. `position`拥有哪些值？它们之间的定位基准分别是什么？有何影响？
1. `position`的取值有：`static<default> | relative | absolute | fixed | sticky`

2. 区别
* `static<default>`：元素使用正常文档流布局，此时的`top|right|bottom|left|z-index`无效

* `relative`（相对定位）：基于自身，在不影响其它元素情况下偏移

* `absolute`（绝对定位）：基于父级具有`relative`（或相对于ICB（inital container block, 初始包含块））偏移，脱离文档流

* `fixed`（固定定位）：基于viewport视口（）可视适口偏移，脱离文档流；当祖先元素的`transform｜filter｜perspective`不为`none`时，基于最近祖先定位

* `sticky`（粘性定位）：元素根据正常文档流布局，再基于最近滚动祖先和块级祖先偏移
`粘性定位`可以理解为是固定定位和相对定位的结合，固定定位基于最近祖先滚动元素偏移、相对定位基于最近块级祖先元素；固定定位只在最近块级祖先元素范围内生效

### 4. 如何设置盒子模型？它们有什么区别？
1. `box-sizing`的取值有：`content-box<default> | border-box`
2. `content-box`的width = contentWidth；`border-box`的width = content + padding + border

### 5. 使用trasform属性，先平移后旋转和先旋转后平移有区别吗？为什么？
1. 有区别
2. 旋转之后会修改平移坐标轴的方向

### 6. 移动端0.5像素的实现
使用scale(0.5)

### 7. css动画


### 8. BEM是什么？

### 9. margin的百分比相对于谁？相对于谁定位？会引起什么问题？

### 10. 动画如何加速？

### 11. BFC是什么？有什么用？怎么使用？

块格式化上下文(Block Formatting Context, BFC)是web页面可视css渲染的一部分，是块盒子布局过程中发生的区域，也是浮动元素与其它元素交互的区域。

* 可以解决什么问题？
  1. margin重叠问题
  2. 浮动导致的背景覆盖、容器高度丢失问题

* **创建BFC**
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
### 1. 左侧固定，右侧自适应有几种方案？各有什么优缺点？
html代码结构：
```html
<div class="container">
  <div class="left">left</div>
  <div class="right">right</div>
</div>
```

1. `float + BFC`（左侧可实现自适应宽度）
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

2. `float + margin-left`，左侧宽度固定
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

3. `绝对定位 + margin-left`
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

4. `inline-block + calc()`
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

5. `table-cell（表格布局）`
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

6. `flex布局`
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

7. `grid（网格布局）` 【未能实现左侧固定宽度，右侧自适应】
```css

```

### 2. 2侧固宽，中间自适应有几种方案？各有什么优缺点？


### 3. 元素水平垂直居中有几种方式？
* 6种方式
* 具体实现
  1. inline-block + 伪元素
  2. flex布局
  3. 绝对定位50% + margin-width/height一半（宽高可知知）
  4. 绝对定位0 + margin auto
  5. 绝对定位50% + transform
  6. grid布局

### 三、适配
### 1. 自适应有哪些方式？
`百分比、rem、vw/vh、媒体查询`

### 四、css布局分类
1. 基本文档流：浮动 + 定位
2. 表格布局
3. flex布局
4. 网格布局
5. 分类布局
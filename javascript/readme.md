# ECMAScript



### 遍历



#### `forEach`和`map`有什么区别？

* **`forEach`**
  * 中止：不能使用`break | continue`跳出循环，`return`跳出函数体
* **`map`**
  * 终止/跳出: `return`可以终止当前循环



* **相同点：**都是针对每个元素执行提供的函数
* 不同点：
  1. 返回值：map有且是一个新数组（由函数提供），forEach没有
  2. 终止loop：map通过return结束此轮；forEach不能终止循环（除非报错）
  3. 性能：map > forEach



#### `for`和`for...in`和`for...of`有什么区别？

* **`for`**
  * 终止/跳出：`return`/`break`可以终止循环；`continue`可以跳过当前循环



## 异步编程



## js算法题

### 数组排序

#### 1.冒泡排序

#### 2.选择排序

#### 3.插入排序

#### 4.合并排序

#### 5.快速排序

#### js `Array.sort()`方法是什么排序？

小于10的数量是**插入排序**，大于10的数量是**快速排序**



#### 参考资料

[排序算法 -- JavaScript 标准参考教程（alpha） (ruanyifeng.com)](https://javascript.ruanyifeng.com/library/sorting.html)

[JS-数组sort方法用的是哪种排序算法 - 简书 (jianshu.com)](https://www.jianshu.com/p/0ddbc3c8f683)



### 数组去重

### 找出字符串出现次数最多的索引和字符

> 方案：
>
> 	1. （2层循环）通过map进行遍历计数，通过循环找出最多的索引和字符
> 	1. （排序+虚幻）先排序，再通过遍历找出最大值
> 	1. （遍历+字符计数）针对一轮循环出现的字符，计算出此字符出现的次数，然后遍历完成所有字符串



```Javascript
let str = 'aadsfasdfasdfkkkkkkkkalsdkfjldsajfljaskljdfladsjdkfjdsajfladsjfkdsjlfjadsjfkljadsklfjadsjfljads;fjlasdjf'

/**
 * 思路：
 *  1. 排序、记录出现次数最多的索引和字符串
 *  2.不排序，通过map记录次数
 */

/**
 * 需要2次遍历
 */
function quik1 (str) {
  let map = new Map()
  for(let i = 0; i < str.length; i++) {
    const value = str[i]
    if (map.has(value)) {
      map.set(value, map.get(value) + 1)
    } else {
      map.set(value, 1)
    }
  }

  let maxS = ''
  let maxN = 0
  for([s, n] of map) {
    if (n > maxN) {
      maxN = n
      maxS = s
    }
  }
  return { maxNum: maxN, maxStr: maxS }
}

/**
 * 需要先排序、再遍历
 */
function quik2 (str) {
  let arr = str.split('').sort()
  let maxNum = 0
  let maxStr = ''
  let num = 1

  arr.map((s, i) => {
    if (s === arr[i + 1]) {
      num += 1
    } else {
      if (num > maxNum) {
        maxNum = num
        maxStr = s
      }
      num = 1
    }
  })

  return { maxNum, maxStr }
}

/**
 * 针对一个字符，一次性累计出现次数；再到下一个
 */
function quik3 (str) {
  let arr = []
  let map = new Map()
  let index = -1
  let j = 0

  for(let i = 0, len = str.length; i < len; i++) {
    const value = str[i]
    if (map.has(value)) {
      continue
    }
    do {
      index = str.indexOf(value, index + 1)
      if (index !== -1) {
        j++
      }
    } while (index !== -1) {
      arr[j] = value
      map.set(value, j)
      j = 0
    } 
  }

  return { maxNum: arr.length - 1, maxStr: arr[arr.length - 1] }
}

console.time('quik1')
console.log(quik1(str))
console.timeEnd('quik1') // 3.470ms

console.time('quik2')
console.log(quik2(str))
console.timeEnd('quik2') // 0.386ms

console.time('quik3')
console.log(quik3(str))
console.timeEnd('quik3') // 0.196ms

```





# 性能

## 网络相关

### dns预解析

对待第三方域名，dns解析也是需要时间的，可以使用dns预解析：

```html
<link rel="dns-prefetch" href="https://www.baidu.com" />
```

或者使用http标头：

```javascript
Link: <https://www.baidu.com>; rel=dns-prefetch
```



### http缓存

缓存对于前端性能优化来说很重要，良好的缓存策略可以降低资源的重复加载，提高网页的整体加载速度。

缓存分为：强缓存和协商缓存



**硬盘缓存(`form disk cache`) 和 内存缓存(`from memory cache`)区别**

`disk`: 磁盘缓存；存储时间长、文件大、速度慢

`memory`:  内存缓存；存储时间短、文件小、速度快



[ 内存缓存(from memory cache)和硬盘缓存(from disk cache) 的区别_ziazan的博客-CSDN博客](https://blog.csdn.net/FengNext/article/details/100172186)



### 使用http/2.0

* 二进制分帧层
* 多路复用
* Header压缩
* 服务端推送



### 预加载

可以用于首屏加载

```html
<link rel="preload" href="http://example.com" />
```





### 预渲染



## 优化渲染过程

### 懒加载



### 懒执行



## 文件优化



## 其它





# 框架



##  VUE

### vue的特点

* 双向数据绑定

  对UI控件实现了双向数据绑定

  * 双向数据绑定原理：数据劫持 + 发布订阅

* 自动化管理dom更新

  通过`virtualDOM` + `diff算法`结合异步更新真是dom来实现自动化管理dom

* 组件化

* 指令



### 从修改model到更新到view内部是如何运作的？







## React



## Angular





# 打包工具



# 浏览器




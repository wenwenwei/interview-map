### 模块化规范

目前模块化规范有：`AMD`、 `CMD`、 `CommonJs`、 `UMD`、 `ES6`

#### 参考文档

[一文彻底搞懂JS前端5大模块化规范及其区别 - Echoyya、 - 博客园 (cnblogs.com)](https://www.cnblogs.com/echoyya/p/14577243.html)

[【前端面试题】10—18道有关模块化开发的面试题(附答案)_前端达人-CSDN博客](https://blog.csdn.net/Ed7zgeE9X/article/details/115257794)



#### CommonJS

`commonjs`是nodejs模块规范，在浏览器的实现是`Browserify`，其特性如下：

* 同步加载模块
* 同样的模块会存在缓存
* 所有代码都运行在模块作用域，不会污染全局作用域



#### AMD（Asynchronous Module Definition）

采用**异步加载**模块。模块的加载不影响后面代码的执行，所有依赖这个模块的语句，都定义在一个回调函数中，等模块加载完成后，这个回调函数才会执行；推崇**依赖前置**

`Require.js`是amd规范最热门的一个实现，其使用如下：

```javascript
require('[jquery, lodash]', function (jquery, lodash) {
  jquery.$post({...})
  lodash.deepClone(obj)
})
```



#### CMD


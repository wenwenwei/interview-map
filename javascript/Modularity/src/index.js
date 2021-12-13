var a = require('./a.js')
console.log(a.age) // 18
a.setAge(19)
console.log(a.age) // 18
a.age = 19
console.log(a.age) // 18
console.log(a.getAge())
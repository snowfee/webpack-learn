// 使用:指定变量的类型，:的前后有没有空格都可以
function sayHello(person) {
    var tom = {
        name: 'Tom',
        age: 25,
        gender: 'male'
    };
    return "Hello, " + person;
}
var user = 'root';
console.log(sayHello(user));

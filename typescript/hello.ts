// 使用:指定变量的类型，:的前后有没有空格都可以
function sayHello(person: string) {
  interface Person {
    name: string;
    age?: number;
    [propName: string]: any;
  }

  let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
  };
  return `Hello, ${person}`;
}

let user = 'root';
console.log(sayHello(user));
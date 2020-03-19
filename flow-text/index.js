/*@flow*/ //说明该文件是需要flow进行检查
// 类型推断 =》 报错
function split(str) {
  return str.split(' ')
}

split(11)

// 类型推断 =》 不报错，js支持字符串相加
function add (x, y) {
  return x + y
}

add('Hello', 11)

// 类型注释 => 报错
// x为number，y为number，返回值也为number
function add2(x: number, y: number): number{
  return x + y
}

add2('Hello', 11)
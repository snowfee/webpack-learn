/**
 * Created by Administrator on 2017/8/30.
 */
// const greeter = require('./Greeter.js');
// document.querySelector("#root").appendChild(greeter());
import React from 'react'
import {render} from 'react-dom'
import Greeter from './Greeter';
//我们这里例子中用到的webpack只有单一的入口，其它的模块需要通过 import, require, url等与入口文件建立其关联，
// 为了让webpack能找到”main.css“文件，我们把它导入”main.js “中，如下
import './main.css'


render(<Greeter />, document.getElementById('root'));
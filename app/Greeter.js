/**
 * Created by Administrator on 2017/8/30.
 */
// var config = require('./config.json');
// module.exports = function() {
//     var greet = document.createElement('div');
//     greet.textContent = config.greetText;
//     return greet;
// };
import React, {Component} from 'react';
import config from './config.json';
import styles from './Greeter.css'

class Greeter extends Component{
    render() {
        return (
            <div className={styles.root}>
                {config.greeterText}
                <div>test master</div>
                <h3>test</h3>
            </div>
        );
    }
}

export default Greeter;
var config = require('./config.json');
var styles =require('./Greeter.css');
module.exports = function() {
    console.log(styles);
    var greet = document.createElement('div');
    greet.className=styles.root;
    greet.textContent = config.greetText;
    return greet;
}
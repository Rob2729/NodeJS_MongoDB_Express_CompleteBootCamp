// console.log(arguments);
// console.log(require('module').wrapper);

//EXAMPLE OF CALLING MODULE.EXPORTS
//Calling our own module - so we need to start it with './'
//When calling classes, it's good practice to use upper case names (and in this example we are calling calculator)
const C = require('./test-module1');
const calc1 = new C();

console.log(calc1.add(4, 5));



//EXAMPLE OF CALLING EXPORTS 
const calc2 = require('./test-module2');
console.log(calc2.add(6, 10));
const {
    add,
    subtract,
    multiply,
    divide
} = require('./test-module2');

console.log(add(6, 10));


//CACHING
require('./test-module3')();
require('./test-module3')();
require('./test-module3')();
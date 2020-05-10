// class Calculator {
//     add(a, b) {
//         return a + b;
//     }

//     subtract(a, b) {
//         return a - b;
//     }

//     multiply(a, b) {
//         return a * b
//     }

//     divide(a, b) {
//         return a / b;
//     }
// }

//we use module.exports when we want to export one single value - so in this scenario we just want to export the class calculator.
//we can also export the class directly rather than giving it a name
module.exports = class {
    add(a, b) {
        return a + b;
    }

    subtract(a, b) {
        return a - b;
    }

    multiply(a, b) {
        return a * b
    }

    divide(a, b) {
        return a / b;
    }
};
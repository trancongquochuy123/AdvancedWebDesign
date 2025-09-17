
// Trước ES6:
var add1 = function (a, b) {
    return a + b;
};

// ES6 Arrow functionL: gọn hơn
const add2 = (a, b) => a + b;

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const isEvenNumber = a => a % 2 == 0 ? console.log("So Chan") : console.log("So le");

rl.question("Nhập số: ", (input) => {
  const num = parseInt(input);

  isEvenNumber(num)

  rl.close();
});

    
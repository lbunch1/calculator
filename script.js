let rawInput = '';
let inputArray = [];
let num1 = '';
let num2 = '';
let operator = '';
let output = '';
let evaluated = false;
let isFloat = false;
let operandPresent = false;
let repeatEval = false;

const numberButton = document.querySelectorAll("button.num");
const opButton = document.querySelectorAll("button.op");
const displayInput = document.querySelector(".user_input");
const displayOutput = document.querySelector(".calc_output");
const evalButton = document.getElementById("eq");
const acButton = document.getElementById("ac");

evalButton.addEventListener('click', () => {
    evaluate();
    operandPresent = false;
    repeatEval = true;
    })

acButton.addEventListener('click', () => clearCalc())

numberButton.forEach((button) => 
    button.addEventListener('click', () => appendNumber(button.value))
)

opButton.forEach((button) => 
    button.addEventListener('click', () => appendOperand(button.value))
)

window.addEventListener('keydown',handleKeyInput);

function handleKeyInput(e) {
    console.log(e.key);
    if (e.key >= 0 && e.key <= 9 || e.key == '.') appendNumber(e.key);
    if (e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/') appendOperand(e.key);
    if (e.key == 'Escape') clearCalc();
    if (e.key == 'Backspace') deleteNumber();
    if (e.key == '=' || e.key == 'Enter') {
        evaluate();
        operandPresent = false;
        repeatEval = true;
    }
    e.target.blur();
}

const appendNumber = function(number) {
    if (evaluated && !operandPresent) {
        clearCalc();
    }
    if (number == "." && isFloat) return;
    if (number == ".") isFloat = true;
    //if (evaluated && !operandPresent) return;
    rawInput += number;
    displayInput.innerText = rawInput;
}

const appendOperand = function(op) {
    if (operandPresent) {
        repeatEval = false;
        evaluate();
        if (!num2 && evaluated) return;
        rawInput += op;
        displayInput.innerText = rawInput;
        operandPresent = true;
        return;
    }
    operandPresent = true;
    isFloat = false;
    rawInput += op;
    repeatEval = false;
    displayInput.innerText = rawInput;
}

const evaluate = function() {
    if (!repeatEval) {
        inputArray = rawInput.split(/\+|\*|\-|\//g)
        num1 = parseFloat(inputArray[0]);
        num2 = parseFloat(inputArray[1]);
        operator = rawInput.replace(/[0-9]|[.]/g,'');
    }
    if (num2 === '' || !operator) return;
    if (num2 =="0" && operator =="/") {
        alert('WARNING!!! User is attempting to destroy the universe.')
        clearCalc();
        return;
    }
    if (!num2) return;
    switch (operator) {
        case "+":
            output = num1 + num2;
            break;
        case "-":
            output = num1 - num2;
            break;
        case "/":
            output = num1 / num2;
            break;
        case "*":
            output = num1 * num2;
            break;
    }
    displayOutput.innerText = Math.round(output*10000000000000)/10000000000000;
    rawInput = output;
    num1 = output;
    evaluated = true;
    repeatEval = true;
    operandPresent = false;
}

const clearCalc = function() {
    rawInput = '';
    inputArray = [];
    num1 = '';
    num2 = '';
    operator = '';
    output = '';
    isFloat = false;
    operandPresent = false;
    evaluated = false;
    repeatEval = false;
    displayInput.innerText = "0";
    displayOutput.innerText = "0";
}

const deleteNumber = function() {
    if(!rawInput[rawInput.length-1].match(/[0-9]/) && rawInput[rawInput.length-1] != '.') operandPresent = false;
    rawInput = rawInput.slice(0,-1);
    displayInput.innerText = rawInput;
}
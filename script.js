function add(x, y) {
    return (x+y);
}

function subtract(x, y) {
    return (x-y);
}

function multiply(x,y) {
    return (x*y);
}

function divide(x,y) {
    return (x/y);
}

function convertOperator(keyboardOperator) {
    if (keyboardOperator === '+') return '+'
    if (keyboardOperator === '-') return '-'
    if (keyboardOperator === '*') return 'x'
    if (keyboardOperator === '/') return '÷'
}

function operate(operator, a, b) {
    a = parseFloat(a); // Convert to a floating-point number
    b = parseFloat(b); // Convert to a floating-point number

    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case 'x':
            return multiply(a, b);
        case '÷':
            if (b === 0) return null;
            else return divide(a, b);
        default:
            return null;
    }
}


const numberButtons = document.querySelectorAll('.btn-number')
const operatorButtons = document.querySelectorAll('.btn-operator')
const clearButton = document.querySelector('.btn-clear')
const deleteButton = document.querySelector('.btn-delete')
const decimalButton = document.querySelector('.btn-decimal')
let equalsButton = document.querySelector('.btn-equal')
const lastScreen = document.querySelector('.screen-last')
const currentScreen = document.querySelector('.screen-current')

let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let shouldResetScreen = false

numberButtons.forEach((button) =>
button.addEventListener('click', () => appendNumber(button.textContent))
)

operatorButtons.forEach((button) =>
button.addEventListener('click', () => setOperation(button.textContent))
)

window.addEventListener('keydown', handleKeyboardInput)
equalsButton.addEventListener('click', evaluate)
clearButton.addEventListener('click', clear)
deleteButton.addEventListener('click', deleteNumber)
decimalButton.addEventListener('click', appendDecimal)

function appendNumber(number) {
    if (currentScreen.textContent === '0' || shouldResetScreen){
    resetScreen()
    }
    currentScreen.textContent += number 
}

function resetScreen() {
    currentScreen.textContent = ''
    shouldResetScreen = false
}

function clear() {
    currentScreen.textContent = '0'
    lastScreen.textContent = ''
    firstOperand = ''
    secondOperand = ''
    currentOperation = null
}

function appendDecimal () {
    if (shouldResetScreen) resetScreen()
    if (!currentScreen.textContent.includes('.')) {
        if (currentScreen.textContent === '') currentScreen.textContent = '0';
        currentScreen.textContent += '.';
    }     
}

function deleteNumber() {
currentScreen.textContent = currentScreen.textContent
.toString()
.slice(0, -1)
}

function setOperation(operator) {
    if (currentOperation !== null) evaluate()
    firstOperand = currentScreen.textContent
    currentOperation = operator
    lastScreen.textContent = `${firstOperand} ${currentOperation}`
    shouldResetScreen = true
}

function evaluate() {
    if (currentOperation === null || shouldResetScreen) return;

    if (currentOperation === '÷' && currentScreen.textContent === '0') {
        currentScreen.textContent = 'Error';
        return;
    }

    secondOperand = currentScreen.textContent;

    // Perform the calculation using operate() function
    let result = operate(currentOperation, firstOperand, secondOperand);

    // Check for valid result
    if (result === null || isNaN(result)) {
        alert('Error: Invalid calculation!');
        return;
    }

    // Update the screen with the rounded result
    currentScreen.textContent = roundResult(result);

    // Update the lastScreen with the full expression
    lastScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;

    // Reset the currentOperation and shouldResetScreen
    currentOperation = null;
    shouldResetScreen = true;
}

function roundResult(result) {
    return Math.round(result * 10000) / 10000;
}

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
    if (e.key === '.') appendDecimal()
    if (e.key === '=' || e.key === 'Enter') evaluate()
    if (e.key === 'Delete') deleteNumber()
    if (e.key === 'Escape') clear ()
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
        setOperation(convertOperator(e.key))
}
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

function operate (operator, a, b) {
    a === Number(a)
    b === Number(b)
    switch (operator) {
        case '+':
            return add(a,b);
        case '-':
            return subtract(a, b);
        case 'x':
            return multiply(a, b);
        case '÷':
            if (b === 0) return null
            else return divide(a, b)
    }
}

const numberButtons = document.querySelectorAll('.btn-number')
const operatorButtons = document.querySelectorAll('.btn-operator')
const clearButton = document.getElementsByClassName('.btn-clear')
const deleteButton = document.getElementsByClassName('.btn-delete')
const decimalButton = document.getElementsByClassName('.btn-decimal')
const equalsButton = document.getElementsByClassName('.btn-equal')
const lastScreen = document.getElementsByClassName('.screen-last')
const currentScreen = document.getElementsByClassName('.screen-current')

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
equalsButton.addEventListener('click', eval)
clearButton.addEventListener('click', clear)
deleteButton.addEventListener('click', deleteNumber)
decimalButton.addEventListener('click', appendDecimal)

function appendNumber(number) {
    if (currentScreen.textContent === '0' || shouldResetScreen)
    resetScreen()
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
    if (currentScreen.textContent === '')
        currentScreen.textContent = '0'
}

function deleteNumber() {
currentScreen.textContent = currentScreen.textContent
.toString()
.slice(0, -1)
}

function setOperation(operator) {
    if (currentOperation !== null) eval()
    firstOperand = currentScreen.textContent
    currentOperation = operator
    lastScreen.textContent = `${firstOperand} ${currentOperation}`
    shouldResetScreen = true
}



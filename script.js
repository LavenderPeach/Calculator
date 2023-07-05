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


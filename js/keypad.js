const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

function inputDecimal(dot) {
    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue);

    if (firstOperand == null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;

    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);

        calculator.displayValue = String(result);
        calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
}

function calculate(firstOperand, secondOperand, operator) {
    switch (operator) {
        case '+':
            console.log("+");
            return firstOperand + secondOperand;
            break;
        case '-':
            console.log("-");
            return firstOperand - secondOperand;
            break;
        case '*':
            console.log("*");
            return firstOperand * secondOperand;
            break;
        case '/':
            console.log("/");
            return firstOperand / secondOperand;
            break;

        default:
            return secondOperand;
            break;
    }
}

function updateDisplay() {
    const display = document.querySelector('#price');
    display.textContent = calculator.displayValue;
}

updateDisplay();


const keys = document.querySelectorAll('#key-btn');
keys.forEach(el => {
    el.addEventListener('click', (event) => {
        // Access the clicked element
        const { target } = event;

        // Check if the clicked element is a button.
        // If not, exit from the function
        if (!target.matches('div')) {
            return;
        }

        if (target.classList.contains('operator')) {
            console.log('operator', target.textContent);
            handleOperator(target.textContent);
            updateDisplay();
            return;
        }

        if (target.classList.contains('decimal')) {
            console.log('decimal', target.textContent);
            inputDecimal(target.textContent);
            updateDisplay();
            return;
        }

        if (target.classList.contains('del')) {
            console.log('clear', target.textContent);
            return;
        }

        console.log('digit', target.textContent);
        inputDigit(target.textContent);
        updateDisplay();
    });
});
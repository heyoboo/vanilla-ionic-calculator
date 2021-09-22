const calculator = {
    displayValue: "0",
    firstOperand: null,
    waitingForSecondOperand: false,
    secondInput: false,
    operator: null
};

function countTime(cnt, time) {

    while (cnt < 3) {
        setTimeout(() => {
            console.log(time);
            time++;
        }, cnt * 1000);
        cnt++;
    }

}

function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand, operator } = calculator;




    if (waitingForSecondOperand === true) {

        calculator.secondInput = true;

        calculator.displayValue = digit;

        if (digit || operator) {
            console.log(calculator.secondInput, calculator.operator);
        }
        countTime(0, 1);


        /*
        time = 0
        while time < 3 {
            time++ per second
        }

        if no imput && time exeeds {       // what to represent secondInput?
            calculate()
            waitingForSecondOperand = false
        }
        else {time = 0}
        */


        //**Calculates when presses a number. Returns to first operand and not wait for second operand**
        const result = calculate(calculator.firstOperand, parseFloat(digit), operator
        );

        calculator.displayValue = `${parseFloat(result.toFixed(2))}`;
        calculator.firstOperand = result;

        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue =
            displayValue === "0" ? digit : displayValue + digit;
    }
}

function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand === true) {
        calculator.displayValue = "0.";
        calculator.waitingForSecondOperand = false;
        return;
    }

    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);


    if (operator && calculator.waitingForSecondOperand) {
        calculator.secondInput = true;
        calculator.operator = nextOperator;
        return;
    }

    if (firstOperand == null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        //     const result = calculate(firstOperand, inputValue, operator);
        //     calculator.displayValue = `${parseFloat(result.toFixed(2))}`;
        //     calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
}

function calculate(firstOperand, secondOperand, operator) {
    if (operator === "+") {
        return firstOperand + secondOperand;
    } else if (operator === "-") {
        return firstOperand - secondOperand;
    } else if (operator === "*") {
        return firstOperand * secondOperand;
    } else if (operator === "/") {
        return firstOperand / secondOperand;
    }

    return secondOperand;
}

function backspace() {
    const { firstOperand, displayValue } = calculator;
    const inputValue = displayValue;

    if (calculator.displayValue.length > 1) {
        calculator.displayValue = inputValue.toString().slice(0, -1);
    } else {
        calculator.displayValue = "0";
        calculator.secondOperand = parseFloat(calculator.displayValue);
    }
}

function resetCalculator() {
    calculator.displayValue = "0";
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
}

function updateDisplay() {
    const display = document.querySelector("#price");
    display.textContent = calculator.displayValue;

    // console.log(calculator);
}

updateDisplay();

const keys = document.querySelector(".calculator-keys");
keys.addEventListener("click", (event) => {
    const { target } = event;
    const { value } = target;
    if (!target.matches("button")) {
        return;
    }

    switch (value) {
        case "+":
        case "-":
        case "*":
        case "/":
        case "=":
            handleOperator(value);
            break;
        case ".":
            inputDecimal(value);
            break;
        case "back":
            backspace();
            break;
        case "reset":
            resetCalculator();
            break;
        default:
            if (Number.isInteger(parseFloat(value))) {
                inputDigit(value);
            }
    }

    updateDisplay();
});

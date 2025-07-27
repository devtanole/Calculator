let firstOperand = "";
let secondOperand = "";
let currentOperation = null;
let shouldResetScreen = false;

const $numberButtons = document.querySelectorAll("[data-number]");
const $operationButtons = document.querySelectorAll("[data-operation]");
const $clearButton = document.querySelector(".clear-btn");
const $deleteButton = document.querySelector(".delete-btn");
const $equalButton = document.querySelector(".equals");
const $decimalButton = document.querySelector(".decimal");
const $screenCurrent = document.querySelector(".screen-current");
const $screenLast = document.querySelector(".screen-last");

$numberButtons.forEach((btn) => {
  btn.addEventListener("click", () => appendNumber(btn.textContent));
});

$operationButtons.forEach((btn) => {
  btn.addEventListener("click", () => setOperator(btn.textContent));
});

function appendNumber(number) {
  if ($screenCurrent.textContent === "0" || shouldResetScreen) {
    $screenCurrent.textContent = "";
    shouldResetScreen = false;
  }
  $screenCurrent.textContent += number;
  if (!currentOperation) {
    firstOperand = $screenCurrent.textContent;
  } else {
    secondOperand = $screenCurrent.textContent;
  }
}

function setOperator(operator) {
  if (currentOperation === null) {
    firstOperand = $screenCurrent.textContent;
    currentOperation = operator;
    $screenLast.textContent = `${firstOperand} ${currentOperation}`;
    shouldResetScreen = true;
  } else {
    secondOperand = $screenCurrent.textContent;
    calculate();
    currentOperation = operator;
    $screenLast.textContent = `${firstOperand} ${currentOperation}`;
    shouldResetScreen = true;
  }
}

function calculate() {
  if (!currentOperation || shouldResetScreen) {
    return;
  }
  const a = parseFloat(firstOperand);
  const b = parseFloat(secondOperand);
  if (isNaN(a) || isNaN(b)) {
    return;
  }
  let result = operate(currentOperation, a, b);

  if (result === null) {
    $screenCurrent.textContent = "Error";
  } else {
    result = round(result);
    $screenCurrent.textContent = result;
  }

  $screenLast.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
  firstOperand = result.toString();
  secondOperand = "";
  currentOperation = null;
  shouldResetScreen = true;
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "×":
      return multiply(a, b);
    case "÷":
      if (b === 0) return null;
      else return divide(a, b);
    default:
      return null;
  }
}

function round(number) {
  return Math.round(number * 1000) / 1000;
}

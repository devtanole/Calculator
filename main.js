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

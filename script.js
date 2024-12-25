const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");

let currentValue = "";
let previousValue = "";
let operator = "";
display.textContent = "0";

buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    let value = button.textContent;

    if (!isNaN(value) || value === ".") {
      if (value === "." && currentValue.includes(".")) {
        return;
      }
      currentValue += value;
      displayOperation(currentValue);
    } else if (value === "AC") {
      currentValue = "";
      prevValue = "";
      operator = "";
      display.textContent = "0";
    } else if (value === "%") {
      currentValue = currentValue / 100;
      previousValue = previousValue / 100;
      displayOperation(currentValue || previousValue);
      currentValue = "";
    } else if (["+", "-", "x", "/"].includes(value)) {
      if (currentValue) {
        previousValue = currentValue;
        currentValue = "";
      }
      operator = value;
    } else if (value === "=") {
      if (currentValue === "0" && operator === "/") {
        let result = 0;
        displayOperation("Can't divide by zero");
      } else if (currentValue && operator && previousValue) {
        result = calc(previousValue, operator, currentValue);
        previousValue = result;
        displayOperation(result);
        currentValue = "";
      }
    }
  });
});

function displayOperation(value) {
  display.textContent = value;
}

function calc(a, operator, b) {
  a = parseFloat(a);
  b = parseFloat(b);

  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "x":
      return a * b;
    case "/":
      return a / b;
  }
}

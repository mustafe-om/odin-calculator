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
      displayOperation(currentValue);
    } else if (["+", "-", "x", "/"].includes(value)) {
      if (currentValue) {
        previousValue = currentValue;
        currentValue = "";
      }
      operator = value;
    } else if (value === "=") {
      if (currentValue === "0" && operator === "/") {
        displayOperation("Can't divide by zero");
      } else if (currentValue && operator && previousValue) {
        const result = calc(currentValue, operator, previousValue);
        currentValue = result;
        displayOperation(currentValue);
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
      return b - a;
    case "x":
      return a * b;
    case "/":
      return b / a;
  }
}

// keypad.js
// Keypad handlers only (buttons are already defined in HTML).

const digitButtons = document.querySelectorAll("[data-digit]");
const opButtons = document.querySelectorAll("[data-op]");
const equalsBtn = document.getElementById("equalsBtn");

// Digits: append to the appropriate number field
digitButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    ui.appendDigit(btn.dataset.digit);
  });
});

// Operators: set operation and move focus to the second input
opButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    ui.setOperation(btn.dataset.op);
  });
});

// Equals: perform the same action as the "Calculate" button
equalsBtn.addEventListener("click", () => {
  ui.calculate();
});

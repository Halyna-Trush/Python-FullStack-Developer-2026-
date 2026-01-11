// display.js
// DOM bindings, global state updates on blur, and the "Calculate/Clear" actions.

// Inputs
const num1Input = document.getElementById("num1");
const opInput = document.getElementById("operation");
const num2Input = document.getElementById("num2");
const resultInput = document.getElementById("resultValue");

// Buttons
const clearBtn = document.getElementById("clearBtn");
const calculateBtn = document.getElementById("calculateBtn");

// Global state (required by the assignment)
window.calcState = {
  num1: "",
  op: "",
  num2: ""
};

// Track the last input that had focus.
// Keypad button clicks steal focus, so document.activeElement becomes a button.
let lastFocusedInput = num1Input;

// Update lastFocusedInput whenever any of our inputs receives focus.
[num1Input, opInput, num2Input].forEach((field) => {
  field.addEventListener("focus", () => {
    lastFocusedInput = field;
  });
});

/**
 * Save the current value of a specific field into the global state.
 * This is called on blur to match the assignment requirement.
 */
function saveToState(field) {
  const value = field.value.trim();

  if (field === num1Input) calcState.num1 = value;
  if (field === opInput) calcState.op = value;
  if (field === num2Input) calcState.num2 = value;
}

// Save on blur (task requirement)
[num1Input, opInput, num2Input].forEach((field) => {
  field.addEventListener("blur", () => saveToState(field));
});

/**
 * Keep operation input limited to a single operator character.
 * This prevents accidental text input like "plus" and removes stray spaces.
 */
opInput.addEventListener("input", () => {
  // Trim spaces so the field visually stays as a single character.
  const v = opInput.value.trim();
  opInput.value = v;

  // Allow only one of the supported operators; otherwise clear the field.
  if (v && !["+", "-", "*", "/"].includes(v)) opInput.value = "";
});

/**
 * Sync all inputs to the global state.
 * Needed because a user might click "Calculate" without triggering blur first.
 */
function syncAllToState() {
  saveToState(num1Input);
  saveToState(opInput);
  saveToState(num2Input);
}

/**
 * Clear inputs, result, and global state.
 */
function clearAll() {
  num1Input.value = "";
  opInput.value = "";
  num2Input.value = "";
  resultInput.value = "";

  calcState.num1 = "";
  calcState.op = "";
  calcState.num2 = "";

  num1Input.focus();
  lastFocusedInput = num1Input;
}

/**
 * Validate, compute, and show result.
 * Result must be shown via alert (task requirement).
 */
function calculate() {
  syncAllToState();

  const check = validate(calcState);
  if (!check.ok) {
    alert(check.message);
    return;
  }

  const result = compute(check.a, check.b, check.op);

  // Overflow / invalid result handling (Infinity, -Infinity, NaN)
  if (!Number.isFinite(result)) {
    alert("Error: the result is out of range for a JavaScript Number.");
    resultInput.value = "";
    return;
  }

  alert("Result: " + result);
  resultInput.value = String(result);
}

// Button handlers
clearBtn.addEventListener("click", clearAll);
calculateBtn.addEventListener("click", calculate);

/**
 * Minimal UI helpers for keypad.js to avoid duplicate logic.
 * These are intentionally simple and global for this training task.
 */
window.ui = {
  appendDigit(digit) {
    // Prefer the last focused input because keypad clicks move focus to buttons.
    const active = document.activeElement;
    const isInputActive =
      active === num1Input || active === opInput || active === num2Input;

    const target = isInputActive ? active : lastFocusedInput;

    // Digits should not go into the operator field.
    // If the operator field was last focused:
    // - if operation is chosen -> user likely types the second number
    // - otherwise -> user likely continues editing the first number
    if (target === opInput) {
      const next = calcState.op ? num2Input : num1Input;
      next.focus();
      lastFocusedInput = next;
    }

    const numericTarget = lastFocusedInput === num2Input ? num2Input : num1Input;

    // Normalize comma to dot for JS number compatibility
    if (digit === ",") digit = ".";

    // Prevent multiple decimal separators in the same number
    if (digit === "." && numericTarget.value.includes(".")) {
      return;
    }

    numericTarget.value += digit;

    if (numericTarget === num1Input) {
      calcState.num1 = num1Input.value.trim();
    } else {
      calcState.num2 = num2Input.value.trim();
    }

    numericTarget.focus();
    lastFocusedInput = numericTarget;
  },

  setOperation(op) {
    // Accept only supported operators.
    if (!["+", "-", "*", "/"].includes(op)) return;

    opInput.value = op;
    calcState.op = op;

    // Use lastFocusedInput because keypad clicks may put focus on a button.
    if (lastFocusedInput === num1Input || !calcState.num2) {
      num2Input.focus();
      lastFocusedInput = num2Input;
      return;
    }

    if (lastFocusedInput === num2Input) {
      num2Input.focus();
      return;
    }

    // If last focus was the operator field (or something else), choose a sensible default.
    if (calcState.num1) {
      num2Input.focus();
      lastFocusedInput = num2Input;
    } else {
      num1Input.focus();
      lastFocusedInput = num1Input;
    }
  },

  calculate,
  clearAll
};

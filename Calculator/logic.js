// logic.js
// Pure calculation/validation utilities (no DOM usage).

/**
 * Convert user input into a finite Number.
 * Supports comma as a decimal separator (e.g. "1,5").
 */
function parseFiniteNumber(raw) {
  const text = String(raw).trim().replace(",", ".");
  if (text === "") return { ok: false };

  const value = Number(text);
  if (!Number.isFinite(value)) return { ok: false };

  return { ok: true, value };
}

/**
 * Validate calculator state and return parsed values.
 * State shape (per task): { num1: string, op: string, num2: string }
 */
function validate(state) {
  const num1 = (state.num1 ?? "").trim();
  const num2 = (state.num2 ?? "").trim();
  const op = (state.op ?? "").trim();

  switch (true) {
  case !num1:
    return { ok: false, message: "Please enter the first number." };
  case !op:
    return { ok: false, message: "Please enter an operation (+, -, *, /)." };
  case !num2:
    return { ok: false, message: "Please enter the second number." };
  default:
    break;
}

  if (!["+", "-", "*", "/"].includes(op)) {
    return { ok: false, message: "Operation must be one of: +, -, *, /." };
  }

  const a = parseFiniteNumber(num1);
  if (!a.ok) return { ok: false, message: "The first number is not valid." };

  const b = parseFiniteNumber(num2);
  if (!b.ok) return { ok: false, message: "The second number is not valid." };

  if (op === "/" && b.value === 0) {
    return { ok: false, message: "Division by zero is not allowed." };
  }

  return { ok: true, a: a.value, b: b.value, op };
}

/**
 * Compute result for the given operands and operator.
 */
function compute(a, b, op) {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
    default:
      return NaN;
  }
}

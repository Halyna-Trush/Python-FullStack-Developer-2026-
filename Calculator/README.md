# 🐍 Python FullStack Developer 2026  
## 🧮 Calculator Web Page (Training Task 1)

A small training project built with **HTML, CSS, and JavaScript**.

---

## 📋 Task (EN translation)

Create a web page with three input fields: two fields for numbers and one for the operation (for example, +, -, *, /).  
When one of the fields loses focus, save the data to a global object.  
Add a **"Calculate"** button. When it is clicked, perform the corresponding mathematical operation with the numbers and display the result using `alert`.  
Before performing the operation, check whether both numbers and the operation are entered. If something is missing, show an appropriate message.  
*Make a calculator keypad with digits from 1 to 0 and the operators described above.

---

## ⚙️ Implementation Notes

- Input values are synchronized with a **global state object** on `blur`.
- The calculator keypad supports **digit, operator, and decimal input** with focus-aware behavior.

---

## ▶️ How to Run

Open `index.html` in a browser.

---

## 📂 Files

- `index.html` — page markup  
- `style.css` — styles  
- `logic.js` — validation and calculation logic  
- `display.js` — DOM bindings and global state updates  
- `keypad.js` — keypad button handling  

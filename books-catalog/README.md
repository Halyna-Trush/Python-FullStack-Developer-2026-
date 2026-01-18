🐍 Python FullStack Developer 2026

# 📚 Books Catalog — React Training Project

A training project built with **React** using functional components and hooks.

---

## 📋 Task

Create a functional component **BooksApp**.

The application should:

- Store `books` in state: `Book[]` (`id`, `name`, `author`, `imgUrl`)
- Store `selectedBookId` in state: `string | null` (used for navigation between pages)
- On the main page (books list), display a placeholder image, name, author, rating, and a **“Details”** button/link
- Allow filtering the books list by `id`, `name`, and `author`
- Provide input fields to add a new book (name, author, genre, rating, description) and an **“Add”** button
- On the book page, display a placeholder image, name, author, genre, rating, description, a toggleable **“Read”** checkbox, and a **“Back to list”** button
- `componentDidMount`: log a message to the console when the component is mounted
- `componentDidUpdate`: log when `books`, `filter`, or `selectedBookId` (navigation) changes

---

## ⚙️ Implementation Notes

- Built using React functional components and hooks (`useState`, `useEffect`, `useMemo`)
- Navigation is handled via component state (`selectedBookId`)
- `useEffect` is used as an analogue of `componentDidMount` and `componentDidUpdate` for logging lifecycle events
- Books state is persisted in `localStorage`
- Placeholder images are used when a book cover is not provided
- Controlled inputs are used for filters and the add-book form

---

## ▶️ How to Run

```bash
npm install
npm run dev
```

Open the local development URL provided by Vite in a browser.

---

## 📂 Project Structure

```text
books-catalog/
├─ src/
│  ├─ assets/
│  │  ├─ books/
│  │  │  ├─ gone-girl.png
│  │  │  ├─ the-housemaid.png
│  │  │  └─ the-silent-patient.png
│  │  └─ placeholders/
│  │     └─ book-placeholder.png
│  ├─ BooksApp.jsx
│  ├─ BooksApp.css
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ index.css
├─ public/
├─ index.html
├─ package.json
├─ package-lock.json
├─ vite.config.js
├─ eslint.config.js
├─ .gitignore
└─ README.md
```

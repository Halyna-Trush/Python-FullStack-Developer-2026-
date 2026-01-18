// BooksApp.jsx

// React hooks for state management, side effects, and memoization
import { useEffect, useMemo, useState } from "react";
import "./BooksApp.css";

// Static assets (covers and placeholders)
import placeholderCover from "./assets/placeholders/book-placeholder.png";
import theSilentPatient from "./assets/books/the-silent-patient.png";
import theHousemaid from "./assets/books/the-housemaid.png";
import goneGirl from "./assets/books/gone-girl.png";

// Fallback image used when a book has no cover
const PLACEHOLDER_IMG = placeholderCover;

// LocalStorage key used to persist books state
const STORAGE_KEY = "booksapp.books.v1";

// Allowed genres list (used in Add Book form)
const GENRES = [
  "Thriller",
  "Mystery",
  "Romance",
  "Fantasy",
  "Sci-Fi",
  "Non-fiction",
  "Historical Fiction",
  "Classic",
  "Other",
];

// Map of built-in cover identifiers to imported assets
// Used to safely serialize/deserialize images through localStorage
const BUILTIN_COVERS = {
  theSilentPatient,
  theHousemaid,
  goneGirl
};

/**
 * Converts image imports to string identifiers
 * so books can be safely stored in localStorage.
 */
function serializeBooks(books) {
  return books.map((b) => {
    let imgUrl = b.imgUrl;

    if (imgUrl === theSilentPatient) imgUrl = "builtin:theSilentPatient";
    else if (imgUrl === theHousemaid) imgUrl = "builtin:theHousemaid";
    else if (imgUrl === goneGirl) imgUrl = "builtin:goneGirl";

    return { ...b, imgUrl };
  });
}

/**
 * Restores image imports from string identifiers
 * when loading data from localStorage.
 */
function hydrateBooks(books) {
  return books.map((b) => {
    let imgUrl = b.imgUrl;

    if (imgUrl === "builtin:theSilentPatient") imgUrl = BUILTIN_COVERS.theSilentPatient;
    else if (imgUrl === "builtin:theHousemaid") imgUrl = BUILTIN_COVERS.theHousemaid;
    else if (imgUrl === "builtin:goneGirl") imgUrl = BUILTIN_COVERS.goneGirl;

    return { ...b, imgUrl };
  });
}

/**
 * Initial hardcoded dataset used on first app load
 * or when localStorage is empty/corrupted.
 */
function getInitialBooks() {
  return [
    {
      id: "1",
      name: "The Silent Patient",
      author: "Alex Michaelides",
      imgUrl: theSilentPatient,
      genre: "Thriller",
      rating: 4.13,
      description:
        "Alicia Berenson s life is seemingly perfect. A famous painter married to an in-demand fashion photographer...",
      read: false,
    },
    {
      id: "2",
      name: "The Housemaid",
      author: "Freida McFadden",
      imgUrl: theHousemaid,
      genre: "Thriller",
      rating: 4.28,
      description: `Every day I clean the Winchesters' beautiful house top to bottom...`,
      read: true,
    },
    {
      id: "3",
      name: "Gone Girl",
      author: "Gillian Flynn",
      imgUrl: goneGirl,
      genre: "Thriller",
      rating: 4.15,
      description: `Who are you? What have we done to each other?...`,
      read: false,
    }
  ];
}

/**
 * Returns a valid cover URL or a placeholder
 * when no image is provided.
 */
function getCoverUrl(book) {
  return book.imgUrl && book.imgUrl.trim() ? book.imgUrl : PLACEHOLDER_IMG;
}

export default function BooksApp() {
  /**
   * Books state initialization:
   * - load from localStorage if possible
   * - fallback to initial dataset on error
   */
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return getInitialBooks();

    try {
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return getInitialBooks();
      return hydrateBooks(parsed);
    } catch {
      return getInitialBooks();
    }
  });

  // Currently selected book ID (null = list view)
  const [selectedBookId, setSelectedBookId] = useState(null);

  // Controls visibility of "Add book" panel
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Controlled form state for adding a new book
  const [form, setForm] = useState({
    name: "",
    author: "",
    genre: "",
    rating: "",
    description: "",
    imgUrl: "",
  });

  // Filter inputs for the books list
  const [filter, setFilter] = useState({
    id: "",
    name: "",
    author: "",
  });

  /**
   * Persist books state to localStorage
   * whenever it changes.
   */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serializeBooks(books)));
  }, [books]);

  // ComponentDidMount equivalent
  useEffect(() => {
    console.log("BooksApp mounted");
  }, []);

  // Logs book state updates
  useEffect(() => {
    console.log("Books state updated");
  }, [books]);

  // Logs filter changes
  useEffect(() => {
    console.log("Filter state updated");
  }, [filter]);

  // Logs navigation changes (list ↔ details)
  useEffect(() => {
    console.log("Navigation changed");
  }, [selectedBookId]);

  /**
   * Derives currently selected book
   * based on selectedBookId.
   */
  const selectedBook = useMemo(() => {
    if (!selectedBookId) return null;
    return books.find((b) => b.id === selectedBookId) ?? null;
  }, [books, selectedBookId]);

  /**
   * Filters books list by id, name and author.
   */
  const filteredBooks = useMemo(() => {
    const idQuery = filter.id.trim();
    const nameQuery = filter.name.trim().toLowerCase();
    const authorQuery = filter.author.trim().toLowerCase();

    return books.filter((book) => {
      const idMatch = !idQuery || book.id.startsWith(idQuery);
      const nameMatch = !nameQuery || book.name.toLowerCase().includes(nameQuery);
      const authorMatch = !authorQuery || book.author.toLowerCase().includes(authorQuery);

      return idMatch && nameMatch && authorMatch;
    });
  }, [books, filter]);

  // Opens book details view
  function openDetails(id) {
    setSelectedBookId(id);
  }

  // Returns back to books list
  function goBackToList() {
    setSelectedBookId(null);
  }

  // Toggles "read" flag for a book
  function toggleRead(bookId) {
    setBooks((prev) =>
      prev.map((b) => (b.id === bookId ? { ...b, read: !b.read } : b))
    );
  }

  /**
   * Updates add-book form fields.
   * Rating input is normalized to support comma decimals.
   */
  function updateForm(field, value) {
    if (field === "rating") {
      const normalized = value.replace(",", ".");
      setForm((prev) => ({ ...prev, rating: normalized }));
      return;
    }

    setForm((prev) => ({ ...prev, [field]: value }));
  }

  // Resets add-book form to initial state
  function resetForm() {
    setForm({
      name: "",
      author: "",
      genre: "",
      rating: "",
      description: "",
      imgUrl: "",
    });
  }

  /**
   * Validates and adds a new book to the list.
   */
  function addBook() {
    const name = form.name.trim();
    const author = form.author.trim();

    if (!name || !author) {
      alert("Name and author are required.");
      return;
    }

    if (form.rating.trim() === "") {
      alert("Rating is required.");
      return;
    }

    const rating = Number(form.rating);
    if (!Number.isFinite(rating) || rating < 0 || rating > 5) {
      alert("Rating must be between 0 and 5.");
      return;
    }

    if (
      form.imgUrl &&
      !form.imgUrl.startsWith("http://") &&
      !form.imgUrl.startsWith("https://")
    ) {
      alert("Cover URL must start with http:// or https://");
      return;
    }

    const id = crypto.randomUUID?.() ?? String(Date.now());

    setBooks((prev) => [
      {
        id,
        name,
        author,
        genre: form.genre.trim() || "Unknown",
        rating,
        description: form.description.trim() || "No description",
        imgUrl: form.imgUrl.trim(),
        read: false,
      },
      ...prev,
    ]);

    resetForm();
    setIsAddOpen(false);
  }

  // ---------- Details view ----------
  if (selectedBookId) {
    if (!selectedBook) {
      return (
        <div className="page">
          <h2 className="subtitle">Book not found</h2>
          <button className="btn" onClick={goBackToList}>
            Back to list
          </button>
        </div>
      );
    }

    return (
      <div className="page">
        <h1 className="title">Book details</h1>

        <div className="details">
          <img
            className="details__cover"
            src={getCoverUrl(selectedBook)}
            alt={selectedBook.name}
          />

          <div className="details__info">
            <div>
              <strong>Name:</strong> {selectedBook.name}
            </div>
            <div>
              <strong>Author:</strong> {selectedBook.author}
            </div>
            <div>
              <strong>Genre:</strong> {selectedBook.genre}
            </div>
            <div>
              <strong>Rating:</strong> {selectedBook.rating}
            </div>
            <div>
              <strong>Description:</strong> {selectedBook.description}
            </div>

            <label className="checkbox">
              <input
                type="checkbox"
                checked={selectedBook.read}
                onChange={() => toggleRead(selectedBook.id)}
              />
              Read
            </label>
          </div>
        </div>

        <button className="btn" onClick={goBackToList}>
          Back to list
        </button>
      </div>
    );
  }

  // ---------- List view ----------
  return (
    <div className="page">
      <div className="header">
        <h1 className="title">Books</h1>
        <button className="btn" onClick={() => setIsAddOpen((v) => !v)}>
          {isAddOpen ? "Close" : "Add book"}
        </button>
      </div>

      <div className="panel">
        <div className="panel__title">Filters</div>

        <div className="form">
          <input
            className="input"
            placeholder="Filter by ID"
            value={filter.id}
            onChange={(e) => setFilter((prev) => ({ ...prev, id: e.target.value }))}
          />
          <input
            className="input"
            placeholder="Filter by name"
            value={filter.name}
            onChange={(e) => setFilter((prev) => ({ ...prev, name: e.target.value }))}
          />
          <input
            className="input"
            placeholder="Filter by author"
            value={filter.author}
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, author: e.target.value }))
            }
          />
        </div>
      </div>

      {isAddOpen && (
        <div className="panel">
          <div className="panel__title">Add new book</div>

          <div className="form">
            <input
              className="input"
              placeholder="Name *"
              value={form.name}
              onChange={(e) => updateForm("name", e.target.value)}
            />
            <input
              className="input"
              placeholder="Author *"
              value={form.author}
              onChange={(e) => updateForm("author", e.target.value)}
            />

            <select
              className="input"
              value={form.genre}
              onChange={(e) => updateForm("genre", e.target.value)}
            >
              <option value="">Select genre</option>
              {GENRES.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>

            <input
              className="input"
              placeholder="Rating (0–5) *"
              value={form.rating}
              onChange={(e) => updateForm("rating", e.target.value)}
            />
            <input
              className="input"
              placeholder="Cover URL (optional)"
              value={form.imgUrl}
              onChange={(e) => updateForm("imgUrl", e.target.value)}
            />
            <textarea
              className="textarea"
              placeholder="Description"
              value={form.description}
              onChange={(e) => updateForm("description", e.target.value)}
            />
          </div>

          <div className="panel__actions">
            <button
              className="btn btn--ghost"
              onClick={() => {
                resetForm();
                setIsAddOpen(false);
              }}
            >
              Cancel
            </button>
            <button className="btn" onClick={addBook}>
              Add
            </button>
          </div>
        </div>
      )}

      <div className="list">
        {filteredBooks.map((book) => (
          <div className="card" key={book.id}>
            <img className="card__cover" src={getCoverUrl(book)} alt={book.name} />
            <div className="card__content">
              <div className="card__name">{book.name}</div>
              <div className="card__author">{book.author}</div>
              <div className="card__rating">⭐ {book.rating}</div>
            </div>
            <button className="btn" onClick={() => openDetails(book.id)}>
              Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

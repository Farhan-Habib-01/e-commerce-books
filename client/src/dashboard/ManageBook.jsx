import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import {
  FiBookOpen,
  FiEdit3,
  FiTrash2,
  FiSearch,
  FiRefreshCw,
  FiX,
  FiAlertTriangle,
  FiCheckCircle,
  FiPackage,
  FiTag,
} from "react-icons/fi";
import API_URL from "../config/api"



const ManageBook = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const [deleteBook, setDeleteBook] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // =========================================
  // FETCH BOOKS
  // =========================================

  const fetchBooks = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await fetch(`${API_URL}/all-books`);

      if (!response.ok) {
        throw new Error(
          `Failed to load books (${response.status})`
        );
      }

      const data = await response.json();

      // Support different backend response formats
      const bookList = Array.isArray(data)
        ? data
        : data.books || data.data || [];

      setBooks(bookList);
    } catch (err) {
      console.error("Fetch books error:", err);

      setError(
        err?.message ||
        "Unable to load books. Please try again."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // =========================================
  // SUCCESS MESSAGE
  // =========================================

  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => {
      setSuccess("");
    }, 3500);

    return () => clearTimeout(timer);
  }, [success]);

  // =========================================
  // CATEGORIES
  // =========================================

  const categories = useMemo(() => {
    const values = books
      .map((book) => book.bookCategory)
      .filter(Boolean);

    return ["all", ...new Set(values)];
  }, [books]);

  // =========================================
  // FILTER BOOKS
  // =========================================

  const filteredBooks = useMemo(() => {
    const query = search.trim().toLowerCase();

    return books.filter((book) => {
      const matchesSearch =
        !query ||
        book.bookTitle
          ?.toLowerCase()
          .includes(query) ||
        book.authorName
          ?.toLowerCase()
          .includes(query);

      const matchesCategory =
        category === "all" ||
        book.bookCategory === category;

      return matchesSearch && matchesCategory;
    });
  }, [books, search, category]);

  // =========================================
  // DELETE BOOK
  // =========================================

  const handleDelete = async () => {
    if (!deleteBook?._id || deleting) return;

    try {
      setDeleting(true);
      setError("");

      const response = await fetch(
        `${API_URL}/book/${deleteBook._id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Unable to delete book (${response.status})`
        );
      }

      setBooks((currentBooks) =>
        currentBooks.filter(
          (book) => book._id !== deleteBook._id
        )
      );

      setDeleteBook(null);

      setSuccess(
        `"${deleteBook.bookTitle}" deleted successfully.`
      );
    } catch (err) {
      console.error("Delete book error:", err);

      setError(
        err?.message ||
        "Unable to delete the book. Please try again."
      );
    } finally {
      setDeleting(false);
    }
  };

  // =========================================
  // PRICE FORMAT
  // =========================================

  const formatPrice = (price) => {
    const number = Number(price);

    if (Number.isNaN(number)) {
      return "₹0";
    }

    return `₹${number.toLocaleString("en-IN")}`;
  };

  // =========================================
  // STATISTICS
  // =========================================

  const totalBooks = books.length;

  const totalCategories = categories.length - 1;

  const totalValue = books.reduce(
    (total, book) =>
      total + Number(book.price || 0),
    0
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-blue-50 px-3 py-6 sm:px-5 md:px-8 lg:px-10">

      {/* =====================================================
          WATER BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Large liquid blob */}
        <div
          className="
            absolute
            -right-32
            -top-32
            h-72
            w-72
            rounded-full
            bg-cyan-300/30
            blur-3xl
            animate-[spin_20s_linear_infinite]
            sm:h-96
            sm:w-96
          "
        />

        {/* Bottom liquid blob */}
        <div
          className="
            absolute
            -bottom-40
            -left-40
            h-96
            w-96
            rounded-full
            bg-blue-400/20
            blur-3xl
            animate-[spin_24s_linear_infinite_reverse]
          "
        />

        {/* Center glow */}
        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-72
            w-72
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-white/40
            blur-3xl
            sm:h-[30rem]
            sm:w-[30rem]
          "
        />

        {/* Bubble */}
        <span
          className="
            absolute
            bottom-[-20px]
            left-[10%]
            h-6
            w-6
            rounded-full
            border
            border-white/70
            bg-white/30
            backdrop-blur-sm
            animate-[bounce_7s_ease-in-out_infinite]
          "
        />

        <span
          className="
            absolute
            bottom-[-30px]
            left-[35%]
            h-4
            w-4
            rounded-full
            border
            border-white/70
            bg-white/30
            animate-[bounce_5s_ease-in-out_infinite]
          "
        />

        <span
          className="
            absolute
            bottom-[-20px]
            right-[15%]
            h-8
            w-8
            rounded-full
            border
            border-white/70
            bg-white/30
            backdrop-blur-sm
            animate-[bounce_8s_ease-in-out_infinite]
          "
        />
      </div>

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <section className="relative z-10 mx-auto w-full max-w-7xl">

        {/* ===================================================
            HEADER
        ==================================================== */}

        <div
          className="
            mb-6
            flex
            flex-col
            gap-4
            animate-[fadeIn_0.6s_ease-out]
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-white/70
                  bg-white/50
                  text-cyan-700
                  shadow-lg
                  backdrop-blur-xl
                "
              >
                <FiBookOpen size={20} />
              </span>

              <span className="rounded-full bg-cyan-100/70 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-700">
                Admin
              </span>
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Manage Books
            </h1>

            <p className="mt-1 text-sm text-slate-600 sm:text-base">
              Create, edit, search and manage your book inventory.
            </p>
          </div>

          <button
            type="button"
            onClick={() => fetchBooks(true)}
            disabled={refreshing}
            className="
              inline-flex
              min-h-[46px]
              items-center
              justify-center
              gap-2
              rounded-2xl
              border
              border-white/70
              bg-white/50
              px-5
              text-sm
              font-bold
              text-slate-700
              shadow-lg
              backdrop-blur-xl
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-white/70
              hover:shadow-xl
              active:scale-95
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            <FiRefreshCw
              className={
                refreshing
                  ? "animate-spin"
                  : ""
              }
            />

            {refreshing
              ? "Refreshing..."
              : "Refresh"}
          </button>
        </div>

        {/* ===================================================
            ALERTS
        ==================================================== */}

        {error && (
          <div
            role="alert"
            className="
              mb-5
              flex
              items-start
              gap-3
              rounded-2xl
              border
              border-red-200
              bg-red-50/80
              p-4
              text-sm
              text-red-700
              shadow-lg
              backdrop-blur-xl
              animate-[fadeIn_0.3s_ease-out]
            "
          >
            <FiAlertTriangle className="mt-0.5 shrink-0" />

            <div className="flex-1">
              {error}
            </div>

            <button
              type="button"
              onClick={() => setError("")}
              className="shrink-0"
              aria-label="Close error"
            >
              <FiX />
            </button>
          </div>
        )}

        {success && (
          <div
            role="status"
            className="
              mb-5
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-emerald-200
              bg-emerald-50/80
              p-4
              text-sm
              text-emerald-700
              shadow-lg
              backdrop-blur-xl
              animate-[fadeIn_0.3s_ease-out]
            "
          >
            <FiCheckCircle className="shrink-0" />

            <span>{success}</span>
          </div>
        )}

        {/* ===================================================
            STATISTICS
        ==================================================== */}

        <div
          className="
            mb-6
            grid
            grid-cols-1
            gap-3
            sm:grid-cols-3
          "
        >
          {/* Total Books */}
          <div
            className="
              rounded-3xl
              border
              border-white/70
              bg-white/40
              p-5
              shadow-lg
              backdrop-blur-2xl
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Total Books
                </p>

                <p className="mt-1 text-2xl font-extrabold text-slate-900">
                  {totalBooks}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700">
                <FiPackage size={21} />
              </div>
            </div>
          </div>

          {/* Categories */}
          <div
            className="
              rounded-3xl
              border
              border-white/70
              bg-white/40
              p-5
              shadow-lg
              backdrop-blur-2xl
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Categories
                </p>

                <p className="mt-1 text-2xl font-extrabold text-slate-900">
                  {totalCategories}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                <FiTag size={21} />
              </div>
            </div>
          </div>

          {/* Value */}
          <div
            className="
              rounded-3xl
              border
              border-white/70
              bg-white/40
              p-5
              shadow-lg
              backdrop-blur-2xl
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
            "
          >
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Inventory Value
                </p>

                <p className="mt-1 truncate text-xl font-extrabold text-slate-900 sm:text-2xl">
                  {formatPrice(totalValue)}
                </p>
              </div>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <FaRupeeSign size={21} />
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            SEARCH + FILTER
        ==================================================== */}

        <div
          className="
            mb-6
            rounded-3xl
            border
            border-white/70
            bg-white/40
            p-4
            shadow-lg
            backdrop-blur-2xl
            sm:p-5
          "
        >
          <div className="flex flex-col gap-3 md:flex-row">

            {/* Search */}
            <div className="relative flex-1">
              <FiSearch
                className="
                  pointer-events-none
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search by book title or author..."
                className="
                  h-12
                  w-full
                  rounded-2xl
                  border
                  border-white/70
                  bg-white/50
                  pl-11
                  pr-4
                  text-sm
                  text-slate-900
                  outline-none
                  backdrop-blur-md
                  transition-all
                  duration-300
                  placeholder:text-slate-400
                  focus:border-cyan-400
                  focus:bg-white/70
                  focus:ring-4
                  focus:ring-cyan-100
                "
              />
            </div>

            {/* Category */}
            <select
              value={category}
              onChange={(event) =>
                setCategory(event.target.value)
              }
              className="
                h-12
                w-full
                rounded-2xl
                border
                border-white/70
                bg-white/50
                px-4
                text-sm
                font-semibold
                text-slate-700
                outline-none
                backdrop-blur-md
                transition
                focus:border-cyan-400
                focus:ring-4
                focus:ring-cyan-100
                md:w-56
              "
            >
              {categories.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item === "all"
                    ? "All categories"
                    : item}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
            <span>
              Showing{" "}
              <strong className="text-slate-700">
                {filteredBooks.length}
              </strong>{" "}
              of{" "}
              <strong className="text-slate-700">
                {books.length}
              </strong>{" "}
              books
            </span>

            {(search || category !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("all");
                }}
                className="font-bold text-cyan-700 hover:text-cyan-900 hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* ===================================================
            LOADING
        ==================================================== */}

        {loading && (
          <div
            className="
              flex
              min-h-[350px]
              items-center
              justify-center
              rounded-3xl
              border
              border-white/70
              bg-white/40
              shadow-xl
              backdrop-blur-2xl
            "
          >
            <div className="text-center">
              <div
                className="
                  mx-auto
                  h-12
                  w-12
                  animate-spin
                  rounded-full
                  border-4
                  border-cyan-200
                  border-t-cyan-600
                "
              />

              <p className="mt-4 text-sm font-semibold text-slate-600">
                Loading books...
              </p>
            </div>
          </div>
        )}

        {/* ===================================================
            EMPTY STATE
        ==================================================== */}

        {!loading &&
          filteredBooks.length === 0 && (
            <div
              className="
                flex
                min-h-[350px]
                flex-col
                items-center
                justify-center
                rounded-3xl
                border
                border-white/70
                bg-white/40
                px-5
                text-center
                shadow-xl
                backdrop-blur-2xl
              "
            >
              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  bg-cyan-100
                  text-cyan-600
                "
              >
                <FiBookOpen size={28} />
              </div>

              <h2 className="mt-4 text-xl font-bold text-slate-900">
                No books found
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                {search || category !== "all"
                  ? "Try changing your search or category filter."
                  : "Your book inventory is currently empty."}
              </p>

              {(search || category !== "all") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setCategory("all");
                  }}
                  className="
                    mt-5
                    rounded-xl
                    bg-cyan-600
                    px-5
                    py-2.5
                    text-sm
                    font-bold
                    text-white
                    shadow-lg
                    transition
                    hover:-translate-y-0.5
                    hover:bg-cyan-700
                  "
                >
                  Clear filters
                </button>
              )}
            </div>
          )}

        {/* ===================================================
            DESKTOP TABLE
        ==================================================== */}

        {!loading &&
          filteredBooks.length > 0 && (
            <>
              <div
                className="
                  hidden
                  overflow-hidden
                  rounded-3xl
                  border
                  border-white/70
                  bg-white/40
                  shadow-xl
                  backdrop-blur-2xl
                  md:block
                "
              >
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[900px]">
                    <thead>
                      <tr className="border-b border-white/60 bg-white/30">
                        <th className="px-5 py-4 text-left text-xs font-extrabold uppercase tracking-wider text-slate-500">
                          Book
                        </th>

                        <th className="px-5 py-4 text-left text-xs font-extrabold uppercase tracking-wider text-slate-500">
                          Author
                        </th>

                        <th className="px-5 py-4 text-left text-xs font-extrabold uppercase tracking-wider text-slate-500">
                          Category
                        </th>

                        <th className="px-5 py-4 text-left text-xs font-extrabold uppercase tracking-wider text-slate-500">
                          Price
                        </th>

                        <th className="px-5 py-4 text-right text-xs font-extrabold uppercase tracking-wider text-slate-500">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredBooks.map(
                        (book) => (
                          <tr
                            key={book._id}
                            className="
                              border-b
                              border-white/50
                              transition-colors
                              duration-200
                              last:border-0
                              hover:bg-white/30
                            "
                          >
                            {/* Book */}
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-4">
                                <div className="h-16 w-12 shrink-0 overflow-hidden rounded-xl bg-slate-100 shadow-md">
                                  {book.imageURL ? (
                                    <img
                                      src={book.imageURL}
                                      alt={book.bookTitle}
                                      className="h-full w-full object-cover"
                                      loading="lazy"
                                    />
                                  ) : (
                                    <div className="flex h-full items-center justify-center text-slate-400">
                                      <FiBookOpen />
                                    </div>
                                  )}
                                </div>

                                <div className="min-w-0">
                                  <p className="max-w-[260px] truncate font-bold text-slate-900">
                                    {book.bookTitle ||
                                      "Untitled book"}
                                  </p>

                                  <p className="mt-1 text-xs text-slate-500">
                                    ID:{" "}
                                    {book._id?.slice(
                                      -8
                                    )}
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* Author */}
                            <td className="px-5 py-4">
                              <span className="text-sm font-medium text-slate-700">
                                {book.authorName ||
                                  "Unknown"}
                              </span>
                            </td>

                            {/* Category */}
                            <td className="px-5 py-4">
                              <span className="inline-flex rounded-full bg-cyan-100/80 px-3 py-1 text-xs font-bold text-cyan-700">
                                {book.bookCategory ||
                                  "General"}
                              </span>
                            </td>

                            {/* Price */}
                            <td className="px-5 py-4">
                              <span className="font-extrabold text-slate-900">
                                {formatPrice(
                                  book.price
                                )}
                              </span>
                            </td>

                            {/* Actions */}
                            <td className="px-5 py-4">
                              <div className="flex justify-end gap-2">
                                <Link
                                  to={`/admin/dashboard/edit-books/${book._id}`}
                                  className="
                                    inline-flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-cyan-100
                                    text-cyan-700
                                    transition-all
                                    duration-200
                                    hover:-translate-y-1
                                    hover:bg-cyan-200
                                    hover:shadow-md
                                  "
                                  title="Edit book"
                                >
                                  <FiEdit3 />
                                </Link>

                                <button
                                  type="button"
                                  onClick={() =>
                                    setDeleteBook(
                                      book
                                    )
                                  }
                                  className="
                                    inline-flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-red-100
                                    text-red-600
                                    transition-all
                                    duration-200
                                    hover:-translate-y-1
                                    hover:bg-red-200
                                    hover:shadow-md
                                  "
                                  title="Delete book"
                                >
                                  <FiTrash2 />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* =================================================
                  MOBILE / TABLET CARDS
              ================================================== */}

              <div className="grid gap-4 md:hidden">
                {filteredBooks.map(
                  (book) => (
                    <article
                      key={book._id}
                      className="
                        overflow-hidden
                        rounded-3xl
                        border
                        border-white/70
                        bg-white/40
                        p-4
                        shadow-xl
                        backdrop-blur-2xl
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:shadow-2xl
                      "
                    >
                      <div className="flex gap-4">
                        {/* Image */}
                        <div className="h-28 w-20 shrink-0 overflow-hidden rounded-2xl bg-slate-100 shadow-md">
                          {book.imageURL ? (
                            <img
                              src={book.imageURL}
                              alt={book.bookTitle}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-slate-400">
                              <FiBookOpen size={24} />
                            </div>
                          )}
                        </div>

                        {/* Details */}
                        <div className="min-w-0 flex-1">
                          <h2 className="line-clamp-2 text-base font-extrabold text-slate-900">
                            {book.bookTitle ||
                              "Untitled book"}
                          </h2>

                          <p className="mt-1 text-sm text-slate-500">
                            {book.authorName ||
                              "Unknown author"}
                          </p>

                          <span className="mt-2 inline-flex rounded-full bg-cyan-100 px-2.5 py-1 text-[10px] font-bold text-cyan-700">
                            {book.bookCategory ||
                              "General"}
                          </span>

                          <p className="mt-3 text-lg font-extrabold text-slate-900">
                            {formatPrice(
                              book.price
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <Link
                          to={`/admin/dashboard/edit-books/${book._id}`}
                          className="
                          inline-flex
                          min-h-[44px]
                          items-center
                          justify-center
                          gap-2
                          rounded-xl
                          bg-cyan-100
                          text-sm
                          font-bold
                          text-cyan-700
                          transition
                          hover:bg-cyan-200
                          active:scale-95
                        "
                        >
                          <FiEdit3 />
                          Edit
                        </Link>


                        <button
                          type="button"
                          onClick={() =>
                            setDeleteBook(
                              book
                            )
                          }
                          className="
                            inline-flex
                            min-h-[44px]
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-red-100
                            text-sm
                            font-bold
                            text-red-600
                            transition
                            hover:bg-red-200
                            active:scale-95
                          "
                        >
                          <FiTrash2 />
                          Delete
                        </button>
                      </div>
                    </article>
                  )
                )}
              </div>
            </>
          )}
      </section>

      {/* =======================================================
          DELETE CONFIRMATION MODAL
      ======================================================== */}

      {deleteBook && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-slate-950/50
            p-4
            backdrop-blur-sm
          "
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-title"
        >
          <div
            className="
              w-full
              max-w-md
              animate-[fadeIn_0.25s_ease-out]
              rounded-3xl
              border
              border-white/70
              bg-white/80
              p-6
              shadow-[0_30px_80px_rgba(0,70,120,0.25)]
              backdrop-blur-2xl
              sm:p-8
            "
          >
            {/* Warning icon */}
            <div
              className="
                mx-auto
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-full
                bg-red-100
                text-red-600
                shadow-inner
              "
            >
              <FiAlertTriangle size={30} />
            </div>

            <h2
              id="delete-title"
              className="mt-5 text-center text-xl font-extrabold text-slate-900"
            >
              Delete this book?
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-center text-sm leading-6 text-slate-600">
              Are you sure you want to delete{" "}
              <strong className="text-slate-900">
                "{deleteBook.bookTitle}"
              </strong>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() =>
                  setDeleteBook(null)
                }
                disabled={deleting}
                className="
                  min-h-[48px]
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  px-5
                  text-sm
                  font-bold
                  text-slate-700
                  transition
                  hover:bg-slate-50
                  active:scale-95
                  disabled:opacity-50
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="
                  inline-flex
                  min-h-[48px]
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  bg-red-600
                  px-5
                  text-sm
                  font-bold
                  text-white
                  shadow-lg
                  shadow-red-200
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-red-700
                  active:scale-95
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {deleting ? (
                  <>
                    <span
                      className="
                        h-5
                        w-5
                        animate-spin
                        rounded-full
                        border-2
                        border-white/30
                        border-t-white
                      "
                    />

                    Deleting...
                  </>
                ) : (
                  <>
                    <FiTrash2 />
                    Yes, Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ManageBook;

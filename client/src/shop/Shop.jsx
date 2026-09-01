import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowRight,
  FaShoppingCart,
} from "react-icons/fa";

import API_URL from "../config/api";
import { useCart } from "../context/CartProvider";

const FALLBACK_IMAGE =
  "https://via.placeholder.com/400x600?text=No+Image";

const formatPrice = (value) => {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "₹0";
  }

  return `₹${number.toLocaleString("en-IN")}`;
};

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const {
    _id,
    imageURL,
    bookTitle,
    authorName,
    price,
    totalprice,
    discountPercentage,
  } = book;

  const handleBuyNow = () => {
    if (!_id) {
      return;
    }

    navigate("/checkout", {
      state: {
        book,
      },
    });
  };

  const handleAddToCart = () => {
    addToCart(book);
  };

  return (
    <article
      className="
        group flex h-full flex-col
        overflow-hidden rounded-2xl
        border border-gray-100
        bg-white shadow-sm
        transition-all duration-500
        hover:-translate-y-2
        hover:shadow-2xl
      "
    >
      <button
        type="button"
        onClick={() =>
          navigate(`/books/${_id}`)
        }
        className="
          overflow-hidden bg-gray-50
          p-4 text-left
        "
      >
        <div className="flex h-72 items-center justify-center sm:h-80">
          <img
            src={imageURL || FALLBACK_IMAGE}
            alt={
              bookTitle || "Book cover"
            }
            loading="lazy"
            decoding="async"
            className="
              h-full w-full object-contain
              transition-transform duration-500
              group-hover:scale-105
            "
            onError={(event) => {
              if (
                event.currentTarget.src !==
                FALLBACK_IMAGE
              ) {
                event.currentTarget.src =
                  FALLBACK_IMAGE;
              }
            }}
          />
        </div>
      </button>

      <div className="flex flex-1 flex-col p-5">
        <h2
          className="
            line-clamp-2 min-h-[3.5rem]
            text-lg font-extrabold text-gray-900
          "
          title={bookTitle}
        >
          {bookTitle || "Untitled Book"}
        </h2>

        <p
          className="mt-1 truncate text-sm text-gray-500"
          title={authorName}
        >
          By {authorName || "Unknown Author"}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xl font-extrabold text-gray-900">
            {formatPrice(price)}
          </span>

          {totalprice &&
            Number(totalprice) >
              Number(price) && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(totalprice)}
              </span>
            )}

          {Number(discountPercentage) > 0 && (
            <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-bold text-green-700">
              {discountPercentage}% OFF
            </span>
          )}
        </div>

        <div className="mt-auto grid grid-cols-1 gap-2 pt-5 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!_id}
            className="
              flex items-center justify-center
              gap-2 rounded-xl
              border border-blue-600
              px-4 py-3 text-sm font-bold
              text-blue-600
              transition-all duration-300
              hover:bg-blue-50
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <FaShoppingCart />
            Add
          </button>

          <button
            type="button"
            onClick={handleBuyNow}
            disabled={!_id}
            className="
              flex items-center justify-center
              gap-2 rounded-xl
              bg-blue-600 px-4 py-3
              text-sm font-bold text-white
              transition-all duration-300
              hover:-translate-y-0.5
              hover:bg-blue-700
              hover:shadow-lg
              disabled:cursor-not-allowed
              disabled:bg-gray-400
            "
          >
            Buy Now
            <FaArrowRight className="text-xs" />
          </button>
        </div>
      </div>
    </article>
  );
};

const BookSkeleton = () => (
  <div className="animate-pulse rounded-2xl bg-white p-4 shadow-sm">
    <div className="h-72 rounded-xl bg-gray-200 sm:h-80" />
    <div className="mt-4 h-5 rounded bg-gray-200" />
    <div className="mt-2 h-4 w-2/3 rounded bg-gray-200" />
    <div className="mt-4 h-5 w-1/2 rounded bg-gray-200" />
    <div className="mt-5 h-10 rounded-xl bg-gray-200" />
  </div>
);

const Shop = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBooks = useCallback(
    async (signal) => {
      if (!API_URL) {
        setError(
          "Backend API is not configured."
        );
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/all-books`,
          {
            signal,
            headers: {
              Accept: "application/json",
            },
          }
        );

        let data = null;

        try {
          data = await response.json();
        } catch {
          data = null;
        }

        if (!response.ok) {
          throw new Error(
            data?.message ||
              `Server returned ${response.status}`
          );
        }

        if (!Array.isArray(data)) {
          throw new Error(
            "Invalid book data received."
          );
        }

        setBooks(data);
      } catch (error) {
        if (
          error.name ===
          "AbortError"
        ) {
          return;
        }

        console.error(
          "Fetch books error:",
          error
        );

        setError(
          error.message ||
            "Unable to load books."
        );
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    },
    []
  );

  useEffect(() => {
    const controller =
      new AbortController();

    fetchBooks(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchBooks]);

  if (loading) {
    return (
      <section className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl pt-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Our Book Collection
            </h1>

            <p className="mt-3 text-gray-500">
              Loading our collection...
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({
              length: 8,
            }).map((_, index) => (
              <BookSkeleton
                key={index}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
          <div className="text-5xl">⚠️</div>

          <h1 className="mt-5 text-2xl font-extrabold">
            Unable to load books
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            {error}
          </p>

          <button
            type="button"
            onClick={() => {
              const controller =
                new AbortController();

              fetchBooks(
                controller.signal
              );
            }}
            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl pt-8">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Explore • Choose • Read
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-5xl">
            Find Your Next Favorite Book
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
            Explore our growing collection of books
            and discover stories, knowledge and ideas
            worth reading.
          </p>

          <div className="mt-6">
            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700">
              {books.length}{" "}
              {books.length === 1
                ? "Book"
                : "Books"}{" "}
              Available
            </span>
          </div>
        </div>

        {books.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {books.map((book) => (
              <BookCard
                key={book._id}
                book={book}
              />
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-2xl bg-white px-5 py-16 text-center shadow-sm">
            <div className="text-5xl">
              📚
            </div>

            <h2 className="mt-5 text-2xl font-bold">
              No Books Available
            </h2>

            <p className="mt-2 text-gray-500">
              Check back later for new books.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Shop;
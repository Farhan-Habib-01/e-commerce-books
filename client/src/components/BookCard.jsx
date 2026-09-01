import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCartShopping,
  FaHeart,
} from "react-icons/fa6";

import { useCart } from "../context/CartProvider";

const SingleBookCard = ({ book }) => {
  const navigate = useNavigate();

  const {
    addToCart,
    isInCart,
    toggleWishlist,
    isInWishlist,
  } = useCart();

  const [imageError, setImageError] = useState(false);

  // Prevent BookCard crash
  if (!book || !book._id) {
    return null;
  }

  const {
    _id,
    imageURL,
    bookTitle,
    authorName,
    price,
    totalprice,
    discountPercentage,
  } = book;

  const addedToCart = isInCart(_id);
  const addedToWishlist = isInWishlist(_id);

  // ==========================================
  // BUY NOW
  // ==========================================

  const handleBuyNow = () => {
    navigate("/checkout", {
      state: {
        book,
      },
    });
  };

  // ==========================================
  // CART
  // ==========================================

  const handleAddToCart = () => {
    if (!addedToCart) {
      addToCart(book);
    }
  };

  // ==========================================
  // WISHLIST
  // ==========================================

  const handleWishlist = () => {
    toggleWishlist(book);
  };

  return (
    <article
      className="
        group
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-gray-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-2xl
      "
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden bg-gray-100">
        {!imageError && imageURL ? (
          <img
            src={imageURL}
            alt={bookTitle || "Book cover"}
            loading="lazy"
            onError={() => setImageError(true)}
            className="
              h-64
              w-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
              sm:h-72
              lg:h-96
            "
          />
        ) : (
          <div
            className="
              flex
              h-64
              items-center
              justify-center
              bg-gray-200
              text-sm
              text-gray-500
              sm:h-72
              lg:h-80
            "
          >
            No Image Available
          </div>
        )}

        {/* WISHLIST */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={
            addedToWishlist
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          aria-pressed={addedToWishlist}
          className={`
            absolute
            right-3
            top-3
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            shadow-md
            transition
            focus:outline-none
            focus:ring-2
            focus:ring-red-500
            ${
              addedToWishlist
                ? "bg-red-500 text-white"
                : "bg-white text-gray-700 hover:bg-red-50 hover:text-red-500"
            }
          `}
        >
          <FaHeart />
        </button>

        {/* CART ICON */}
        <button
          type="button"
          onClick={handleAddToCart}
          aria-label={
            addedToCart
              ? "Book already in cart"
              : "Add book to cart"
          }
          disabled={addedToCart}
          className={`
            absolute
            top-3
            left-3
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            shadow-md
            transition
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            ${
              addedToCart
                ? "cursor-default bg-green-600 text-white"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }
          `}
        >
          <FaCartShopping />
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col px-4 pb-4">
        <h2
          title={bookTitle}
          className="
            line-clamp-2
            min-h-[1rem]
            text-md
            font-bold
            text-gray-900
          "
        >
          {bookTitle || "Untitled Book"}
        </h2>

        <p
          title={authorName}
          className=" truncate text-sm text-gray-500"
        >
          By {authorName || "Unknown Author"}
        </p>

        {/* PRICE */}
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <span className="text-lg font-bold text-gray-900">
            ₹
            {Number(price || 0).toLocaleString("en-IN")}
          </span>

          {Number(totalprice) > Number(price) && (
            <span className="text-sm text-gray-400 line-through">
              ₹
              {Number(totalprice).toLocaleString("en-IN")}
            </span>
          )}

          {Number(discountPercentage) > 0 && (
            <span className="text-xs font-bold text-green-600">
              {discountPercentage}% OFF
            </span>
          )}
        </div>

        {/* ACTIONS */}
        <div className="mt-auto grid grid-cols-1 gap-2 pt-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={addedToCart}
            className={`
              rounded-lg
              px-3
              py-2.5
              text-sm
              font-semibold
              transition
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              ${
                addedToCart
                  ? "cursor-default bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-800 hover:bg-yellow-300"
              }
            `}
          >
            {addedToCart
              ? "Added to Cart"
              : "Add to Cart"}
          </button>

          <button
            type="button"
            onClick={handleBuyNow}
            className="
              rounded-lg
              bg-blue-600
              px-3
              py-2.5
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-blue-800
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          >
            Buy Now
          </button>
        </div>
      </div>
    </article>
  );
};


// ======================================================
// BOOK GRID
// ======================================================

const BookCard = ({
  books = [],
  headLine = "",
}) => {
  const validBooks = Array.isArray(books)
    ? books.filter((book) => book?._id)
    : [];

  return (
    <section className="w-full px-4 py-12 sm:px-6 lg:px-8 xl:px-12">
      <div className="mx-auto max-w-7xl">
        {headLine && (
          <div className="mb-8 text-center">
            <h2
              className="
                text-3xl
                font-bold
                text-gray-900
                sm:text-4xl
                lg:text-5xl
              "
            >
              {headLine}
            </h2>
          </div>
        )}

        {validBooks.length === 0 ? (
          <div className="rounded-xl bg-gray-50 py-12 text-center">
            <p className="text-gray-500">
              No books available.
            </p>
          </div>
        ) : (
          <div
            className="
              grid
              grid-cols-1
              gap-6
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
            "
          >
            {validBooks.map((book) => (
              <SingleBookCard
                key={book._id}
                book={book}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BookCard;

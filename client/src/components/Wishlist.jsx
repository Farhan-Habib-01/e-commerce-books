import { Link } from "react-router-dom";
import { FaHeart, FaTrash } from "react-icons/fa6";

import { useCart } from "../context/CartContext";

const Wishlist = () => {
  const {
    wishlistItems,
    removeFromWishlist,
    addToCart,
    isInCart,
  } = useCart();

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900">
            <FaHeart className="text-red-500" />
            My Wishlist
          </h1>

          <p className="mt-2 text-gray-500">
            {wishlistItems.length} saved book
            {wishlistItems.length !== 1 ? "s" : ""}
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="rounded-2xl bg-white px-5 py-16 text-center shadow-sm">
            <FaHeart className="mx-auto text-6xl text-gray-200" />

            <h2 className="mt-5 text-2xl font-bold text-gray-900">
              Your Wishlist Is Empty
            </h2>

            <p className="mt-2 text-gray-500">
              Save your favorite books here.
            </p>

            <Link
              to="/shop"
              className="
                mt-6
                inline-flex
                rounded-lg
                bg-blue-600
                px-6
                py-3
                font-semibold
                text-white
                hover:bg-blue-700
              "
            >
              Explore Books
            </Link>
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
            {wishlistItems.map((book) => {
              const alreadyInCart = isInCart(book._id);

              return (
                <article
                  key={book._id}
                  className="
                    overflow-hidden
                    rounded-2xl
                    bg-white
                    shadow-sm
                    transition
                    hover:-translate-y-1
                    hover:shadow-xl
                  "
                >
                  <div className="relative">
                    <img
                      src={book.imageURL}
                      alt={book.bookTitle}
                      className="h-72 w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeFromWishlist(book._id)
                      }
                      className="
                        absolute
                        right-3
                        top-3
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        bg-white
                        text-red-500
                        shadow-md
                        hover:bg-red-50
                      "
                      aria-label="Remove from wishlist"
                    >
                      <FaTrash />
                    </button>
                  </div>

                  <div className="p-5">
                    <h2 className="line-clamp-2 text-lg font-bold">
                      {book.bookTitle}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      By {book.authorName}
                    </p>

                    <p className="mt-3 font-bold">
                      ₹
                      {Number(
                        book.price || 0
                      ).toLocaleString("en-IN")}
                    </p>

                    <button
                      type="button"
                      disabled={alreadyInCart}
                      onClick={() =>
                        addToCart(book)
                      }
                      className={`
                        mt-5
                        w-full
                        rounded-lg
                        px-4
                        py-2.5
                        font-semibold
                        ${
                          alreadyInCart
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }
                      `}
                    >
                      {alreadyInCart
                        ? "Already in Cart"
                        : "Add to Cart"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default Wishlist;

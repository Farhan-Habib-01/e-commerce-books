import {
  FaBookOpen,
  FaArrowRight,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import BookCard from "../components/BookCard";
import useBooks from "../hooks/useBooks";

const BestSellerBook = () => {
  const {
    books,
    loading,
    error,
    retry,
  } = useBooks();

  /*
   * Prefer actual sales information when the
   * backend provides it.
   *
   * Supported fields:
   * salesCount
   * soldCount
   * orders
   *
   * Otherwise preserve the backend order.
   */

  const bestSellerBooks = [...books]
    .sort((a, b) => {
      const salesA = Number(
        a.salesCount ??
          a.soldCount ??
          a.orders ??
          0
      );

      const salesB = Number(
        b.salesCount ??
          b.soldCount ??
          b.orders ??
          0
      );

      return salesB - salesA;
    })
    .slice(0, 6);

  if (loading) {
    return (
      <section
        className="px-4 py-14 sm:px-6 lg:px-8"
        aria-label="Loading best sellers"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-xl text-center">
            <div className="mx-auto h-8 w-40 animate-pulse rounded-lg bg-gray-200" />

            <div className="mx-auto mt-3 h-4 w-64 animate-pulse rounded bg-gray-200" />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({
              length: 4,
            }).map((_, index) => (
              <div
                key={index}
                className="
                  h-[430px]
                  animate-pulse
                  rounded-2xl
                  bg-gray-200
                "
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div
            className="
              rounded-2xl
              border border-red-100
              bg-red-50
              p-6
            "
            role="alert"
          >
            <h2 className="font-bold text-red-700">
              Unable to load best sellers
            </h2>

            <p className="mt-2 text-sm text-red-600">
              {error}
            </p>

            <button
              type="button"
              onClick={retry}
              className="
                mt-5 rounded-xl
                bg-red-600 px-5 py-2.5
                text-sm font-bold
                text-white
                transition-all duration-300
                hover:-translate-y-0.5
                hover:bg-red-700
              "
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (bestSellerBooks.length === 0) {
    return (
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <FaBookOpen className="mx-auto text-4xl text-gray-300" />

          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            No books available
          </h2>

          <p className="mt-2 text-gray-500">
            Best sellers will appear here once
            books are available.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Readers' Choice
            </p>

            <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Best Seller Books
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
              Discover books that are getting the
              most attention from our readers.
            </p>
          </div>

          <Link
            to="/shop"
            className="
              inline-flex w-fit items-center
              gap-2 rounded-xl
              border border-blue-200
              px-4 py-2.5
              text-sm font-bold
              text-blue-600
              transition-all duration-300
              hover:-translate-y-0.5
              hover:bg-blue-50
            "
          >
            View All
            <FaArrowRight className="text-xs" />
          </Link>
        </div>

        <div className="home-section-enter">
          <BookCard
            books={bestSellerBooks}
            headLine=""
          />
        </div>
      </div>
    </section>
  );
};

export default BestSellerBook;


import {
  FaArrowRight,
  FaBookOpen,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import BookCard from "../components/BookCard";
import useBooks from "../hooks/useBooks";

const OtherBooks = () => {
  const {
    books,
    loading,
    error,
    retry,
  } = useBooks();

  const sortedBooks = [...books].sort(
    (a, b) => {
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
    }
  );

  const otherBooks =
    sortedBooks.length > 6
      ? sortedBooks.slice(6, 14)
      : sortedBooks;

  if (loading) {
    return (
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto h-8 w-44 animate-pulse rounded-lg bg-gray-200" />

          <div className="mx-auto mt-3 h-4 w-72 animate-pulse rounded bg-gray-200" />

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
              Unable to load more books
            </h2>

            <p className="mt-2 text-sm text-red-600">
              {error}
            </p>

            <button
              type="button"
              onClick={retry}
              className="
                mt-5 rounded-xl
                bg-blue-600 px-5 py-2.5
                text-sm font-bold text-white
                transition-all duration-300
                hover:-translate-y-0.5
                hover:bg-blue-700
              "
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (otherBooks.length === 0) {
    return (
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <FaBookOpen className="mx-auto text-4xl text-gray-300" />

          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            More books coming soon
          </h2>

          <p className="mt-2 text-gray-500">
            We're adding new books to the collection.
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
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">
              Keep Exploring
            </p>

            <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Other Books
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
              Explore more titles from our growing
              collection.
            </p>
          </div>

          <Link
            to="/shop"
            className="
              inline-flex w-fit items-center
              gap-2 rounded-xl
              border border-gray-200
              px-4 py-2.5
              text-sm font-bold text-gray-700
              transition-all duration-300
              hover:-translate-y-0.5
              hover:bg-gray-50
              hover:text-blue-600
            "
          >
            Explore Shop
            <FaArrowRight className="text-xs" />
          </Link>
        </div>

        <div className="home-section-enter">
          <BookCard
            books={otherBooks}
            headLine=""
          />
        </div>
      </div>
    </section>
  );
};

export default OtherBooks;

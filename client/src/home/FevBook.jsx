import {
  FaArrowRight,
  FaBookOpen,
  FaCheck,
  FaStar,
} from "react-icons/fa";

import { Link } from "react-router-dom";

const FevBook = () => {
  const categories = [
    "Fiction",
    "Programming",
    "Fantasy",
    "Business",
    "Science",
    "History",
  ];

  return (
    <section
      className="
        relative overflow-hidden
        px-4 py-16
        sm:px-6 sm:py-20
        lg:px-8 lg:py-24
        xl:px-12
      "
    >
      {/* Decorative background */}

      <div
        className="
          pointer-events-none
          absolute -left-24 top-10
          h-64 w-64 rounded-full
          bg-blue-100/50 blur-3xl
        "
        aria-hidden="true"
      />

      <div
        className="
          pointer-events-none
          absolute -bottom-24 right-0
          h-72 w-72 rounded-full
          bg-indigo-100/50 blur-3xl
        "
        aria-hidden="true"
      />

      <div
        className="
          relative mx-auto flex
          max-w-7xl flex-col
          items-center gap-10
          lg:flex-row lg:gap-16
        "
      >
        {/* IMAGE */}

        <div className="w-full lg:w-1/2">
          <div
            className="
              group relative mx-auto
              max-w-xl overflow-hidden
              rounded-[2rem]
              bg-gradient-to-br
              from-blue-50 to-indigo-100
              p-3 shadow-xl
            "
          >
            <div
              className="
                absolute inset-0
                bg-gradient-to-tr
                from-blue-600/10
                to-transparent
              "
              aria-hidden="true"
            />

            <img
              src="https://res.cloudinary.com/dwoqmrypu/image/upload/v1724518069/banner-pic_dlkaw1.png"
              alt="A collection of books for different interests"
              loading="lazy"
              decoding="async"
              className="
                relative h-auto w-full
                rounded-[1.5rem]
                object-cover
                transition-transform
                duration-700
                group-hover:scale-105
              "
            />

            {/* Floating badge */}

            <div
              className="
                absolute bottom-6 left-6
                flex items-center gap-3
                rounded-2xl bg-white/95
                px-4 py-3 shadow-xl
                backdrop-blur-sm
                soft-float
              "
            >
              <div
                className="
                  flex h-10 w-10
                  items-center justify-center
                  rounded-xl bg-blue-100
                  text-blue-600
                "
              >
                <FaBookOpen />
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500">
                  Discover
                </p>

                <p className="text-sm font-extrabold text-gray-900">
                  Your next great read
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}

        <div className="w-full lg:w-1/2">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-blue-700">
              <FaStar className="text-yellow-500" />
              For Every Reader
            </div>

            <h2
              className="
                mt-5 text-4xl
                font-extrabold
                leading-[1.05]
                tracking-tight
                text-gray-900
                sm:text-5xl
                lg:text-6xl
              "
            >
              Find Your
              <span className="block text-blue-600">
                Favorite Books
              </span>
            </h2>

            <p
              className="
                mt-6 text-base
                leading-7 text-gray-600
                sm:text-lg
              "
            >
              Discover your next favorite book from
              a growing collection of stories,
              knowledge and ideas. Whether you're
              into fiction, programming, history,
              business or fantasy, there's something
              waiting for you.
            </p>

            {/* Categories */}

            <div className="mt-7 flex flex-wrap gap-2">
              {categories.map(
                (category) => (
                  <span
                    key={category}
                    className="
                      rounded-full
                      border border-blue-100
                      bg-blue-50
                      px-3 py-1.5
                      text-xs font-bold
                      text-blue-700
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:bg-blue-100
                    "
                  >
                    {category}
                  </span>
                )
              )}
            </div>

            {/* FEATURES */}

            <div className="mt-8 grid grid-cols-1 gap-4 border-y border-gray-200 py-7 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <span
                  className="
                    flex h-9 w-9 shrink-0
                    items-center justify-center
                    rounded-full bg-green-100
                    text-green-600
                  "
                >
                  <FaCheck />
                </span>

                <div>
                  <h3 className="font-bold text-gray-900">
                    Curated Collection
                  </h3>

                  <p className="mt-1 text-sm leading-5 text-gray-500">
                    Browse books across popular
                    categories.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span
                  className="
                    flex h-9 w-9 shrink-0
                    items-center justify-center
                    rounded-full bg-blue-100
                    text-blue-600
                  "
                >
                  <FaCheck />
                </span>

                <div>
                  <h3 className="font-bold text-gray-900">
                    Easy Discovery
                  </h3>

                  <p className="mt-1 text-sm leading-5 text-gray-500">
                    Find the right book without the
                    clutter.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/shop"
                className="
                  group inline-flex
                  items-center
                  justify-center gap-2
                  rounded-xl
                  bg-blue-600
                  px-6 py-3.5
                  text-sm font-bold
                  text-white
                  shadow-lg
                  shadow-blue-100
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-blue-700
                  hover:shadow-xl
                "
              >
                Explore Books

                <FaArrowRight
                  className="
                    text-xs
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </Link>

              <Link
                to="/about"
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-xl
                  border border-gray-200
                  bg-white px-6 py-3.5
                  text-sm font-bold
                  text-gray-700
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-blue-200
                  hover:bg-blue-50
                  hover:text-blue-700
                "
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FevBook;
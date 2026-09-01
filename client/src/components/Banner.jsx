import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BannerCard from "./BannerCard";

const Banner = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();

    const searchValue = search.trim();

    if (!searchValue) {
      navigate("/shop");
      return;
    }

    navigate(
      `/shop?search=${encodeURIComponent(searchValue)}`
    );
  };

  return (
    <section className="w-full overflow-hidden bg-teal-100">
      <div
        className="
          mx-auto flex w-full max-w-7xl flex-col
          items-center justify-between gap-10
          px-4 py-24 sm:px-6 sm:py-28
          md:flex-row md:gap-12
          lg:px-8 lg:py-32
          xl:px-12
        "
      >
        {/* LEFT SIDE */}
        <div className="min-w-0 w-full md:w-1/2">

          <h1
            className="
              text-4xl font-bold leading-tight text-black
              sm:text-5xl md:text-5xl lg:text-6xl
            "
          >
            Buy and Sell Your Books{" "}
            <span className="text-blue-700">
              for the Best Prices
            </span>
          </h1>

          <p
            className="
              mt-6 max-w-2xl text-base leading-7
              text-gray-700 sm:text-lg sm:leading-8
            "
          >
            Discover your next great read or sell books
            you no longer need. Our online bookstore makes
            buying and selling books simple, convenient,
            and affordable.
          </p>

          {/* SEARCH */}
          <form
            onSubmit={handleSearch}
            className="
              mt-8 flex w-full max-w-xl
              flex-col gap-2 sm:flex-row sm:gap-0
            "
          >
            <label
              htmlFor="book-search"
              className="sr-only"
            >
              Search for a book
            </label>

            <input
              id="book-search"
              name="search"
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search a book..."
              autoComplete="off"
              className="
                min-w-0 w-full rounded-lg
                border border-gray-300 bg-white
                px-4 py-3 text-sm text-gray-900
                outline-none placeholder:text-gray-400
                focus:border-blue-500
                focus:ring-2 focus:ring-blue-200
                sm:rounded-r-none sm:text-base
              "
            />

            <button
              type="submit"
              className="
                w-full rounded-lg bg-blue-700
                px-6 py-3 text-sm font-semibold
                text-white transition duration-200
                hover:bg-blue-800
                focus:outline-none
                focus:ring-2 focus:ring-blue-500
                focus:ring-offset-2
                active:scale-[0.98]
                sm:w-auto sm:shrink-0
                sm:rounded-l-none
              "
            >
              Search
            </button>
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div
          className="
            flex w-full justify-center
            md:w-1/2 md:justify-end
          "
        >
          <div className="w-full max-w-md sm:max-w-lg">
            <BannerCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
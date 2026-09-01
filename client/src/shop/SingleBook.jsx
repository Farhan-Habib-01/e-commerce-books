import {
  useLoaderData,
  useNavigate,
} from "react-router-dom";

import {
  FaArrowLeft,
  FaShoppingCart,
  FaBolt,
} from "react-icons/fa";

import { useCart } from "../context/CartProvider";

const formatPrice = (value) => {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "₹0";
  }

  return `₹${number.toLocaleString(
    "en-IN",
    {
      maximumFractionDigits: 2,
    }
  )}`;
};

const FALLBACK_IMAGE =
  "https://via.placeholder.com/400x600?text=No+Image";

const SingleBook = () => {
  const book = useLoaderData();

  const navigate = useNavigate();

  const { addToCart } = useCart();

  if (!book) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-red-600">
            Book Not Found
          </h2>

          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white"
          >
            Back To Shop
          </button>
        </div>
      </div>
    );
  }

  const {
    _id,
    bookTitle,
    imageURL,
    authorName,
    category,
    bookDescription,
    totalprice,
    discountPercentage,
    price,
  } = book;

  const finalPrice =
    Number.isFinite(Number(price)) &&
    Number(price) >= 0
      ? Number(price)
      : Number(totalprice) -
        (Number(totalprice) *
          Number(discountPercentage || 0)) /
          100;

  const handleAddToCart = () => {
    const added = addToCart(book);

    if (added) {
      navigate("/cart");
    }
  };

  const handleBuyNow = () => {
    navigate("/checkout", {
      state: {
        book,
      },
    });
  };

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl pt-4">
        <button
          type="button"
          onClick={() => navigate("/shop")}
          className="
            inline-flex items-center gap-2
            text-sm font-semibold text-gray-500
            transition hover:text-blue-600
          "
        >
          <FaArrowLeft />
          Back to Shop
        </button>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          {/* PRODUCT */}

          <div
            className="
              overflow-hidden rounded-3xl
              bg-white p-5 shadow-sm
              sm:p-8
            "
          >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-[320px_1fr]">
              <div className="flex min-h-[400px] items-center justify-center rounded-2xl bg-gray-50 p-5">
                <img
                  src={
                    imageURL ||
                    FALLBACK_IMAGE
                  }
                  alt={
                    bookTitle ||
                    "Book cover"
                  }
                  className="
                    max-h-[420px] w-full
                    object-contain
                    transition-transform
                    duration-500
                    hover:scale-105
                  "
                />
              </div>

              <div className="flex flex-col justify-center">
                {category && (
                  <span className="w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700">
                    {category}
                  </span>
                )}

                <h1 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                  {bookTitle}
                </h1>

                <p className="mt-3 text-gray-500">
                  By{" "}
                  <span className="font-semibold text-gray-700">
                    {authorName}
                  </span>
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <span className="text-3xl font-extrabold text-gray-900">
                    {formatPrice(finalPrice)}
                  </span>

                  {Number(totalprice) >
                    finalPrice && (
                    <span className="text-lg text-gray-400 line-through">
                      {formatPrice(
                        totalprice
                      )}
                    </span>
                  )}

                  {Number(
                    discountPercentage
                  ) > 0 && (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-green-700">
                      {
                        discountPercentage
                      }
                      % OFF
                    </span>
                  )}
                </div>

                {bookDescription && (
                  <div className="mt-7">
                    <h2 className="text-lg font-bold">
                      Description
                    </h2>

                    <p className="mt-2 text-sm leading-7 text-gray-500 sm:text-base">
                      {bookDescription}
                    </p>
                  </div>
                )}

                <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={
                      handleAddToCart
                    }
                    className="
                      flex items-center
                      justify-center gap-2
                      rounded-xl
                      border-2
                      border-blue-600
                      px-5 py-3.5
                      font-bold text-blue-600
                      transition-all
                      hover:bg-blue-50
                    "
                  >
                    <FaShoppingCart />
                    Add To Cart
                  </button>

                  <button
                    type="button"
                    onClick={
                      handleBuyNow
                    }
                    className="
                      flex items-center
                      justify-center gap-2
                      rounded-xl
                      bg-blue-600 px-5 py-3.5
                      font-bold text-white
                      transition-all
                      hover:-translate-y-1
                      hover:bg-blue-700
                      hover:shadow-xl
                    "
                  >
                    <FaBolt />
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* PRICE DETAILS */}

          <aside className="h-fit rounded-3xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-extrabold">
              Price Details
            </h2>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">
                  MRP
                </span>

                <span className="font-semibold">
                  {formatPrice(totalprice)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Discount
                </span>

                <span className="font-semibold text-green-600">
                  -{" "}
                  {formatPrice(
                    Number(totalprice) -
                      finalPrice
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Delivery
                </span>

                <span className="font-semibold text-green-600">
                  Free
                </span>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-extrabold">
                  <span>Total</span>

                  <span className="text-blue-600">
                    {formatPrice(
                      finalPrice
                    )}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleBuyNow}
              className="
                mt-8 w-full rounded-xl
                bg-gray-900 px-5 py-3.5
                font-bold text-white
                transition-all duration-300
                hover:-translate-y-1
                hover:bg-gray-700
              "
            >
              Continue To Checkout
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default SingleBook;
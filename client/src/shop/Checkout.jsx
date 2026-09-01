import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  FaArrowLeft,
  FaCheckCircle,
} from "react-icons/fa";

import { useCart } from "../context/CartProvider";

const formatPrice = (value) => {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "₹0";
  }

  return `₹${number.toLocaleString("en-IN")}`;
};

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { cartItems, cartTotal } =
    useCart();

  const directBook =
    location.state?.book || null;

  const items = directBook
    ? [
        {
          ...directBook,
          quantity: 1,
        },
      ]
    : cartItems;

  const total = directBook
    ? Number(directBook.price || 0)
    : cartTotal;

  if (items.length === 0) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Nothing to checkout
          </h1>

          <button
            type="button"
            onClick={() =>
              navigate("/shop")
            }
            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white"
          >
            Go To Shop
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-1 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl pt-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="
            inline-flex items-center gap-2
            text-sm font-semibold text-gray-600
            hover:text-blue-600
          "
        >
          <FaArrowLeft />
          Back
        </button>

        <div className="mt-4">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Secure checkout
          </p>

          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
            Complete Your Order
          </h1>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
          <div className="rounded-2xl bg-white p-2 shadow-sm">
            <h2 className="text-xl font-bold">
              Order Items
            </h2>

            <div className="mt-6 space-y-4">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 border-b border-gray-100 pb-4"
                >
                  <img
                    src={item.imageURL}
                    alt={item.bookTitle}
                    className="h-72 w-46 rounded-lg object-contain bg-gray-50"
                  />

                  <div className="flex-1">
                    <h3 className="font-bold">
                      {item.bookTitle}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Quantity:{" "}
                      {item.quantity}
                    </p>

                    <p className="mt-2 font-bold text-blue-600">
                      {formatPrice(
                        Number(item.price) *
                          item.quantity
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">
              Payment Summary
            </h2>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Subtotal
                </span>

                <span className="font-semibold">
                  {formatPrice(total)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
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
                  <span>
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="
                mt-6 flex w-full
                items-center justify-center gap-2
                rounded-xl bg-blue-600
                px-5 py-3 font-bold text-white
                transition-all duration-300
                hover:-translate-y-1
                hover:bg-blue-800
                hover:shadow-lg
              "
            >
              <FaCheckCircle />
              Place Order
            </button>

            <p className="mt-4 text-center text-xs text-gray-400">
              Payment integration can be connected
              here later.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
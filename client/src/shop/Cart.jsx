import {
  FaMinus,
  FaPlus,
  FaTrash,
  FaArrowRight,
  FaShoppingCart,
} from "react-icons/fa";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useCart } from "../context/CartProvider";

const formatPrice = (value) => {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "₹0";
  }

  return `₹${number.toLocaleString("en-IN")}`;
};

const Cart = () => {
  const navigate = useNavigate();

  const {
    cartItems,
    cartCount,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <section className="min-h-screen bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-4xl pt-8 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <FaShoppingCart className="text-3xl" />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-gray-900 sm:text-4xl">
            Your Cart Is Empty
          </h1>

          <p className="mx-auto mt-3 max-w-md text-gray-500">
            Discover something new from our
            collection and add it to your cart.
          </p>

          <Link
            to="/shop"
            className="
              mt-8 inline-flex items-center
              gap-2 rounded-xl bg-blue-600
              px-6 py-3 font-bold text-white
              transition-all duration-300
              hover:-translate-y-1
              hover:bg-blue-700
              hover:shadow-lg
            "
          >
            Explore Books
            <FaArrowRight className="text-sm" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl pt-8">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Your collection
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>

          <p className="mt-2 text-gray-500">
            {cartCount}{" "}
            {cartCount === 1
              ? "item"
              : "items"}{" "}
            in your cart.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <article
                key={item._id}
                className="
                  flex flex-col gap-5
                  rounded-2xl bg-white
                  p-4 shadow-sm
                  sm:flex-row sm:items-center
                "
              >
                <img
                  src={item.imageURL}
                  alt={item.bookTitle}
                  className="
                    h-40 w-full rounded-xl
                    bg-gray-100 object-contain
                    p-2 sm:h-32 sm:w-24
                  "
                />

                <div className="min-w-0 flex-1">
                  <h2 className="line-clamp-2 font-bold text-gray-900">
                    {item.bookTitle}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {item.authorName}
                  </p>

                  <p className="mt-2 font-bold text-blue-600">
                    {formatPrice(item.price)}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                  <div className="flex items-center overflow-hidden rounded-lg border border-gray-200">
                    <button
                      type="button"
                      onClick={() =>
                        decreaseQuantity(item._id)
                      }
                      className="px-3 py-2 hover:bg-gray-50"
                      aria-label="Decrease quantity"
                    >
                      <FaMinus className="text-xs" />
                    </button>

                    <span className="min-w-10 px-2 text-center text-sm font-bold">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        increaseQuantity(item._id)
                      }
                      className="px-3 py-2 hover:bg-gray-50"
                      aria-label="Increase quantity"
                    >
                      <FaPlus className="text-xs" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      removeFromCart(item._id)
                    }
                    className="text-red-500 transition hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </article>
            ))}

            <button
              type="button"
              onClick={clearCart}
              className="text-sm font-semibold text-red-500 hover:text-red-700"
            >
              Clear cart
            </button>
          </div>

          <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4 border-b border-gray-100 pb-5 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">
                  Items
                </span>

                <span className="font-semibold">
                  {cartCount}
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
            </div>

            <div className="mt-5 flex justify-between text-lg font-extrabold">
              <span>Total</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate("/checkout")
              }
              className="
                mt-6 flex w-full
                items-center justify-center
                gap-2 rounded-xl
                bg-blue-600 px-5 py-3
                font-bold text-white
                transition-all duration-300
                hover:-translate-y-1
                hover:bg-blue-700
                hover:shadow-lg
              "
            >
              Proceed to Checkout
              <FaArrowRight />
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Cart;
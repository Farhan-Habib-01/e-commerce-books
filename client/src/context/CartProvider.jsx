import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// =====================================================
// CART CONTEXT
// =====================================================

const CartContext = createContext(null);

// =====================================================
// STORAGE KEYS
// =====================================================

const CART_STORAGE_KEY = "bookstore_cart";
const WISHLIST_STORAGE_KEY = "bookstore_wishlist";

// =====================================================
// STORAGE HELPER
// =====================================================

const readStorage = (key) => {
  try {
    const savedData = localStorage.getItem(key);

    if (!savedData) {
      return [];
    }

    const parsedData = JSON.parse(savedData);

    return Array.isArray(parsedData) ? parsedData : [];
  } catch (error) {
    console.error(`Failed to read ${key}:`, error);
    return [];
  }
};

// =====================================================
// SAVE STORAGE HELPER
// =====================================================

const saveStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Failed to save ${key}:`, error);
    return false;
  }
};

// =====================================================
// NORMALIZE QUANTITY
// =====================================================

const normalizeQuantity = (quantity) => {
  const value = Math.floor(Number(quantity));

  if (!Number.isFinite(value) || value < 1) {
    return 1;
  }

  return value;
};

// =====================================================
// PROVIDER
// =====================================================

export const CartProvider = ({ children }) => {
  // ===================================================
  // CART STATE
  // ===================================================

  const [cartItems, setCartItems] = useState(() =>
    readStorage(CART_STORAGE_KEY)
  );

  // ===================================================
  // WISHLIST STATE
  // ===================================================

  const [wishlistItems, setWishlistItems] = useState(() =>
    readStorage(WISHLIST_STORAGE_KEY)
  );

  // ===================================================
  // SAVE CART
  // ===================================================

  useEffect(() => {
    const saved = saveStorage(
      CART_STORAGE_KEY,
      cartItems
    );

    if (saved) {
      // Notify other components in the same browser tab.
      window.dispatchEvent(new Event("cartUpdated"));
    }
  }, [cartItems]);

  // ===================================================
  // SAVE WISHLIST
  // ===================================================

  useEffect(() => {
    const saved = saveStorage(
      WISHLIST_STORAGE_KEY,
      wishlistItems
    );

    if (saved) {
      // Notify other components in the same browser tab.
      window.dispatchEvent(new Event("wishlistUpdated"));
    }
  }, [wishlistItems]);

  // ===================================================
  // ADD TO CART
  // ===================================================

  const addToCart = useCallback((book) => {
    if (!book?._id) {
      console.error(
        "Cannot add invalid book to cart:",
        book
      );
      return false;
    }

    setCartItems((previousItems) => {
      const existingBook = previousItems.find(
        (item) => item._id === book._id
      );

      if (existingBook) {
        return previousItems.map((item) =>
          item._id === book._id
            ? {
                ...item,
                quantity:
                  normalizeQuantity(item.quantity) + 1,
              }
            : item
        );
      }

      return [
        ...previousItems,
        {
          ...book,
          quantity: 1,
        },
      ];
    });

    return true;
  }, []);

  // ===================================================
  // REMOVE FROM CART
  // ===================================================

  const removeFromCart = useCallback((bookId) => {
    if (!bookId) {
      return;
    }

    setCartItems((previousItems) =>
      previousItems.filter(
        (item) => item._id !== bookId
      )
    );
  }, []);

  // ===================================================
  // UPDATE CART QUANTITY
  // ===================================================

  const updateQuantity = useCallback(
    (bookId, quantity) => {
      if (!bookId) {
        return;
      }

      const value = Math.floor(Number(quantity));

      if (!Number.isFinite(value)) {
        return;
      }

      if (value <= 0) {
        removeFromCart(bookId);
        return;
      }

      setCartItems((previousItems) =>
        previousItems.map((item) =>
          item._id === bookId
            ? {
                ...item,
                quantity: value,
              }
            : item
        )
      );
    },
    [removeFromCart]
  );

  // ===================================================
  // INCREASE QUANTITY
  // ===================================================

  const increaseQuantity = useCallback((bookId) => {
    if (!bookId) {
      return;
    }

    setCartItems((previousItems) =>
      previousItems.map((item) =>
        item._id === bookId
          ? {
              ...item,
              quantity:
                normalizeQuantity(item.quantity) + 1,
            }
          : item
      )
    );
  }, []);

  // ===================================================
  // DECREASE QUANTITY
  // ===================================================

  const decreaseQuantity = useCallback((bookId) => {
  if (!bookId) {
    return;
  }

  setCartItems((previousItems) =>
    previousItems.flatMap((item) => {
      if (item._id !== bookId) {
        return [item];
      }

      const quantity = normalizeQuantity(
        item.quantity
      );

      if (quantity <= 1) {
        return [];
      }

      return [
        {
          ...item,
          quantity: quantity - 1,
        },
      ];
    })
  );
}, []);

  // ===================================================
  // CLEAR CART
  // ===================================================

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // ===================================================
  // CHECK ITEM IN CART
  // ===================================================

  const isInCart = useCallback(
    (bookId) => {
      if (!bookId) {
        return false;
      }

      return cartItems.some(
        (item) => item._id === bookId
      );
    },
    [cartItems]
  );

  // ===================================================
  // GET CART ITEM QUANTITY
  // ===================================================

  const getCartItemQuantity = useCallback(
    (bookId) => {
      const item = cartItems.find(
        (cartItem) => cartItem._id === bookId
      );

      return item ? normalizeQuantity(item.quantity) : 0;
    },
    [cartItems]
  );

  // ===================================================
  // TOGGLE WISHLIST
  // ===================================================

  const toggleWishlist = useCallback((book) => {
    if (!book?._id) {
      console.error(
        "Cannot add invalid book to wishlist:",
        book
      );
      return false;
    }

    setWishlistItems((previousItems) => {
      const exists = previousItems.some(
        (item) => item._id === book._id
      );

      if (exists) {
        return previousItems.filter(
          (item) => item._id !== book._id
        );
      }

      return [...previousItems, book];
    });

    return true;
  }, []);

  // ===================================================
  // CHECK ITEM IN WISHLIST
  // ===================================================

  const isInWishlist = useCallback(
    (bookId) => {
      if (!bookId) {
        return false;
      }

      return wishlistItems.some(
        (item) => item._id === bookId
      );
    },
    [wishlistItems]
  );

  // ===================================================
  // REMOVE FROM WISHLIST
  // ===================================================

  const removeFromWishlist = useCallback((bookId) => {
    if (!bookId) {
      return;
    }

    setWishlistItems((previousItems) =>
      previousItems.filter(
        (item) => item._id !== bookId
      )
    );
  }, []);

  // ===================================================
  // CLEAR WISHLIST
  // ===================================================

  const clearWishlist = useCallback(() => {
    setWishlistItems([]);
  }, []);

  // ===================================================
  // CART COUNT
  // ===================================================

  const cartCount = useMemo(() => {
    return cartItems.reduce(
      (total, item) =>
        total + normalizeQuantity(item.quantity),
      0
    );
  }, [cartItems]);

  // ===================================================
  // CART TOTAL
  // ===================================================

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = Number(item.price);

      if (!Number.isFinite(price) || price < 0) {
        return total;
      }

      return (
        total +
        price * normalizeQuantity(item.quantity)
      );
    }, 0);
  }, [cartItems]);

  // ===================================================
  // WISHLIST COUNT
  // ===================================================

  const wishlistCount = useMemo(
    () => wishlistItems.length,
    [wishlistItems]
  );

  // ===================================================
  // CONTEXT VALUE
  // ===================================================

  const value = useMemo(
    () => ({
      // State
      cartItems,
      wishlistItems,

      // Counts
      cartCount,
      wishlistCount,

      // Totals
      cartTotal,

      // Cart
      addToCart,
      removeFromCart,
      updateQuantity,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      isInCart,
      getCartItemQuantity,

      // Wishlist
      toggleWishlist,
      isInWishlist,
      removeFromWishlist,
      clearWishlist,
    }),
    [
      cartItems,
      wishlistItems,
      cartCount,
      wishlistCount,
      cartTotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      isInCart,
      getCartItemQuantity,
      toggleWishlist,
      isInWishlist,
      removeFromWishlist,
      clearWishlist,
    ]
  );

  // ===================================================
  // PROVIDER
  // ===================================================

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// =====================================================
// CUSTOM HOOK
// =====================================================

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider. " +
        "Make sure your component is wrapped with <CartProvider>."
    );
  }

  return context;
};

// =====================================================
// DEFAULT EXPORT
// =====================================================

export default CartProvider;

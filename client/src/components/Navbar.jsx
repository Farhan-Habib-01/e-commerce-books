import { useContext, useEffect, useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
} from "react-router-dom";

import {
  FaArrowRight,
  FaBars,
  FaBookOpen,
  FaChevronDown,
  FaShoppingCart,
  FaTimes,
  FaUser,
  FaUserPlus,
} from "react-icons/fa";

import { AuthContext } from "../context/AuthProvider";
import { useCart } from "../context/CartProvider";

const Navbar = () => {
  const {
    user,
    loading: authLoading,
    logOut,
  } = useContext(AuthContext);

  const { cartCount } = useCart();

  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  const [isAccountOpen, setIsAccountOpen] =
    useState(false);

  const [showLogoutModal, setShowLogoutModal] =
    useState(false);

  const [loggingOut, setLoggingOut] =
    useState(false);

  const [isSticky, setIsSticky] =
    useState(false);

  // ==========================================
  // STICKY NAVBAR
  // ==========================================

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 30);
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  // ==========================================
  // CLOSE MOBILE MENU ON ROUTE CHANGE
  // ==========================================

  useEffect(() => {
    setIsMenuOpen(false);
    setIsAccountOpen(false);
  }, [location.pathname]);

  // ==========================================
  // ESCAPE KEY
  // ==========================================

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        setIsAccountOpen(false);
        setShowLogoutModal(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = async () => {
    if (loggingOut) return;

    try {
      setLoggingOut(true);

      await logOut();

      setShowLogoutModal(false);
      setIsAccountOpen(false);
      setIsMenuOpen(false);

      // Go to home after logout
      window.location.href = "/";
    } catch (error) {
      console.error(
        "Logout error:",
        error
      );
    } finally {
      setLoggingOut(false);
    }
  };

  // ==========================================
  // NAV ITEMS
  // ==========================================

  const navItems = [
    {
      label: "Home",
      path: "/",
      end: true,
    },
    {
      label: "Shop",
      path: "/shop",
    },
    {
      label: "About",
      path: "/about",
    },
    {
      label: "Contact",
      path: "/contact-us",
    },
    {
      label: "Blog",
      path: "/blog",
    },
  ];

  const navClass = ({ isActive }) =>
    `
      group relative py-2 text-sm font-bold
      uppercase tracking-wide
      transition-all duration-300
      ${
        isActive
          ? "text-blue-600"
          : "text-gray-700 hover:text-blue-600"
      }
    `;

  return (
    <>
      {/* ======================================
          NAVBAR
      ====================================== */}

      <header
        className={`
          fixed inset-x-0 top-0 z-50
          transition-all duration-500
          ${
            isSticky
              ? "bg-white/90 shadow-lg backdrop-blur-xl"
              : "bg-white/80 backdrop-blur-md"
          }
        `}
      >
        <nav
          className={`
            mx-auto max-w-7xl px-4
            transition-all duration-500
            sm:px-6 lg:px-8
            ${
              isSticky
                ? "py-3"
                : "py-4 sm:py-5"
            }
          `}
        >
          <div className="flex items-center justify-between gap-3">
            
            {/* ==================================
                LOGO
            ================================== */}

            <Link
              to="/"
              className="group flex shrink-0 items-center gap-2"
            >
              <div
                className="
                  relative flex h-10 w-10
                  items-center justify-center
                  rounded-xl
                  bg-gradient-to-br
                  from-blue-600 to-indigo-700
                  text-white shadow-lg
                  transition-all duration-300
                  group-hover:-rotate-6
                  group-hover:scale-110
                  sm:h-11 sm:w-11
                "
              >
                <FaBookOpen className="text-lg sm:text-xl" />

                <span
                  className="
                    absolute -right-1 -top-1
                    h-3 w-3 rounded-full
                    bg-yellow-400 ring-2 ring-white
                  "
                />
              </div>

              <div className="hidden sm:block">
                <span className="block text-xl font-extrabold leading-none">
                  Book<span className="text-blue-600">Nest</span>
                </span>

                <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                  Read • Discover • Share
                </span>
              </div>
            </Link>

            {/* ==================================
                DESKTOP NAV
            ================================== */}

            <ul className="hidden items-center gap-6 md:flex lg:gap-8">
              {navItems.map(
                ({ label, path, end }) => (
                  <li key={path}>
                    <NavLink
                      to={path}
                      end={end}
                      className={navClass}
                    >
                      {label}

                      <span
                        className="
                          absolute bottom-0 left-0
                          h-[2px] w-0 rounded-full
                          bg-blue-600
                          transition-all duration-300
                          group-hover:w-full
                        "
                      />
                    </NavLink>
                  </li>
                )
              )}

              {/* Dashboard only when logged in */}
              {user && (
                <li>
                  <NavLink
                    to="/admin/dashboard"
                    className={navClass}
                  >
                    Dashboard

                    <span
                      className="
                        absolute bottom-0 left-0
                        h-[2px] w-0 rounded-full
                        bg-blue-600
                        transition-all duration-300
                        group-hover:w-full
                      "
                    />
                  </NavLink>
                </li>
              )}
            </ul>

            {/* ==================================
                ACTIONS
            ================================== */}

            <div className="flex items-center gap-2">
              
              {/* CART */}

              <Link
                to="/cart"
                className="
                  relative flex h-10 w-10
                  items-center justify-center
                  rounded-full
                  border border-gray-200
                  bg-white text-gray-700
                  shadow-sm
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-blue-200
                  hover:bg-blue-50
                  hover:text-blue-600
                "
                aria-label="Shopping cart"
              >
                <FaShoppingCart />

                {cartCount > 0 && (
                  <span
                    className="
                      absolute -right-1 -top-1
                      flex h-5 min-w-5
                      items-center justify-center
                      rounded-full bg-red-500
                      px-1 text-[10px]
                      font-bold text-white
                      ring-2 ring-white
                    "
                  >
                    {cartCount > 99
                      ? "99+"
                      : cartCount}
                  </span>
                )}
              </Link>

              {/* ==================================
                  DESKTOP AUTH
              ================================== */}

              {!authLoading && (
                <div className="relative hidden md:block">
                  
                  {user ? (
                    <div className="relative">
                      
                      {/* ACCOUNT BUTTON */}

                      <button
                        type="button"
                        onClick={() =>
                          setIsAccountOpen(
                            (prev) => !prev
                          )
                        }
                        className="
                          flex items-center gap-2
                          rounded-full
                          border border-gray-200
                          bg-white
                          px-4 py-2
                          text-sm font-bold
                          text-gray-700
                          shadow-sm
                          transition-all duration-300
                          hover:-translate-y-0.5
                          hover:border-blue-300
                          hover:bg-blue-50
                        "
                      >
                        <span
                          className="
                            flex h-7 w-7
                            items-center justify-center
                            rounded-full
                            bg-gradient-to-br
                            from-blue-500
                            to-indigo-600
                            text-white
                          "
                        >
                          <FaUser className="text-xs" />
                        </span>

                        <span className="max-w-[100px] truncate">
                          {user.displayName ||
                            "Account"}
                        </span>

                        <FaChevronDown
                          className={`
                            text-xs
                            transition-transform duration-300
                            ${
                              isAccountOpen
                                ? "rotate-180"
                                : ""
                            }
                          `}
                        />
                      </button>

                      {/* ACCOUNT DROPDOWN */}

                      <div
                        className={`
                          absolute right-0 top-full
                          mt-3 w-64
                          origin-top-right
                          rounded-2xl
                          border border-white/70
                          bg-white/90
                          p-2
                          shadow-2xl
                          backdrop-blur-xl
                          transition-all duration-300
                          ${
                            isAccountOpen
                              ? "visible translate-y-0 scale-100 opacity-100"
                              : "invisible -translate-y-3 scale-95 opacity-0"
                          }
                        `}
                      >
                        <div
                          className="
                            mb-2 rounded-xl
                            bg-gradient-to-r
                            from-blue-50 to-cyan-50
                            p-3
                          "
                        >
                          <p className="text-xs text-gray-500">
                            Signed in as
                          </p>

                          <p className="truncate text-sm font-bold text-gray-900">
                            {user.displayName ||
                              user.email ||
                              "Account"}
                          </p>

                          {user.email && (
                            <p className="mt-1 truncate text-xs text-gray-500">
                              {user.email}
                            </p>
                          )}
                        </div>

                        {/* Dashboard */}

                        <Link
                          to="/admin/dashboard"
                          onClick={() =>
                            setIsAccountOpen(false)
                          }
                          className="
                            flex items-center gap-3
                            rounded-xl px-3 py-3
                            text-sm font-semibold
                            text-gray-700
                            transition-all duration-200
                            hover:bg-blue-50
                            hover:text-blue-700
                          "
                        >
                          📊
                          <span>
                            Dashboard
                          </span>
                        </Link>

                        {/* Logout */}

                        <button
                          type="button"
                          onClick={() =>
                            setShowLogoutModal(true)
                          }
                          className="
                            flex w-full items-center
                            gap-3 rounded-xl
                            px-3 py-3
                            text-left text-sm
                            font-semibold text-red-600
                            transition-all duration-200
                            hover:bg-red-50
                          "
                        >
                          🚪
                          <span>
                            Logout
                          </span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      
                      {/* LOGIN */}

                      <Link
                        to="/login"
                        className="
                          rounded-full
                          border border-gray-200
                          bg-white
                          px-4 py-2
                          text-sm font-bold
                          text-gray-700
                          transition-all duration-300
                          hover:-translate-y-1
                          hover:border-blue-300
                          hover:bg-blue-50
                          hover:text-blue-700
                        "
                      >
                        Login
                      </Link>

                      {/* SIGN UP */}

                      <Link
                        to="/sign-up"
                        className="
                          group flex items-center gap-2
                          rounded-full
                          bg-gradient-to-r
                          from-blue-600 to-indigo-600
                          px-5 py-2.5
                          text-sm font-bold text-white
                          shadow-lg
                          transition-all duration-300
                          hover:-translate-y-1
                          hover:shadow-xl
                        "
                      >
                        <FaUserPlus className="text-xs" />

                        Sign Up

                        <FaArrowRight
                          className="
                            text-xs
                            transition-transform duration-300
                            group-hover:translate-x-1
                          "
                        />
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* ==================================
                  MOBILE MENU BUTTON
              ================================== */}

              <button
                type="button"
                onClick={() =>
                  setIsMenuOpen(
                    (prev) => !prev
                  )
                }
                className="
                  flex h-10 w-10
                  items-center justify-center
                  rounded-full
                  border border-gray-200
                  bg-white text-gray-700
                  shadow-sm
                  transition-all duration-300
                  hover:border-blue-200
                  hover:bg-blue-50
                  hover:text-blue-600
                  md:hidden
                "
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <FaTimes />
                ) : (
                  <FaBars />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* ======================================
            MOBILE MENU
        ====================================== */}

        <div
          className={`
            overflow-hidden border-t
            border-gray-100
            bg-white/95
            backdrop-blur-xl
            transition-all duration-500
            md:hidden
            ${
              isMenuOpen
                ? "max-h-[900px] opacity-100"
                : "max-h-0 opacity-0"
            }
          `}
        >
          <div className="px-4 pb-6 pt-3 sm:px-6">
            
            <div className="space-y-2">
              {navItems.map(
                ({ label, path, end }) => (
                  <NavLink
                    key={path}
                    to={path}
                    end={end}
                    className={({ isActive }) =>
                      `
                        flex items-center
                        justify-between
                        rounded-xl px-4 py-3.5
                        text-sm font-bold
                        uppercase tracking-wide
                        transition-all duration-300
                        ${
                          isActive
                            ? "bg-blue-50 text-blue-700"
                            : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                        }
                      `
                    }
                  >
                    {label}

                    <FaArrowRight className="text-xs opacity-50" />
                  </NavLink>
                )
              )}

              {/* MOBILE DASHBOARD */}

              {user && (
                <NavLink
                  to="/admin/dashboard"
                  className={({ isActive }) =>
                    `
                      flex items-center
                      justify-between rounded-xl
                      px-4 py-3.5
                      text-sm font-bold uppercase
                      transition-all
                      ${
                        isActive
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                      }
                    `
                  }
                >
                  Dashboard
                  <FaArrowRight className="text-xs opacity-50" />
                </NavLink>
              )}
            </div>

            {/* MOBILE ACCOUNT */}

            <div className="mt-4 border-t border-gray-100 pt-4">
              {user ? (
                <div className="space-y-2">
                  
                  {/* Account */}

                  <div
                    className="
                      rounded-xl
                      bg-gradient-to-r
                      from-blue-50
                      to-cyan-50
                      p-4
                    "
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          flex h-10 w-10
                          items-center justify-center
                          rounded-full
                          bg-gradient-to-br
                          from-blue-500
                          to-indigo-600
                          text-white
                        "
                      >
                        <FaUser />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs text-gray-500">
                          Account
                        </p>

                        <p className="truncate text-sm font-bold text-gray-900">
                          {user.displayName ||
                            "User"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Cart */}

                  <Link
                    to="/cart"
                    className="
                      flex items-center
                      justify-between
                      rounded-xl
                      bg-gray-50
                      px-4 py-3
                      font-semibold
                      text-gray-700
                    "
                  >
                    <span>
                      🛒 Shopping Cart
                    </span>

                    <span
                      className="
                        rounded-full
                        bg-red-500 px-2 py-1
                        text-xs font-bold
                        text-white
                      "
                    >
                      {cartCount}
                    </span>
                  </Link>

                  {/* Logout */}

                  <button
                    type="button"
                    onClick={() =>
                      setShowLogoutModal(true)
                    }
                    className="
                      flex w-full items-center
                      justify-center gap-2
                      rounded-xl
                      bg-red-50
                      px-4 py-3
                      text-sm font-bold
                      text-red-600
                      transition-all
                      hover:bg-red-100
                    "
                  >
                    🚪 Logout
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  
                  <Link
                    to="/login"
                    className="
                      flex items-center
                      justify-center
                      rounded-xl
                      border border-gray-200
                      px-4 py-3
                      text-sm font-semibold
                      transition-all
                      hover:bg-gray-50
                    "
                  >
                    Login
                  </Link>

                  <Link
                    to="/sign-up"
                    className="
                      flex items-center
                      justify-center
                      rounded-xl
                      bg-blue-600
                      px-4 py-3
                      text-sm font-bold
                      text-white
                      transition-all
                      hover:bg-blue-700
                    "
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ========================================
          LOGOUT CONFIRMATION MODAL
      ======================================== */}

      {showLogoutModal && (
        <div
          className="
            fixed inset-0 z-[100]
            flex items-center justify-center
            bg-slate-950/50
            px-4
            backdrop-blur-sm
          "
          onClick={() =>
            setShowLogoutModal(false)
          }
        >
          <div
            onClick={(event) =>
              event.stopPropagation()
            }
            className="
              w-full max-w-sm
              animate-[fadeIn_0.25s_ease-out]
              rounded-3xl
              border border-white/70
              bg-white/90
              p-6
              shadow-2xl
              backdrop-blur-xl
              sm:p-7
            "
          >
            {/* Icon */}

            <div
              className="
                mx-auto mb-5
                flex h-16 w-16
                items-center justify-center
                rounded-full
                bg-red-100
                text-2xl
                shadow-inner
              "
            >
              🚪
            </div>

            <h2
              className="
                text-center
                text-xl font-extrabold
                text-gray-900
              "
            >
              Logout?
            </h2>

            <p
              className="
                mt-2 text-center
                text-sm leading-6
                text-gray-500
              "
            >
              Are you sure you want to
              logout from your account?
            </p>

            {/* Buttons */}

            <div
              className="
                mt-6 grid
                grid-cols-2 gap-3
              "
            >
              <button
                type="button"
                onClick={() =>
                  setShowLogoutModal(false)
                }
                disabled={loggingOut}
                className="
                  rounded-xl
                  border border-gray-200
                  bg-white
                  px-4 py-3
                  text-sm font-bold
                  text-gray-700
                  transition-all duration-300
                  hover:bg-gray-50
                  active:scale-95
                  disabled:opacity-50
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="
                  flex items-center
                  justify-center gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-red-500 to-rose-600
                  px-4 py-3
                  text-sm font-bold
                  text-white
                  shadow-lg
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:shadow-xl
                  active:scale-95
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {loggingOut ? (
                  <>
                    <span
                      className="
                        h-4 w-4
                        animate-spin
                        rounded-full
                        border-2
                        border-white/30
                        border-t-white
                      "
                    />

                    Logging out...
                  </>
                ) : (
                  "Yes, Logout"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const AccountMenu = () => {
  const {
    user,
    logOut,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [confirmLogout, setConfirmLogout] =
    useState(false);
  const [loading, setLoading] =
    useState(false);

  const menuRef = useRef(null);

  // Close dropdown outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleLogout = async () => {
    if (loading) return;

    try {
      setLoading(true);

      await logOut();

      setConfirmLogout(false);
      setOpen(false);

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error(
        "Logout error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // NOT LOGGED IN
  // =========================================

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          to="/login"
          className="
            rounded-xl
            border
            border-white/40
            bg-white/20
            px-3
            py-2
            text-sm
            font-semibold
            text-white
            backdrop-blur-md
            transition
            hover:bg-white/30
          "
        >
          Login
        </Link>

        <Link
          to="/sign-up"
          className="
            rounded-xl
            bg-white
            px-3
            py-2
            text-sm
            font-bold
            text-sky-700
            shadow-md
            transition
            hover:-translate-y-0.5
            hover:shadow-lg
          "
        >
          Sign Up
        </Link>
      </div>
    );
  }

  const displayName =
    user.displayName ||
    user.email?.split("@")[0] ||
    "Account";

  const photo =
    user.photoURL;

  return (
    <>
      <div
        ref={menuRef}
        className="relative"
      >
        {/* Account button */}
        <button
          type="button"
          onClick={() =>
            setOpen((value) => !value)
          }
          className="
            flex
            items-center
            gap-2
            rounded-2xl
            border
            border-white/40
            bg-white/20
            px-2
            py-1.5
            text-white
            shadow-md
            backdrop-blur-md
            transition-all
            duration-300
            hover:bg-white/30
          "
        >
          {photo ? (
            <img
              src={photo}
              alt={displayName}
              className="h-9 w-9 rounded-full object-cover ring-2 ring-white/60"
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/30 font-bold">
              {displayName
                .charAt(0)
                .toUpperCase()}
            </div>
          )}

          <span className="hidden max-w-[120px] truncate text-sm font-semibold sm:block">
            {displayName}
          </span>

          <svg
            className={`h-4 w-4 transition-transform ${
              open
                ? "rotate-180"
                : ""
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Dropdown */}
        {open && (
          <div
            className="
              absolute
              right-0
              z-50
              mt-3
              w-64
              origin-top-right
              animate-[fadeIn_0.2s_ease-out]
              overflow-hidden
              rounded-2xl
              border
              border-white/60
              bg-white/70
              p-2
              shadow-[0_20px_60px_rgba(0,80,150,0.2)]
              backdrop-blur-2xl
            "
          >
            {/* User info */}
            <div className="border-b border-slate-200/60 px-3 py-3">
              <p className="truncate text-sm font-bold text-slate-800">
                {displayName}
              </p>

              <p className="truncate text-xs text-slate-500">
                {user.email}
              </p>
            </div>

            {/* Dashboard */}
            <Link
              to="/admin/dashboard"
              onClick={() =>
                setOpen(false)
              }
              className="
                mt-2
                flex
                items-center
                gap-3
                rounded-xl
                px-3
                py-2.5
                text-sm
                font-semibold
                text-slate-700
                transition
                hover:bg-sky-100
                hover:text-sky-700
              "
            >
              📊
              Dashboard
            </Link>

            {/* Logout */}
            <button
              type="button"
              onClick={() =>
                setConfirmLogout(true)
              }
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                px-3
                py-2.5
                text-left
                text-sm
                font-semibold
                text-red-600
                transition
                hover:bg-red-50
              "
            >
              🚪
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Logout confirmation */}
      {confirmLogout && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-slate-950/40
            px-4
            backdrop-blur-sm
          "
        >
          <div
            className="
              w-full
              max-w-sm
              animate-[fadeIn_0.25s_ease-out]
              rounded-3xl
              border
              border-white/60
              bg-white/80
              p-6
              text-center
              shadow-[0_25px_80px_rgba(0,50,100,0.25)]
              backdrop-blur-2xl
              sm:p-7
            "
          >
            {/* Icon */}
            <div
              className="
                mx-auto
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-full
                bg-red-100
                text-2xl
                animate-[float_3s_ease-in-out_infinite]
              "
            >
              🚪
            </div>

            <h2 className="mt-5 text-xl font-extrabold text-slate-900">
              Are you sure?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Are you sure you want to log
              out of your account?
            </p>

            {/* Buttons */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() =>
                  setConfirmLogout(false)
                }
                disabled={loading}
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-3
                  text-sm
                  font-bold
                  text-slate-700
                  transition
                  hover:bg-slate-50
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleLogout}
                disabled={loading}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-red-500
                  to-rose-600
                  px-4
                  py-3
                  text-sm
                  font-bold
                  text-white
                  shadow-lg
                  transition
                  hover:-translate-y-0.5
                  hover:shadow-xl
                  active:scale-95
                  disabled:opacity-60
                "
              >
                {loading && (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                )}

                {loading
                  ? "Logging out..."
                  : "Yes, Logout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountMenu;
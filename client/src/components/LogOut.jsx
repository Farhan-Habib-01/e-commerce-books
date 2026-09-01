import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const LogOut = () => {
  const { logOut } = useContext(AuthContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    if (loading) return;

    setError("");

    try {
      setLoading(true);

      await logOut();

      // Redirect after successful logout
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);

      setError(
        error?.message ||
          "Unable to log out. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-teal-50 via-white to-blue-50 px-4 py-8 sm:px-6 lg:px-8">
      <section className="w-full max-w-sm">
        <div className="rounded-2xl bg-white p-6 text-center shadow-lg ring-1 ring-gray-200 sm:p-8">

          {/* Icon */}
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-7 w-7 text-red-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
            Sign out
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500 sm:text-base">
            Are you sure you want to log out of your account?
          </p>

          {/* Error */}
          {error && (
            <div
              role="alert"
              className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-left text-sm leading-5 text-red-700"
            >
              {error}
            </div>
          )}

          {/* Logout Button */}
          <button
            type="button"
            onClick={handleLogout}
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <svg
                  className="mr-2 h-5 w-5 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />

                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>

                Logging out...
              </>
            ) : (
              "Log out"
            )}
          </button>
        </div>
      </section>
    </main>
  );
};

export default LogOut;
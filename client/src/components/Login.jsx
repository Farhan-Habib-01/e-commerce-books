import { useContext, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { AuthContext } from "../context/AuthProvider";
import AuthWaterBackground from "../components/AuthWaterBackground";

const Login = () => {
  const {
    login,
    loginWithGoogle,
  } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] =
    useState(false);
  const [error, setError] = useState("");

  const redirectPath =
    location.state?.from?.pathname ||
    "/admin/dashboard";

  const disabled =
    loading || googleLoading;

  // =========================================
  // LOGIN
  // =========================================

  const handleLogin = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    const email =
      form.email.value.trim();

    const password =
      form.password.value;

    try {
      setLoading(true);
      setError("");

      await login(email, password);

      navigate(redirectPath, {
        replace: true,
      });
    } catch (error) {
      console.error(error);

      switch (error?.code) {
        case "auth/invalid-credential":
          setError(
            "Invalid email or password."
          );
          break;

        case "auth/user-not-found":
          setError(
            "No account found with this email."
          );
          break;

        case "auth/wrong-password":
          setError(
            "Incorrect password."
          );
          break;

        case "auth/too-many-requests":
          setError(
            "Too many attempts. Please try again later."
          );
          break;

        default:
          setError(
            "Unable to login. Please try again."
          );
      }
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // GOOGLE
  // =========================================

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      setError("");

      await loginWithGoogle();

      navigate(redirectPath, {
        replace: true,
      });
    } catch (error) {
      console.error(error);

      setError(
        "Google login failed. Please try again."
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <AuthWaterBackground>
      <section className="w-full max-w-md">
        <div
          className="
            relative
            overflow-hidden
            rounded-[2rem]
            border
            border-white/60
            bg-white/40
            p-5
            shadow-[0_25px_80px_rgba(0,100,180,0.18)]
            backdrop-blur-2xl
            animate-[fadeIn_0.7s_ease-out]
            sm:p-7
            md:p-8
          "
        >
          {/* Shine */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-52 w-40 rotate-12 bg-white/30 blur-3xl" />

          {/* Header */}
          <div className="relative mb-7 text-center">
            <div
              className="
                mx-auto
                mb-4
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-full
                border
                border-white/70
                bg-white/40
                text-2xl
                shadow-lg
                backdrop-blur-md
                animate-[float_4s_ease-in-out_infinite]
              "
            >
              🔐
            </div>

            <h1 className="text-2xl font-extrabold text-sky-950 sm:text-3xl">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-slate-600">
              Sign in to continue to Books Store
            </p>
          </div>

          {/* Error */}
          {error && (
            <div
              role="alert"
              className="
                mb-5
                rounded-2xl
                border
                border-red-300/50
                bg-red-100/70
                px-4
                py-3
                text-sm
                text-red-700
              "
            >
              ⚠️ {error}
            </div>
          )}

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-bold text-sky-950"
              >
                Email address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
                disabled={disabled}
                className="
                  w-full
                  rounded-2xl
                  border
                  border-white/70
                  bg-white/40
                  px-4
                  py-3
                  text-sm
                  text-sky-950
                  outline-none
                  backdrop-blur-md
                  transition-all
                  duration-300
                  placeholder:text-slate-500
                  focus:-translate-y-0.5
                  focus:border-cyan-400
                  focus:bg-white/60
                  focus:ring-4
                  focus:ring-cyan-100/60
                "
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-bold text-sky-950"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                minLength={6}
                autoComplete="current-password"
                placeholder="Enter password"
                required
                disabled={disabled}
                className="
                  w-full
                  rounded-2xl
                  border
                  border-white/70
                  bg-white/40
                  px-4
                  py-3
                  text-sm
                  text-sky-950
                  outline-none
                  backdrop-blur-md
                  transition-all
                  duration-300
                  placeholder:text-slate-500
                  focus:-translate-y-0.5
                  focus:border-cyan-400
                  focus:bg-white/60
                  focus:ring-4
                  focus:ring-cyan-100/60
                "
              />
            </div>

            {/* Signup */}
            <p className="text-center text-sm text-slate-600">
              Don't have an account?{" "}
              <Link
                to="/sign-up"
                className="font-bold text-sky-700 hover:text-sky-900 hover:underline"
              >
                Create account
              </Link>
            </p>

            {/* Login */}
            <button
              type="submit"
              disabled={disabled}
              className="
                flex
                min-h-[52px]
                w-full
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-r
                from-sky-600
                via-cyan-500
                to-blue-600
                px-5
                text-sm
                font-extrabold
                text-white
                shadow-[0_12px_30px_rgba(0,130,200,0.3)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-[0_18px_35px_rgba(0,130,200,0.4)]
                active:scale-[0.98]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loading ? (
                <>
                  <span className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/70" />

            <span className="text-xs font-bold text-slate-500">
              OR
            </span>

            <div className="h-px flex-1 bg-white/70" />
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={disabled}
            className="
              flex
              min-h-[51px]
              w-full
              items-center
              justify-center
              gap-3
              rounded-2xl
              border
              border-white/70
              bg-white/45
              px-5
              text-sm
              font-bold
              text-slate-700
              backdrop-blur-md
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-white/65
              active:scale-[0.98]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {googleLoading ? (
              <>
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-sky-600" />
                Connecting...
              </>
            ) : (
              <>
                <img
                  src="https://res.cloudinary.com/dwoqmrypu/image/upload/v1724523583/google-logo_t1lrum.svg"
                  alt="Google"
                  className="h-5 w-5"
                />
                Continue with Google
              </>
            )}
          </button>
        </div>
      </section>
    </AuthWaterBackground>
  );
};

export default Login;
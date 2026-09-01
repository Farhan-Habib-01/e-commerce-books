import { useContext, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { AuthContext } from "../context/AuthProvider";
import AuthWaterBackground from "../components/AuthWaterBackground";

const SignUp = () => {
  const {
    createUser,
    loginWithGoogle,
  } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] =
    useState(false);

  const from =
    location.state?.from?.pathname || "/";

  const disabled =
    loading || googleLoading;

  // =========================================
  // SIGN UP
  // =========================================

  const handleSignUp = async (event) => {
    event.preventDefault();

    setError("");

    const form = event.currentTarget;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phoneNumber =
      form.phoneNumber.value.trim();
    const password = form.password.value;

    // Name
    const nameRegex =
      /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;

    if (
      !nameRegex.test(name) ||
      name.length < 3 ||
      name.length > 30
    ) {
      setError(
        "Please enter a valid name between 3 and 30 characters."
      );
      return;
    }

    // Phone
    const phoneRegex =
      /^[6-9][0-9]{9}$/;

    if (!phoneRegex.test(phoneNumber)) {
      setError(
        "Enter a valid 10-digit Indian mobile number starting with 6, 7, 8 or 9."
      );
      return;
    }

    // Password
    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    try {
      setLoading(true);

      const result = await createUser(
        name,
        email,
        password,
        phoneNumber
      );

      if (result?.user) {
        navigate(from, {
          replace: true,
        });
      }
    } catch (error) {
      console.error(error);

      switch (error?.code) {
        case "auth/email-already-in-use":
          setError(
            "This email is already registered. Please login instead."
          );
          break;

        case "auth/invalid-email":
          setError(
            "Please enter a valid email address."
          );
          break;

        case "auth/weak-password":
          setError(
            "Password must contain at least 6 characters."
          );
          break;

        default:
          setError(
            "Unable to create your account. Please try again."
          );
      }
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // GOOGLE
  // =========================================

  const handleGoogleSignup = async () => {
    try {
      setError("");
      setGoogleLoading(true);

      const result =
        await loginWithGoogle();

      if (result?.user) {
        navigate(from, {
          replace: true,
        });
      }
    } catch (error) {
      console.error(error);

      if (
        error?.code ===
        "auth/popup-closed-by-user"
      ) {
        setError(
          "Google sign-up was cancelled."
        );
      } else {
        setError(
          "Google signup failed. Please try again."
        );
      }
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
              📚
            </div>

            <h1 className="text-2xl font-extrabold text-sky-950 sm:text-3xl">
              Create your account
            </h1>

            <p className="mt-2 text-sm text-slate-600">
              Join Books Store today
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
                backdrop-blur-md
              "
            >
              ⚠️ {error}
            </div>
          )}

          <form
            onSubmit={handleSignUp}
            className="space-y-4"
          >
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-bold text-sky-950"
              >
                Full name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                minLength={3}
                maxLength={30}
                autoComplete="name"
                placeholder="Enter your name"
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

            {/* Phone */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="mb-1.5 block text-sm font-bold text-sky-950"
              >
                Phone number
              </label>

              <div
                className="
                  flex
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/70
                  bg-white/40
                  backdrop-blur-md
                  transition-all
                  duration-300
                  focus-within:-translate-y-0.5
                  focus-within:border-cyan-400
                  focus-within:bg-white/60
                  focus-within:ring-4
                  focus-within:ring-cyan-100/60
                "
              >
                <span className="flex items-center border-r border-slate-300/50 px-3 text-sm font-bold text-sky-950">
                  +91
                </span>

                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  maxLength={10}
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="9876543210"
                  required
                  disabled={disabled}
                  onInput={(event) => {
                    event.currentTarget.value =
                      event.currentTarget.value
                        .replace(/\D/g, "")
                        .slice(0, 10);
                  }}
                  className="
                    min-w-0
                    flex-1
                    bg-transparent
                    px-3
                    py-3
                    text-sm
                    tracking-wide
                    text-sky-950
                    outline-none
                    placeholder:text-slate-500
                  "
                />
              </div>

              <p className="mt-1 text-xs text-slate-600">
                10 digits, starting with 6–9.
              </p>
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
                autoComplete="new-password"
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

              <p className="mt-1 text-xs text-slate-600">
                Minimum 6 characters.
              </p>
            </div>

            {/* Login */}
            <p className="pt-1 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-sky-700 hover:text-sky-900 hover:underline"
              >
                Login
              </Link>
            </p>

            {/* Submit */}
            <button
              type="submit"
              disabled={disabled}
              className="
                flex
                min-h-[52px]
                w-full
                items-center
                justify-center
                gap-2
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
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Creating account...
                </>
              ) : (
                <>
                  Create account
                  <span>→</span>
                </>
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
            onClick={handleGoogleSignup}
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

          {/* Terms */}
          <p className="mt-5 text-center text-[10px] leading-5 text-slate-500">
            By creating an account, you agree to our{" "}
            <Link
              to="/terms-conditions"
              className="font-bold text-sky-700 hover:underline"
            >
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy-policy"
              className="font-bold text-sky-700 hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </section>
    </AuthWaterBackground>
  );
};

export default SignUp;
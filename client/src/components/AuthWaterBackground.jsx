const AuthWaterBackground = ({ children }) => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-cyan-100 via-sky-50 to-blue-100 px-4 py-8 sm:px-6 lg:px-8">

      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Large water blob */}
        <div
          className="
            absolute
            -right-32
            -top-32
            h-72
            w-72
            rounded-full
            bg-cyan-400/30
            blur-3xl
            animate-[float_8s_ease-in-out_infinite]
            sm:h-[28rem]
            sm:w-[28rem]
          "
        />

        {/* Blue blob */}
        <div
          className="
            absolute
            -bottom-32
            -left-32
            h-80
            w-80
            rounded-full
            bg-blue-500/25
            blur-3xl
            animate-[float_10s_ease-in-out_infinite_reverse]
            sm:h-[30rem]
            sm:w-[30rem]
          "
        />

        {/* Center glow */}
        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-72
            w-72
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-white/40
            blur-3xl
            sm:h-[32rem]
            sm:w-[32rem]
          "
        />

        {/* Bubble */}
        <span className="absolute bottom-10 left-[10%] h-5 w-5 rounded-full border border-white/70 bg-white/30 animate-[bubble_7s_linear_infinite]" />

        <span className="absolute bottom-0 left-[25%] h-3 w-3 rounded-full border border-white/70 bg-white/30 animate-[bubble_9s_linear_infinite]" />

        <span className="absolute bottom-5 right-[20%] h-7 w-7 rounded-full border border-white/70 bg-white/30 animate-[bubble_8s_linear_infinite]" />

        <span className="absolute bottom-0 right-[8%] h-4 w-4 rounded-full border border-white/70 bg-white/30 animate-[bubble_6s_linear_infinite]" />

        {/* Wave */}
        <div className="absolute bottom-0 left-0 w-full opacity-40">
          <svg
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            className="h-24 w-full sm:h-36"
          >
            <path
              fill="white"
              d="M0,192L60,176C120,160,240,128,360,133.3C480,139,600,181,720,192C840,203,960,181,1080,154.7C1200,128,1320,96,1380,80L1440,64V320H0Z"
            />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-[calc(100vh-4rem)] items-center justify-center">
        {children}
      </div>
    </main>
  );
};

export default AuthWaterBackground;
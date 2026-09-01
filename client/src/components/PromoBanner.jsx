import { Link } from 'react-router-dom';

const PromoBanner = () => {
  return (
    <section className="mt-12 sm:mt-16 bg-teal-100 px-4 py-10 sm:px-6 sm:py-12 lg:px-12 xl:px-24">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 md:flex-row md:gap-12">
        
        {/* Content */}
        <div className="w-full text-center md:w-1/2 md:text-left">
          <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            National Book Awards For Fiction Shortlist
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-6 text-gray-600 sm:text-base">
            Discover the latest shortlisted fiction titles and find your next
            great read.
          </p>

          <Link
            to="/shop"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-black hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 active:scale-95 sm:text-base"
          >
            Get Promo Code
          </Link>
        </div>

        {/* Image */}
        <div className="flex w-full justify-center md:w-1/2">
          <img
            src="https://res.cloudinary.com/dwoqmrypu/image/upload/v1724518353/openbook1_qxmiwe.png"
            alt="Open book promotion"
            loading="lazy"
            decoding="async"
            className="h-auto w-full max-w-xs object-contain sm:max-w-sm md:max-w-md lg:max-w-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
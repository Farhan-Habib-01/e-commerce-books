import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-white">

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          {/* Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 leading-tight">
              Your Trusted Online Book Store
            </h1>

            <p className="text-gray-600 text-lg leading-8 mt-6">
              Welcome to our online book store, where book lovers can
              easily discover, purchase, and enjoy their favorite books.
              We provide a wide collection of books at affordable prices
              with a simple and convenient shopping experience.
            </p>

            <p className="text-gray-600 leading-7 mt-4">
              From educational books and novels to self-development,
              technology, fiction, and many more categories, we aim to
              make quality books accessible to everyone.
            </p>

            <Link
              to="/shop"
              className="inline-block mt-7 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3 rounded-lg transition"
            >
              Explore Books
            </Link>
          </div>

          {/* Image */}
          <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66"
              alt="Online Book Store"
              className="w-full max-w-lg h-80 md:h-96 object-cover rounded-2xl shadow-lg"
            />
          </div>

        </div>
      </section>


      {/* About Store */}
      <section className="py-20 px-4 lg:px-24">
        <div className="max-w-6xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What We Do
          </h2>

          <p className="text-gray-600 max-w-3xl mx-auto mt-5 leading-7">
            Our platform connects readers with a wide range of books.
            Customers can browse books, check prices and details,
            select their favorite books, and place orders online.
            Our goal is to make buying books fast, easy, and reliable.
          </p>


          {/* Features */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">

            {/* Card 1 */}
            <div className="p-7 rounded-2xl bg-gray-50 shadow-sm hover:shadow-lg transition">
              <div className="text-4xl">📚</div>

              <h3 className="text-xl font-bold mt-4">
                Wide Collection
              </h3>

              <p className="text-gray-600 mt-3 leading-6">
                Discover books from different categories including
                fiction, education, technology, business, and more.
              </p>
            </div>


            {/* Card 2 */}
            <div className="p-7 rounded-2xl bg-gray-50 shadow-sm hover:shadow-lg transition">
              <div className="text-4xl">🛒</div>

              <h3 className="text-xl font-bold mt-4">
                Easy Purchase
              </h3>

              <p className="text-gray-600 mt-3 leading-6">
                Find your favorite book, check the details, and
                purchase it through a simple online shopping process.
              </p>
            </div>


            {/* Card 3 */}
            <div className="p-7 rounded-2xl bg-gray-50 shadow-sm hover:shadow-lg transition">
              <div className="text-4xl">🚚</div>

              <h3 className="text-xl font-bold mt-4">
                Reliable Delivery
              </h3>

              <p className="text-gray-600 mt-3 leading-6">
                We focus on providing a smooth ordering experience
                and reliable delivery for every customer.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* How It Works */}
      <section className="py-20 px-4 lg:px-24 bg-gray-50">
        <div className="max-w-6xl mx-auto">

          <div className="text-center">

            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              How It Works
            </h2>
          </div>


          <div className="grid md:grid-cols-3 gap-8 mt-12">

            <div className="text-center">
              <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-blue-600 text-white text-xl font-bold">
                1
              </div>

              <h3 className="text-xl font-bold mt-5">
                Find Your Book
              </h3>

              <p className="text-gray-600 mt-3">
                Browse our collection and find the book you want
                to purchase.
              </p>
            </div>


            <div className="text-center">
              <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-blue-600 text-white text-xl font-bold">
                2
              </div>

              <h3 className="text-xl font-bold mt-5">
                Place Your Order
              </h3>

              <p className="text-gray-600 mt-3">
                Select your book and complete the checkout process
                quickly and easily.
              </p>
            </div>


            <div className="text-center">
              <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-blue-600 text-white text-xl font-bold">
                3
              </div>

              <h3 className="text-xl font-bold mt-5">
                Receive Your Book
              </h3>

              <p className="text-gray-600 mt-3">
                Your selected book will be delivered to your
                provided address.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* Why Choose Us */}
      <section className="py-20 px-4 lg:px-24">
        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-bold">
            Why Choose Our Book Store?
          </h2>

          <div className="grid sm:grid-cols-2 gap-5 mt-10 text-left">

            <div className="p-5 border rounded-xl">
              <h3 className="font-bold text-lg">
                ✓ Affordable Prices
              </h3>

              <p className="text-gray-600 mt-2">
                Get your favorite books at competitive and
                affordable prices.
              </p>
            </div>

            <div className="p-5 border rounded-xl">
              <h3 className="font-bold text-lg">
                ✓ Easy Shopping
              </h3>

              <p className="text-gray-600 mt-2">
                Our website provides a simple and user-friendly
                shopping experience.
              </p>
            </div>

            <div className="p-5 border rounded-xl">
              <h3 className="font-bold text-lg">
                ✓ Multiple Categories
              </h3>

              <p className="text-gray-600 mt-2">
                Explore books from many different categories
                and interests.
              </p>
            </div>

            <div className="p-5 border rounded-xl">
              <h3 className="font-bold text-lg">
                ✓ Customer Satisfaction
              </h3>

              <p className="text-gray-600 mt-2">
                We focus on providing a reliable and enjoyable
                experience for every reader.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="py-16 px-4 rounded-lg bg-gray-50 text-black text-center hover:bg-gray-200 transition lg:px-24">

        <h2 className="text-3xl md:text-4xl font-bold">
          Find Your Next Favorite Book
        </h2>

        <p className="max-w-2xl mx-auto mt-4 text-black">
          Explore our collection and discover books that inspire,
          educate, and entertain you.
        </p>

        <Link
          to="/shop"
          className="inline-block mt-7 bg-blue-800 text-white hover:bg-blue-500 font-semibold px-8 py-3 rounded-lg transition"
        >
          Shop Now
        </Link>

      </section>

    </div>
  );
};

export default About;
import Banner from "../components/Banner";
import BestSellerBook from "../home/BestSallerBook";
import FevBook from "./FevBook";
import PromoBanner from "../components/PromoBanner";
import OtherBooks from "./OtherBooks";
import Review from "../components/Review";

const Home = () => {
  return (
    <main className="w-full overflow-x-hidden">

      {/* =====================================================
          HERO / BANNER
      ===================================================== */}

      <section aria-label="Book store banner">
        <Banner />
      </section>


      {/* =====================================================
          BEST SELLER BOOKS
      ===================================================== */}

      <section
        className="w-full"
        aria-labelledby="best-seller-books"
      >
        <BestSellerBook />
      </section>


      {/* =====================================================
          FAVORITE BOOKS
      ===================================================== */}

      <section
        className="w-full"
        aria-label="Favorite books"
      >
        <FevBook />
      </section>


      {/* =====================================================
          PROMOTION
      ===================================================== */}

      <section
        className="w-full"
        aria-label="Book promotion"
      >
        <PromoBanner />
      </section>


      {/* =====================================================
          OTHER BOOKS
      ===================================================== */}

      <section
        className="w-full"
        aria-label="Other books"
      >
        <OtherBooks />
      </section>


      {/* =====================================================
          CUSTOMER REVIEWS
      ===================================================== */}

      <section
        className="w-full"
        aria-label="Customer reviews"
      >
        <Review />
      </section>

    </main>
  );
};

export default Home;
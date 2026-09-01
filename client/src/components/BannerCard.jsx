import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-cards";

const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    title: "The Alchemist",
    author: "Paulo Coelho",
    image:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    title: "Harry Potter",
    author: "J.K. Rowling",
    image:
      "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    image:
      "https://images.unsplash.com/photo-1511108690759-009324a90311?auto=format&fit=crop&w=600&q=80",
  },
];

const BannerCard = () => {
  return (
    <div
      className="
        flex w-full
        items-center justify-center
        px-2 sm:px-4
      "
    >
      <Swiper
        effect="cards"
        grabCursor={true}
        modules={[EffectCards, Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        className="
          !w-[240px]
          !h-[340px]

          xs:!w-[260px]
          xs:!h-[370px]

          sm:!w-[280px]
          sm:!h-[400px]

          md:!w-[300px]
          md:!h-[430px]

          lg:!w-[320px]
          lg:!h-[460px]
        "
      >
        {books.map((book) => (
          <SwiperSlide
            key={book.id}
            className="
              overflow-hidden
              rounded-2xl
              bg-white
              shadow-2xl
            "
          >
            <div className="relative h-full w-full">

              {/* Book Image */}

              <img
                src={book.image}
                alt={book.title}
                loading="lazy"
                className="
                  h-full
                  w-full
                  object-cover
                "
              />

              {/* Gradient */}

              <div
                className="
                  absolute
                  inset-x-0
                  bottom-0
                  h-1/2
                  bg-gradient-to-t
                  from-black/80
                  via-black/30
                  to-transparent
                "
              />

              {/* Book Information */}

              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  right-0
                  p-5
                  text-white
                  sm:p-6
                "
              >
                <h2
                  className="
                    line-clamp-2
                    text-xl
                    font-bold
                    sm:text-2xl
                  "
                >
                  {book.title}
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-gray-200
                    sm:text-base
                  "
                >
                  {book.author}
                </p>

                <div
                  className="
                    mt-3
                    inline-flex
                    rounded-full
                    bg-blue-600
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    sm:text-sm
                  "
                >
                  Available Now
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerCard;
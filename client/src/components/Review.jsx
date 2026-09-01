import { Swiper, SwiperSlide } from "swiper/react";
import {
    Autoplay,
    Pagination,
    Navigation,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const reviews  = [
    {
        id: 1,
        name: "Rahul Kumar",
        location: "Delhi, India",
        image: "https://i.pravatar.cc/150?img=12",
        rating: 5,
        date: "2 days ago",
        review:
            "Amazing collection of books! The quality was excellent and my order arrived earlier than expected. I will definitely shop here again.",
    },
    {
        id: 2,
        name: "Priya Sharma",
        location: "Mumbai, India",
        image: "https://i.pravatar.cc/150?img=47",
        rating: 5,
        date: "5 days ago",
        review:
            "I really loved the shopping experience. The website is easy to use, the books are reasonably priced, and delivery was very fast.",
    },
    {
        id: 3,
        name: "Aman Singh",
        location: "Bangalore, India",
        image: "https://i.pravatar.cc/150?img=33",
        rating: 4,
        date: "1 week ago",
        review:
            "Great platform for book lovers. I found several books that were difficult to find elsewhere. The packaging was also very good.",
    },
    {
        id: 4,
        name: "Sneha Verma",
        location: "Lucknow, India",
        image: "https://i.pravatar.cc/150?img=44",
        rating: 5,
        date: "3 week ago",
        review:
            "Excellent service and a wonderful collection. Customer support was helpful and my book arrived safely. Highly recommended!",
    },
    {
        id: 5,
        name: "Arjun Mehta",
        location: "Pune, India",
        image: "https://i.pravatar.cc/150?img=11",
        rating: 4,
        date: "8 months ago",
        review:
            "Very smooth buying experience. The prices are affordable and there are many options available for students and readers.",
    },
    {
        id: 6,
        name: "Neha Gupta",
        location: "Kolkata, India",
        image: "https://i.pravatar.cc/150?img=49",
        rating: 5,
        date: "1 year ago",
        review:
            "I ordered multiple books and everything arrived perfectly packed. The overall experience was excellent. I will recommend you this platform.",
    },
];

const CustomerReviews = () => {
    return (
        <section className="bg-gray-50 py-12 px-4 md:px-8 lg:px-20">

            {/* Section Heading */}
            <div className="max-w-3xl mx-auto text-center mb-12">

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-3">
                    What Our Customers Say
                </h2>

                <p className="text-gray-600 mt-4">
                    Thousands of readers trust us for quality books,
                    affordable prices, and fast delivery.
                </p>

            </div>

            {/* Rating Summary */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-10">

                <div className="text-center">
                    <h3 className="text-4xl font-bold text-gray-900">
                        4.8
                    </h3>

                    <div className="flex justify-center text-yellow-400 text-xl">
                        ★★★★★
                    </div>

                    <p className="text-sm text-gray-500 mt-1">
                        Based on 2,500+ reviews
                    </p>
                </div>

                <div className="hidden sm:block h-16 w-px bg-gray-300"></div>

                <div className="text-center">
                    <p className="text-gray-700 font-medium">
                        10,000+
                    </p>

                    <p className="text-sm text-gray-500">
                        Happy Readers
                    </p>
                </div>

            </div>

            {/* Reviews Slider */}
            <div className="max-w-7xl mx-auto">

                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    spaceBetween={24}
                    slidesPerView={1}
                    navigation={true}
                    pagination={{
                        clickable: true,
                    }}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                        },

                        768: {
                            slidesPerView: 2,
                        },

                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    className="pb-12"
                >

                    {reviews.map((review) => (

                        <SwiperSlide key={review.id}>

                            {/* Review Card */}
                            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition duration-30 h-full">

                                {/* Customer Information */}
                                <div className="flex items-center gap-4">

                                    <img
                                        src={review.image}
                                        alt={review.name}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                                    />

                                    <div className="flex-1">

                                        <div className="flex items-center gap-2">

                                            <h3 className="font-bold text-lg text-gray-900">
                                                {review.name}
                                            </h3>

                                            {/* Verified Badge */}
                                            <span className="text-green-600 text-xs font-semibold">
                                                ✓ Verified
                                            </span>

                                        </div>

                                        <p className="text-sm text-gray-500">
                                            📍 {review.location}
                                        </p>

                                    </div>

                                </div>

                                {/* Star Rating */}
                                <div className="flex items-center gap-1 mt-5">

                                    {[1, 2, 3, 4, 5].map((star) => (

                                        <span
                                            key={star}
                                            className={
                                                star <= review.rating
                                                    ? "text-yellow-400 text-xl"
                                                    : "text-gray-300 text-xl"
                                            }
                                        >
                                            ★
                                        </span>

                                    ))}

                                </div>

                                Review Text
                                <p className="text-gray-700 leading-7 mt-3">
                                    "{review.review}"
                                </p>

                                {/* Date */}
                                <p className="text-xs text-gray-400 mt-5">
                                    {review.date}
                                </p>

                            </div>

                        </SwiperSlide>

                    ))}

                </Swiper>

            </div>

        </section>
    );
};

export default CustomerReviews;
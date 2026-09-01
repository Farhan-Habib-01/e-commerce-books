import React, { useState } from "react";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const [status, setStatus] = useState("");

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !formData.name ||
            !formData.email ||
            !formData.subject ||
            !formData.message
        ) {
            setStatus("Please fill in all required fields.");
            return;
        }

        console.log("Contact Form:", formData);

        setStatus(
            "Thank you! Your message has been sent successfully."
        );

        // Clear form
        setFormData({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">

            {/* ================= HERO ================= */}
            <section className="pt-32 pb-16 px-4 bg-white">
                <div className="max-w-7xl mx-auto text-center">

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
                        We'd Love to Hear From You
                    </h1>

                    <p className="text-gray-600 max-w-2xl mx-auto mt-5 leading-7">
                        Have a question about a book, order, delivery, payment,
                        return, or anything else? Our team is here to help you.
                    </p>

                </div>
            </section>


            {/* ================= CONTACT INFO ================= */}
            <section className="px-4 lg:px-24 py-16">

                <div className="max-w-7xl mx-auto">

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                        {/* Phone */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition">

                            <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full text-2xl">
                                📞
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mt-5">
                                Phone
                            </h3>

                            <p className="text-gray-500 mt-2">
                                +91 98765 43210
                            </p>

                            <p className="text-gray-400 text-sm mt-1">
                                Mon - Sat, 9 AM - 6 PM
                            </p>

                        </div>


                        {/* Email */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition">

                            <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-full text-2xl">
                                ✉️
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mt-5">
                                Email
                            </h3>

                            <p className="text-gray-500 mt-2 break-all">
                                support@yourbookstore.com
                            </p>

                            <p className="text-gray-400 text-sm mt-1">
                                We reply within 24 hours
                            </p>

                        </div>


                        {/* Address */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition">

                            <div className="w-12 h-12 flex items-center justify-center bg-purple-100 rounded-full text-2xl">
                                📍
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mt-5">
                                Our Office
                            </h3>

                            <p className="text-gray-500 mt-2">
                                New Delhi, India
                            </p>

                            <p className="text-gray-400 text-sm mt-1">
                                Visit us during business hours
                            </p>

                        </div>


                        {/* Working Hours */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition">

                            <div className="w-12 h-12 flex items-center justify-center bg-orange-100 rounded-full text-2xl">
                                🕐
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mt-5">
                                Working Hours
                            </h3>

                            <p className="text-gray-500 mt-2">
                                Monday - Saturday
                            </p>

                            <p className="text-gray-400 text-sm mt-1">
                                9:00 AM - 6:00 PM
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= CONTACT FORM ================= */}
            <section className="px-4 lg:px-24 pb-20">

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">

                    {/* Left Content */}
                    <div className="bg-blue-600 rounded-2xl p-8 md:p-12 text-white">

                        <p className="text-blue-200 font-semibold uppercase tracking-wider">
                            Get In Touch
                        </p>

                        <h2 className="text-3xl md:text-4xl font-bold mt-3">
                            How Can We Help You?
                        </h2>

                        <p className="text-blue-100 leading-7 mt-5">
                            Whether you need help finding a book, checking your
                            order, understanding delivery options, or resolving
                            a purchase issue, our customer support team is ready
                            to assist you.
                        </p>


                        {/* Support Items */}
                        <div className="mt-10 space-y-6">

                            <div className="flex gap-4">
                                <div className="text-2xl">
                                    📚
                                </div>

                                <div>
                                    <h3 className="font-bold text-lg">
                                        Book Assistance
                                    </h3>

                                    <p className="text-blue-100 text-sm mt-1">
                                        Need help choosing the right book?
                                        Contact our team.
                                    </p>
                                </div>
                            </div>


                            <div className="flex gap-4">
                                <div className="text-2xl">
                                    🛒
                                </div>

                                <div>
                                    <h3 className="font-bold text-lg">
                                        Order Support
                                    </h3>

                                    <p className="text-blue-100 text-sm mt-1">
                                        Questions about your purchase or order?
                                        We're here to help.
                                    </p>
                                </div>
                            </div>


                            <div className="flex gap-4">
                                <div className="text-2xl">
                                    🚚
                                </div>

                                <div>
                                    <h3 className="font-bold text-lg">
                                        Delivery Support
                                    </h3>

                                    <p className="text-blue-100 text-sm mt-1">
                                        Get assistance with shipping and delivery
                                        related questions.
                                    </p>
                                </div>
                            </div>


                            <div className="flex gap-4">
                                <div className="text-2xl">
                                    🔄
                                </div>

                                <div>
                                    <h3 className="font-bold text-lg">
                                        Returns & Refunds
                                    </h3>

                                    <p className="text-blue-100 text-sm mt-1">
                                        Need help with a return or refund?
                                        Contact customer support.
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>


                    {/* Right Form */}
                    <div className="bg-white rounded-2xl shadow-md p-6 md:p-10">

                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                            Send Us a Message
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Fill out the form and our team will get back to you.
                        </p>


                        <form
                            onSubmit={handleSubmit}
                            className="mt-8 space-y-5"
                        >

                            {/* Name + Email */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Full Name *
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>


                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email Address *
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                            </div>


                            {/* Phone + Subject */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Phone Number *
                                    </label>

                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        pattern="[0-9]{10}"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+91 98765 43210"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>


                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Subject *
                                    </label>

                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    >

                                        <option value="">
                                            Select a subject
                                        </option>

                                        <option value="Order Support">
                                            Order Support
                                        </option>

                                        <option value="Book Information">
                                            Book Information
                                        </option>

                                        <option value="Delivery">
                                            Delivery
                                        </option>

                                        <option value="Return & Refund">
                                            Return & Refund
                                        </option>

                                        <option value="Payment">
                                            Payment
                                        </option>

                                        <option value="Other">
                                            Other
                                        </option>

                                    </select>
                                </div>

                            </div>


                            {/* Message */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Message *
                                </label>

                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Write your message here..."
                                    rows="6"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>


                            {/* Status */}
                            {status && (
                                <div
                                    className={`p-3 rounded-lg text-sm ${status.includes("successfully")
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {status}
                                </div>
                            )}


                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition duration-300"
                            >
                                Send Message
                            </button>

                        </form>

                    </div>

                </div>

            </section>


            {/* ================= FAQ / SUPPORT ================= */}
            <section className="bg-white py-20 px-4 lg:px-24">

                <div className="max-w-5xl mx-auto text-center">

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                        We're Here for Our Readers
                    </h2>

                    <p className="text-gray-600 max-w-2xl mx-auto mt-5 leading-7">
                        Our goal is to make your book-buying experience simple,
                        secure, and enjoyable. If you have any questions,
                        don't hesitate to contact us.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">

                        <a
                            href="mailto:support@yourbookstore.com"
                            className="bg-blue-600 hover:bg-blue-800 text-white px-7 py-3 rounded-lg font-semibold transition"
                        >
                            Email Support
                        </a>

                        <a
                            href="tel:+919876543210"
                            className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-7 py-3 rounded-lg font-semibold transition"
                        >
                            Call Us
                        </a>

                    </div>

                </div>

            </section>


            {/* ================= FOOTER ================= */}
            <footer className="bg-gray-900 text-white py-8 text-center px-4">

                <h3 className="text-xl font-bold">
                    Your Book Store
                </h3>

                <p className="text-gray-400 mt-2">
                    Your trusted online destination for books.
                </p>

                <p className="text-gray-500 text-sm mt-4">
                    © 2026 Your Book Store. All rights reserved.
                </p>

            </footer>

        </div>
    );
};

export default ContactUs;
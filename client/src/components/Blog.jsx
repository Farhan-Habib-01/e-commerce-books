import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "10 Must-Read Books Every Fiction Lover Should Read",
    description:
      "Discover some of the most engaging fiction books that deserve a place on every reader's bookshelf.",
    category: "Fiction",
    author: "Books Store",
    date: "August 20, 2026",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=80",
    slug: "10-must-read-fiction-books",
  },
  {
    id: 2,
    title: "How to Build a Daily Reading Habit",
    description:
      "Simple and practical ways to make reading a consistent part of your everyday routine.",
    category: "Reading Tips",
    author: "Books Store",
    date: "August 16, 2026",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80",
    slug: "build-daily-reading-habit",
  },
  {
    id: 3,
    title: "Best Books for Personal Growth",
    description:
      "Explore books that can help you improve your mindset, productivity, confidence, and personal development.",
    category: "Self Growth",
    author: "Books Store",
    date: "August 12, 2026",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=900&q=80",
    slug: "best-books-personal-growth",
  },
  {
    id: 4,
    title: "The Benefits of Reading Every Day",
    description:
      "Learn how regular reading can improve your knowledge, focus, vocabulary, and creativity.",
    category: "Education",
    author: "Books Store",
    date: "August 8, 2026",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=900&q=80",
    slug: "benefits-of-reading",
  },
  {
    id: 5,
    title: "How to Choose Your Next Book",
    description:
      "Not sure what to read next? Use these simple tips to find books that match your interests.",
    category: "Reading Tips",
    author: "Books Store",
    date: "August 4, 2026",
    image:
      "https://images.unsplash.com/photo-1511108690759-009324a90311?auto=format&fit=crop&w=900&q=80",
    slug: "how-to-choose-next-book",
  },
  {
    id: 6,
    title: "Top Books for Students",
    description:
      "A useful collection of books for students who want to learn, improve their skills, and explore new ideas.",
    category: "Education",
    author: "Books Store",
    date: "July 30, 2026",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=900&q=80",
    slug: "top-books-for-students",
  },
];

const categories = [
  "All",
  "Fiction",
  "Reading Tips",
  "Self Growth",
  "Education",
];

const Blog = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredPosts = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    return blogPosts.filter((post) => {
      const matchesCategory =
        category === "All" || post.category === category;

      const matchesSearch =
        !searchTerm ||
        post.title.toLowerCase().includes(searchTerm) ||
        post.description.toLowerCase().includes(searchTerm) ||
        post.category.toLowerCase().includes(searchTerm);

      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  const featuredPost = blogPosts[0];

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-300 via-blue-700 to-indigo-300 px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">

          <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Stories, Ideas &amp; Reading Inspiration
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base md:text-lg">
            Discover book recommendations, reading tips, author insights,
            educational resources, and ideas to help you become a better
            reader.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-7xl">

          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Featured Article
            </h2>
          </div>

          <article className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-gray-200">
            <div className="grid md:grid-cols-2">

              {/* Image */}
              <div className="h-64 overflow-hidden sm:h-80 md:h-full">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
                <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  {featuredPost.category}
                </span>

                <h3 className="mt-4 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
                  {featuredPost.title}
                </h3>

                <p className="mt-4 text-sm leading-6 text-gray-600 sm:text-base">
                  {featuredPost.description}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                  <span>{featuredPost.author}</span>
                  <span aria-hidden="true">•</span>
                  <time>{featuredPost.date}</time>
                </div>

                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className="mt-7 inline-flex w-fit items-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
                >
                  Read Article
                  <svg
                    className="ml-2 h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Blog Section */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Latest Articles
              </h2>

              <p className="mt-2 text-sm text-gray-500 sm:text-base">
                Explore our latest articles and book recommendations.
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full lg:max-w-sm">
              <label
                htmlFor="blog-search"
                className="sr-only"
              >
                Search articles
              </label>

              <input
                id="blog-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search articles..."
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-10 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />

              <svg
                className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m21 21-4.35-4.35m2.35-5.65a8 8 0 11-16 0 8 8 0 0116 0z"
                />
              </svg>
            </div>
          </div>

          {/* Categories */}
          <div className="mt-7 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                  category === item
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-100"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Posts */}
          {filteredPosts.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Image */}
                  <Link
                    to={`/blog/${post.slug}`}
                    className="block overflow-hidden"
                    aria-label={`Read ${post.title}`}
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      decoding="async"
                      className="h-52 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-56"
                    />
                  </Link>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">

                    <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                      {post.category}
                    </span>

                    <h3 className="mt-4 line-clamp-2 text-xl font-bold leading-tight text-gray-900">
                      <Link
                        to={`/blog/${post.slug}`}
                        className="transition-colors hover:text-blue-600"
                      >
                        {post.title}
                      </Link>
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                      {post.description}
                    </p>

                    <div className="mt-auto pt-5">
                      <div className="flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
                        <div>
                          <p className="text-xs font-medium text-gray-900">
                            {post.author}
                          </p>

                          <time className="text-xs text-gray-500">
                            {post.date}
                          </time>
                        </div>

                        <Link
                          to={`/blog/${post.slug}`}
                          className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                        >
                          Read more →
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="mt-10 rounded-2xl bg-white px-6 py-12 text-center shadow-sm ring-1 ring-gray-200">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                <svg
                  className="h-7 w-7 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m21 21-4.35-4.35m2.35-5.65a8 8 0 11-16 0 8 8 0 0116 0z"
                  />
                </svg>
              </div>

              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                No articles found
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Try changing your search or selecting another category.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
                className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Blog;
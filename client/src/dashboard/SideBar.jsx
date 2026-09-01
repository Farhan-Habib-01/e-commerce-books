import { Alert, Spinner, Table } from "flowbite-react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import API_URL from "../config/api"

const ManageBook = () => {
  const [allBooks, setAllBooks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [deleteLoading, setDeleteLoading] = useState(null);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");


  // =====================================================
  // GET ALL BOOKS
  // =====================================================

  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/all-books`
      );

      if (!response.ok) {
        throw new Error(
          "Failed to load books. Please try again."
        );
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error(
          "Invalid book data received from server."
        );
      }

      setAllBooks(data);

    } catch (error) {
      console.error("Fetch books error:", error);

      setError(
        error.message ||
        "Unable to load books."
      );

    } finally {
      setLoading(false);
    }
  }, []);


  // =====================================================
  // LOAD BOOKS ON PAGE LOAD
  // =====================================================

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);


  // =====================================================
  // DELETE BOOK
  // =====================================================

  const handleDelete = async (id) => {

    if (!id) {
      setError("Invalid book ID.");
      return;
    }


    // Confirmation
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmDelete) {
      return;
    }


    try {

      setDeleteLoading(id);

      setError("");

      setSuccess("");


      const response = await fetch(
        `${API_URL}/books/${id}`,
        {
          method: "DELETE",
        }
      );


      if (!response.ok) {
        throw new Error(
          "Failed to delete the book."
        );
      }


      // Remove deleted book from UI
      setAllBooks((previousBooks) =>
        previousBooks.filter(
          (book) => book._id !== id
        )
      );


      setSuccess(
        "Book deleted successfully."
      );


    } catch (error) {

      console.error(
        "Delete book error:",
        error
      );

      setError(
        error.message ||
        "Unable to delete the book."
      );


    } finally {

      setDeleteLoading(null);

    }
  };


  // =====================================================
  // FORMAT PRICE
  // =====================================================

  const formatPrice = (price) => {
    const numericPrice = Number(price);

    if (Number.isNaN(numericPrice)) {
      return "₹0";
    }

    return `₹${numericPrice.toLocaleString(
      "en-IN"
    )}`;
  };


  // =====================================================
  // UI
  // =====================================================

  return (
    <section
      className="
        min-h-screen
        bg-gray-50
        px-4
        py-10
        sm:px-6
        lg:px-10
        xl:px-16
      "
    >

      <div
        className="
          max-w-7xl
          mx-auto
          mt-16
          sm:mt-20
        "
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8">

          <h1
            className="
              mt-2
              text-3xl
              sm:text-4xl
              font-bold
              text-gray-900
            "
          >
            Manage Your Books
          </h1>


          <p
            className="
              mt-2
              text-sm
              sm:text-base
              text-gray-500
            "
          >
            View, edit and delete books from
            your online store.
          </p>

        </div>


        {/* =================================================
            SUCCESS MESSAGE
        ================================================= */}

        {success && (
          <Alert
            color="success"
            className="mb-6"
          >
            {success}
          </Alert>
        )}


        {/* =================================================
            ERROR MESSAGE
        ================================================= */}

        {error && (
          <Alert
            color="failure"
            className="mb-6"
          >
            {error}
          </Alert>
        )}


        {/* =================================================
            BOOK COUNT
        ================================================= */}

        {!loading && (
          <div
            className="
              mb-4
              flex
              flex-col
              gap-3
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >

            <p className="text-sm text-gray-500">

              Total Books:{" "}

              <span
                className="
                  font-bold
                  text-gray-900
                "
              >
                {allBooks.length}
              </span>

            </p>


            <Link
              to="/admin/dashboard/upload-books"
              className="
                inline-flex
                w-fit
                items-center
                justify-center
                rounded-lg
                bg-blue-600
                px-4
                py-2
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-blue-700
              "
            >
              + Upload Book
            </Link>

          </div>
        )}


        {/* =================================================
            LOADING
        ================================================= */}

        {loading && (

          <div
            className="
              flex
              min-h-[300px]
              flex-col
              items-center
              justify-center
              rounded-xl
              bg-white
              shadow-sm
            "
          >

            <Spinner
              size="xl"
              aria-label="Loading books"
            />

            <p
              className="
                mt-4
                text-sm
                text-gray-500
              "
            >
              Loading books...
            </p>

          </div>

        )}


        {/* =================================================
            EMPTY STATE
        ================================================= */}

        {!loading &&
          allBooks.length === 0 && (

            <div
              className="
                rounded-xl
                bg-white
                px-5
                py-16
                text-center
                shadow-sm
              "
            >

              <div className="text-5xl">
                📚
              </div>


              <h2
                className="
                  mt-5
                  text-xl
                  font-bold
                  text-gray-900
                "
              >
                No Books Found
              </h2>


              <p
                className="
                  mx-auto
                  mt-2
                  max-w-md
                  text-sm
                  text-gray-500
                "
              >
                You haven't uploaded any books
                yet. Add your first book to your
                online store.
              </p>


              <Link
                to="/admin/dashboard/upload-books"
                className="
                  mt-6
                  inline-flex
                  items-center
                  justify-center
                  rounded-lg
                  bg-blue-600
                  px-6
                  py-2.5
                  font-semibold
                  text-white
                  transition
                  hover:bg-blue-700
                "
              >
                Upload A Book
              </Link>

            </div>
          )}


        {/* =================================================
            BOOK TABLE
        ================================================= */}

        {!loading &&
          allBooks.length > 0 && (

            <div
              className="
                overflow-hidden
                rounded-xl
                bg-white
                shadow-sm
              "
            >

              {/* 
                Horizontal scrolling on small screens.
                This prevents the table from breaking
                the mobile layout.
              */}

              <div
                className="
                  w-full
                  overflow-x-auto
                "
              >

                <Table
                  hoverable
                  className="
                    min-w-[850px]
                  "
                >

                  {/* ============================
                      TABLE HEADER
                  ============================ */}

                  <Table.Head>

                    <Table.HeadCell
                      className="whitespace-nowrap"
                    >
                      No.
                    </Table.HeadCell>


                    <Table.HeadCell
                      className="whitespace-nowrap"
                    >
                      Book Name
                    </Table.HeadCell>


                    <Table.HeadCell
                      className="whitespace-nowrap"
                    >
                      Author Name
                    </Table.HeadCell>


                    <Table.HeadCell
                      className="whitespace-nowrap"
                    >
                      Category
                    </Table.HeadCell>


                    <Table.HeadCell
                      className="whitespace-nowrap"
                    >
                      Price
                    </Table.HeadCell>


                    <Table.HeadCell
                      className="whitespace-nowrap"
                    >
                      Actions
                    </Table.HeadCell>

                  </Table.Head>


                  {/* ============================
                      TABLE BODY
                  ============================ */}

                  <Table.Body
                    className="divide-y"
                  >

                    {allBooks.map(
                      (book, index) => (

                        <Table.Row
                          key={book._id}
                          className="
                            bg-white
                            hover:bg-gray-50
                          "
                        >

                          {/* Number */}

                          <Table.Cell
                            className="
                              whitespace-nowrap
                              font-semibold
                              text-gray-700
                            "
                          >
                            {index + 1}
                          </Table.Cell>


                          {/* Book Name */}

                          <Table.Cell>

                            <div
                              className="
                                max-w-[220px]
                              "
                            >

                              <p
                                className="
                                  line-clamp-2
                                  font-semibold
                                  text-gray-900
                                "
                                title={
                                  book.bookTitle
                                }
                              >
                                {book.bookTitle ||
                                  "Untitled Book"}
                              </p>

                            </div>

                          </Table.Cell>


                          {/* Author */}

                          <Table.Cell>

                            <p
                              className="
                                max-w-[180px]
                                truncate
                                text-gray-600
                              "
                              title={
                                book.authorName
                              }
                            >
                              {book.authorName ||
                                "Unknown Author"}
                            </p>

                          </Table.Cell>


                          {/* Category */}

                          <Table.Cell>

                            <span
                              className="
                                inline-flex
                                whitespace-nowrap
                                rounded-full
                                bg-blue-100
                                px-3
                                py-1
                                text-xs
                                font-semibold
                                text-blue-700
                              "
                            >
                              {book.category ||
                                "Uncategorized"}
                            </span>

                          </Table.Cell>


                          {/* Price */}

                          <Table.Cell>

                            <span
                              className="
                                whitespace-nowrap
                                font-bold
                                text-gray-900
                              "
                            >
                              {formatPrice(
                                book.price
                              )}
                            </span>

                          </Table.Cell>


                          {/* Actions */}

                          <Table.Cell>

                            <div
                              className="
                                flex
                                items-center
                                gap-3
                              "
                            >

                              {/* EDIT */}

                              <Link
                                to={`/admin/dashboard/edit-books/${book._id}`}
                                className="
                                  whitespace-nowrap
                                  font-semibold
                                  text-blue-600
                                  transition
                                  hover:text-blue-800
                                  hover:underline
                                "
                              >
                                Edit
                              </Link>


                              {/* DELETE */}

                              <button
                                type="button"
                                onClick={() =>
                                  handleDelete(
                                    book._id
                                  )
                                }
                                disabled={
                                  deleteLoading ===
                                  book._id
                                }
                                className="
                                  inline-flex
                                  min-w-[80px]
                                  items-center
                                  justify-center
                                  rounded-md
                                  bg-red-600
                                  px-3
                                  py-1.5
                                  text-sm
                                  font-semibold
                                  text-white
                                  transition
                                  hover:bg-red-700
                                  disabled:cursor-not-allowed
                                  disabled:bg-red-300
                                "
                                aria-label={`Delete ${book.bookTitle}`}
                              >

                                {deleteLoading ===
                                  book._id ? (

                                  <>

                                    <Spinner
                                      size="sm"
                                      className="mr-2"
                                    />

                                    Deleting

                                  </>

                                ) : (

                                  "Delete"

                                )}

                              </button>

                            </div>

                          </Table.Cell>

                        </Table.Row>

                      )
                    )}

                  </Table.Body>

                </Table>

              </div>

            </div>
          )}

      </div>

    </section>
  );
};

export default ManageBook;
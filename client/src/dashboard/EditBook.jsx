import {
  useContext,
  useState,
} from "react";

import {
  Alert,
  Button,
  Label,
  Select,
  Spinner,
  TextInput,
  Textarea,
} from "flowbite-react";

import {
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";

import { AuthContext } from "../context/AuthProvider";

import API_URL from "../config/api";

const BOOK_CATEGORIES = [
  "Fiction",
  "Non-Fiction",
  "Mystery",
  "Programming",
  "Science Fiction",
  "Fantasy",
  "Horror",
  "History & Biography",
  "Bibliography",
  "Autobiography",
  "Memoir",
  "Business",
  "Children Books",
  "Technical",
  "Travel",
  "Religion",
  "Science",
  "History",
  "Politics",
  "Art",
  "Music",
  "Art And Design",
];

const EditBook = () => {
  const { id } = useParams();

  const book = useLoaderData();

  const navigate = useNavigate();

  const { user } =
    useContext(AuthContext);

  const {
    bookTitle = "",
    authorName = "",
    imageURL = "",
    category = "",
    bookDescription = "",
    bookPDFURL = "",
    totalprice = "",
    discountPercentage = "",
    price = "",
  } = book || {};

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState(category);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleUpdate = async (
    event
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!user) {
      setError(
        "You must be logged in."
      );
      return;
    }

    if (!API_URL) {
      setError(
        "API URL is not configured."
      );
      return;
    }

    const form =
      event.currentTarget;

    const updatedBook = {
      bookTitle:
        form.bookTitle.value.trim(),

      authorName:
        form.authorName.value.trim(),

      imageURL:
        form.imageURL.value.trim(),

      category:
        selectedCategory,

      bookDescription:
        form.bookDescription.value.trim(),

      bookPDFURL:
        form.bookPDFURL.value.trim(),

      totalprice: Number(
        form.totalprice.value
      ),

      discountPercentage:
        Number(
          form.discountPercentage.value
        ),

      price: Number(
        form.price.value
      ),
    };

    // ===================================================
    // VALIDATION
    // ===================================================

    if (
      updatedBook.bookTitle.length <
      2
    ) {
      setError(
        "Book title must contain at least 2 characters."
      );
      return;
    }

    if (
      updatedBook.authorName.length <
      2
    ) {
      setError(
        "Author name must contain at least 2 characters."
      );
      return;
    }

    if (!selectedCategory) {
      setError(
        "Please select a category."
      );
      return;
    }

    if (
      updatedBook.bookDescription
        .length < 10
    ) {
      setError(
        "Description must contain at least 10 characters."
      );
      return;
    }

    if (
      !Number.isFinite(
        updatedBook.totalprice
      ) ||
      updatedBook.totalprice <= 0
    ) {
      setError(
        "Actual price must be greater than ₹0."
      );
      return;
    }

    if (
      !Number.isFinite(
        updatedBook.discountPercentage
      ) ||
      updatedBook.discountPercentage <
      0 ||
      updatedBook.discountPercentage >
      100
    ) {
      setError(
        "Discount must be between 0% and 100%."
      );
      return;
    }

    if (
      !Number.isFinite(
        updatedBook.price
      ) ||
      updatedBook.price <= 0
    ) {
      setError(
        "Selling price must be greater than ₹0."
      );
      return;
    }

    if (
      updatedBook.price >
      updatedBook.totalprice
    ) {
      setError(
        "Selling price cannot be greater than actual price."
      );
      return;
    }

    try {
      new URL(
        updatedBook.imageURL
      );

      new URL(
        updatedBook.bookPDFURL
      );
    } catch {
      setError(
        "Please provide valid image and PDF URLs."
      );
      return;
    }

    // ===================================================
    // UPDATE
    // ===================================================

    try {
      setLoading(true);

      const token =
        await user.getIdToken();

      const response =
        await fetch(
          `${API_URL}/books/${id}`,
          {
            method: "PATCH",

            headers: {
              "Content-Type":
                "application/json",

              Authorization: `Bearer ${token}`,
            },

            body: JSON.stringify(
              updatedBook
            ),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Failed to update the book."
        );
      }

      setSuccess(
        data.message ||
        "Book updated successfully."
      );

      setTimeout(() => {
        navigate(
          "/admin/dashboard/manage"
        );
      }, 1000);
    } catch (error) {
      console.error(
        "Update error:",
        error
      );

      setError(
        error.message ||
        "Unable to update the book."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <main className="min-h-screen flex-1 bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Update Book
          </h1>

          <p className="mt-2 text-gray-500">
            Edit the book information and save your changes.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-md sm:p-8">
          {success && (
            <Alert
              color="success"
              className="mb-6"
            >
              {success}
            </Alert>
          )}

          {error && (
            <Alert
              color="failure"
              className="mb-6"
            >
              {error}
            </Alert>
          )}

          <form
            onSubmit={
              handleUpdate
            }
            className="space-y-6"
          >
            {/* TITLE / AUTHOR */}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <Label
                  htmlFor="bookTitle"
                  value="Book Title"
                />

                <TextInput
                  id="bookTitle"
                  name="bookTitle"
                  defaultValue={
                    bookTitle
                  }
                  className="mt-2"
                  required
                  minLength={2}
                  maxLength={150}
                  disabled={loading}
                />
              </div>

              <div>
                <Label
                  htmlFor="authorName"
                  value="Author Name"
                />

                <TextInput
                  id="authorName"
                  name="authorName"
                  defaultValue={
                    authorName
                  }
                  className="mt-2"
                  required
                  minLength={2}
                  maxLength={100}
                  disabled={loading}
                />
              </div>
            </div>

            {/* IMAGE / CATEGORY */}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <Label
                  htmlFor="imageURL"
                  value="Book Image URL"
                />

                <TextInput
                  id="imageURL"
                  name="imageURL"
                  type="url"
                  defaultValue={
                    imageURL
                  }
                  className="mt-2"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <Label
                  htmlFor="categoryName"
                  value="Book Category"
                />

                <Select
                  id="categoryName"
                  value={
                    selectedCategory
                  }
                  onChange={(event) =>
                    setSelectedCategory(
                      event.target.value
                    )
                  }
                  className="mt-2"
                  required
                  disabled={loading}
                >
                  <option value="">
                    Select category
                  </option>

                  {BOOK_CATEGORIES.map(
                    (item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    )
                  )}
                </Select>
              </div>
            </div>

            {/* DESCRIPTION */}

            <div>
              <Label
                htmlFor="bookDescription"
                value="Book Description"
              />

              <Textarea
                id="bookDescription"
                name="bookDescription"
                defaultValue={
                  bookDescription
                }
                rows={7}
                className="mt-2"
                required
                minLength={10}
                maxLength={5000}
                disabled={loading}
              />
            </div>

            {/* PDF */}

            <div>
              <Label
                htmlFor="bookPDFURL"
                value="Book PDF URL"
              />

              <TextInput
                id="bookPDFURL"
                name="bookPDFURL"
                type="url"
                defaultValue={
                  bookPDFURL
                }
                className="mt-2"
                required
                disabled={loading}
              />
            </div>

            {/* PRICE */}

            <div>
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Price Details
              </h2>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <Label
                    htmlFor="totalprice"
                    value="Actual Price"
                  />

                  <TextInput
                    id="totalprice"
                    name="totalprice"
                    type="number"
                    min="0.01"
                    step="0.01"
                    defaultValue={
                      totalprice
                    }
                    className="mt-2"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <Label
                    htmlFor="discountPercentage"
                    value="Discount (%)"
                  />

                  <TextInput
                    id="discountPercentage"
                    name="discountPercentage"
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    defaultValue={
                      discountPercentage
                    }
                    className="mt-2"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <Label
                    htmlFor="price"
                    value="Selling Price"
                  />

                  <TextInput
                    id="price"
                    name="price"
                    type="number"
                    min="0.01"
                    step="0.01"
                    defaultValue={
                      price
                    }
                    className="mt-2"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* BUTTONS */}

            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              <Button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto"
              >
                {loading ? (
                  <>
                    <Spinner
                      size="sm"
                      className="mr-2"
                    />
                    Updating...
                  </>
                ) : (
                  "Update Book"
                )}
              </Button>

              <Button
                type="button"
                color="light"
                disabled={loading}
                onClick={() =>
                  navigate(
                    "/admin/dashboard/manage"
                  )
                }
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default EditBook;
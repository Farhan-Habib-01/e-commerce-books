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
  useContext,
  useState,
} from "react";

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

const UploadBook = () => {
  const { user } =
    useContext(AuthContext);

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const handleCategoryChange = (
    event
  ) => {
    setSelectedCategory(
      event.target.value
    );

    setError("");
  };

  const handleBookSubmit = async (
    event
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!user) {
      setError(
        "You must be logged in to upload a book."
      );
      return;
    }

    if (!API_URL) {
      setError(
        "Backend API is not configured."
      );
      return;
    }

    const form =
      event.currentTarget;

    const bookTitle =
      form.bookTitle.value.trim();

    const authorName =
      form.authorName.value.trim();

    const imageURL =
      form.imageURL.value.trim();

    const bookDescription =
      form.bookDescription.value.trim();

    const bookPDFURL =
      form.bookPDFURL.value.trim();

    const totalprice = Number(
      form.totalprice.value
    );

    const discountPercentage =
      Number(
        form.discountPercentage.value
      );

    const price = Number(
      form.price.value
    );

    if (bookTitle.length < 2) {
      setError(
        "Book title must contain at least 2 characters."
      );
      return;
    }

    if (authorName.length < 2) {
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
      bookDescription.length < 10
    ) {
      setError(
        "Description must contain at least 10 characters."
      );
      return;
    }

    if (
      !Number.isFinite(
        totalprice
      ) ||
      totalprice <= 0
    ) {
      setError(
        "Actual price must be greater than ₹0."
      );
      return;
    }

    if (
      !Number.isFinite(
        discountPercentage
      ) ||
      discountPercentage < 0 ||
      discountPercentage > 100
    ) {
      setError(
        "Discount must be between 0% and 100%."
      );
      return;
    }

    if (
      !Number.isFinite(price) ||
      price <= 0
    ) {
      setError(
        "Selling price must be greater than ₹0."
      );
      return;
    }

    if (price > totalprice) {
      setError(
        "Selling price cannot be greater than actual price."
      );
      return;
    }

    try {
      new URL(imageURL);
      new URL(bookPDFURL);
    } catch {
      setError(
        "Please enter valid image and PDF URLs."
      );
      return;
    }

    const bookObj = {
      bookTitle,
      authorName,
      imageURL,
      category: selectedCategory,
      bookDescription,
      bookPDFURL,
      totalprice,
      discountPercentage,
      price,
    };

    try {
      setLoading(true);

      const token =
        await user.getIdToken(true);

      if (!token) {
        throw new Error(
          "Authentication token could not be generated."
        );
      }

      const response =
        await fetch(
          `${API_URL}/upload-books`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(
              bookObj
            ),
          }
        );

      let data = {};

      try {
        data =
          await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            `Upload failed with status ${response.status}.`
        );
      }

      setSuccess(
        data.message ||
          "Book uploaded successfully!"
      );

      form.reset();
      setSelectedCategory("");
    } catch (error) {
      console.error(
        "Upload book error:",
        error
      );

      if (
        error.name === "TypeError" &&
        error.message ===
          "Failed to fetch"
      ) {
        setError(
          "Unable to connect to the backend server."
        );
      } else {
        setError(
          error.message ||
            "Unable to upload the book."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Store management
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Upload A Book
          </h1>

          <p className="mt-2 text-gray-500">
            Add a new book to your online store.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-5 shadow-sm sm:p-8 lg:p-10">
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
              handleBookSubmit
            }
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <Label
                  htmlFor="bookTitle"
                  value="Book Title"
                />

                <TextInput
                  id="bookTitle"
                  name="bookTitle"
                  className="mt-2"
                  placeholder="Enter book title"
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
                  className="mt-2"
                  placeholder="Enter author name"
                  required
                  minLength={2}
                  maxLength={100}
                  disabled={loading}
                />
              </div>
            </div>

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
                  className="mt-2"
                  placeholder="https://example.com/book.jpg"
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
                  name="categoryName"
                  value={
                    selectedCategory
                  }
                  onChange={
                    handleCategoryChange
                  }
                  className="mt-2"
                  required
                  disabled={loading}
                >
                  <option value="">
                    Select category
                  </option>

                  {BOOK_CATEGORIES.map(
                    (category) => (
                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>
                    )
                  )}
                </Select>
              </div>
            </div>

            <div>
              <Label
                htmlFor="bookDescription"
                value="Book Description"
              />

              <Textarea
                id="bookDescription"
                name="bookDescription"
                className="mt-2"
                placeholder="Write your book description..."
                rows={7}
                required
                minLength={10}
                maxLength={5000}
                disabled={loading}
              />
            </div>

            <div>
              <Label
                htmlFor="bookPDFURL"
                value="Book PDF URL"
              />

              <TextInput
                id="bookPDFURL"
                name="bookPDFURL"
                type="url"
                className="mt-2"
                placeholder="https://example.com/book.pdf"
                required
                disabled={loading}
              />
            </div>

            <div>
              <h2 className="mb-4 text-lg font-bold">
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
                    className="mt-2"
                    placeholder="500"
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
                    className="mt-2"
                    placeholder="20"
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
                    className="mt-2"
                    placeholder="400"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            <div className="pt-3">
              <Button
                type="submit"
                disabled={loading || !user}
                className="w-full sm:w-auto"
              >
                {loading ? (
                  <>
                    <Spinner
                      size="sm"
                      className="mr-2"
                    />
                    Uploading...
                  </>
                ) : (
                  "Upload Book"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UploadBook;
import {
  useCallback,
  useEffect,
  useState,
} from "react";

import API_URL from "../config/api";

const useBooks = () => {
  const [books, setBooks] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const fetchBooks = useCallback(
    async (signal) => {
      if (!API_URL) {
        setError(
          "Backend API is not configured."
        );
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response =
          await fetch(
            `${API_URL}/all-books`,
            {
              method: "GET",
              signal,
              headers: {
                Accept:
                  "application/json",
              },
            }
          );

        let data = null;

        try {
          data =
            await response.json();
        } catch {
          data = null;
        }

        if (!response.ok) {
          throw new Error(
            data?.message ||
              `Server returned ${response.status}.`
          );
        }

        if (!Array.isArray(data)) {
          throw new Error(
            "Invalid book data received from server."
          );
        }

        setBooks(data);
      } catch (error) {
        if (
          error.name ===
          "AbortError"
        ) {
          return;
        }

        setError(
          error.message ||
            "Unable to load books."
        );
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    },
    []
  );

  useEffect(() => {
    const controller =
      new AbortController();

    fetchBooks(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchBooks]);

  const retry = useCallback(() => {
    const controller =
      new AbortController();

    fetchBooks(controller.signal);

    return controller;
  }, [fetchBooks]);

  return {
    books,
    loading,
    error,
    retry,
  };
};

export default useBooks;

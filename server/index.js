require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const {
  MongoClient,
  ServerApiVersion,
  ObjectId,
} = require("mongodb");

// =====================================================
// APP CONFIGURATION
// =====================================================

const app = express();

const PORT = Number(process.env.PORT) || 3000;

const MONGODB_URI = process.env.MONGODB_URI;

const DB_NAME =
  process.env.DB_NAME || "BookInventory";

const COLLECTION_NAME =
  process.env.COLLECTION_NAME || "books";

const NODE_ENV =
  process.env.NODE_ENV || "development";

// =====================================================
// ENVIRONMENT VALIDATION
// =====================================================

if (!MONGODB_URI) {
  console.error(
    "❌ MONGODB_URI is missing."
  );

  process.exit(1);
}

// =====================================================
// CORS CONFIGURATION
// =====================================================

const allowedOrigins = [
  "http://localhost:5173",
  "https://e-commerce-books-chi.vercel.app",
  process.env.CLIENT_URL,
]
  .filter(Boolean)
  .flatMap((url) => url.split(","))
  .map((url) => url.trim())
  .filter(Boolean);

const uniqueAllowedOrigins = [
  ...new Set(allowedOrigins),
];

console.log(
  "🌐 Allowed CORS origins:",
  uniqueAllowedOrigins
);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests without Origin.
    if (!origin) {
      return callback(null, true);
    }

    if (uniqueAllowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.error(
      `❌ CORS blocked origin: ${origin}`
    );

    return callback(
      new Error(
        `CORS blocked for origin: ${origin}`
      )
    );
  },

  credentials: true,

  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
  ],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Accept",
    "X-Requested-With",
  ],

  optionsSuccessStatus: 204,
};

// IMPORTANT: CORS before routes
app.use(cors(corsOptions));

app.options("*", cors(corsOptions));

// =====================================================
// SECURITY
// =====================================================

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// =====================================================
// BODY PARSER
// =====================================================

app.use(
  express.json({
    limit: "1mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "1mb",
  })
);

// =====================================================
// RATE LIMIT
// =====================================================

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 300,

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,
    message:
      "Too many requests. Please try again later.",
  },
});

// Your actual API routes are not under /api,
// so apply the limiter to API requests globally.
// If you later move routes under /api,
// change this back to app.use("/api", apiLimiter).

app.use(apiLimiter);

// =====================================================
// MONGODB
// =====================================================

const client = new MongoClient(
  MONGODB_URI,
  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  }
);

let bookCollection;

// =====================================================
// OBJECT ID VALIDATION
// =====================================================

const isValidObjectId = (id) => {
  return (
    typeof id === "string" &&
    ObjectId.isValid(id)
  );
};

// =====================================================
// HEALTH CHECK
// =====================================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "📚 Book Store API is running",
    environment: NODE_ENV,
    status: "OK",
  });
});

// =====================================================
// DATABASE HEALTH CHECK
// =====================================================

app.get("/health", async (req, res) => {
  try {
    await client
      .db("admin")
      .command({ ping: 1 });

    res.status(200).json({
      success: true,
      message:
        "Server and MongoDB are healthy",
      database: "connected",
    });
  } catch (error) {
    console.error(
      "❌ Health check failed:",
      error
    );

    res.status(503).json({
      success: false,
      message:
        "Database is unavailable",
    });
  }
});

// =====================================================
// CREATE BOOK
// POST /upload-books
// =====================================================

app.post(
  "/upload-books",
  async (req, res, next) => {
    try {
      const data = req.body;

      if (
        !data ||
        typeof data !== "object" ||
        Array.isArray(data)
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid book data.",
        });
      }

      const result =
        await bookCollection.insertOne(
          data
        );

      res.status(201).json({
        success: true,
        message:
          "Book uploaded successfully.",
        insertedId:
          result.insertedId,
      });
    } catch (error) {
      next(error);
    }
  }
);

// =====================================================
// GET ALL BOOKS
// GET /all-books
// =====================================================

app.get(
  "/all-books",
  async (req, res, next) => {
    try {
      const { category } =
        req.query;

      const query = {};

      if (
        category &&
        typeof category === "string"
      ) {
        query.category =
          category.trim();
      }

      const books =
        await bookCollection
          .find(query)
          .sort({ _id: -1 })
          .toArray();

      res.status(200).json(books);
    } catch (error) {
      next(error);
    }
  }
);

// =====================================================
// GET SINGLE BOOK
// GET /books/:id
// =====================================================

app.get(
  "/books/:id",
  async (req, res, next) => {
    try {
      const { id } =
        req.params;

      if (
        !isValidObjectId(id)
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid book ID.",
        });
      }

      const book =
        await bookCollection.findOne({
          _id: new ObjectId(id),
        });

      if (!book) {
        return res.status(404).json({
          success: false,
          message:
            "Book not found.",
        });
      }

      res.status(200).json(book);
    } catch (error) {
      next(error);
    }
  }
);

// =====================================================
// UPDATE BOOK
// PATCH /books/:id
// =====================================================

app.patch(
  "/books/:id",
  async (req, res, next) => {
    try {
      const { id } =
        req.params;

      const updateBookData =
        req.body;

      if (
        !isValidObjectId(id)
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid book ID.",
        });
      }

      if (
        !updateBookData ||
        typeof updateBookData !==
          "object" ||
        Array.isArray(
          updateBookData
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid update data.",
        });
      }

      // Never allow changing MongoDB ID.
      delete updateBookData._id;

      const result =
        await bookCollection.updateOne(
          {
            _id: new ObjectId(id),
          },
          {
            $set: updateBookData,
          },
          {
            upsert: false,
          }
        );

      if (
        result.matchedCount === 0
      ) {
        return res.status(404).json({
          success: false,
          message:
            "Book not found.",
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Book updated successfully.",
        modifiedCount:
          result.modifiedCount,
      });
    } catch (error) {
      next(error);
    }
  }
);

// =====================================================
// DELETE BOOK
// DELETE /books/:id
// =====================================================

app.delete(
  "/books/:id",
  async (req, res, next) => {
    try {
      const { id } =
        req.params;

      if (
        !isValidObjectId(id)
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid book ID.",
        });
      }

      const result =
        await bookCollection.deleteOne(
          {
            _id: new ObjectId(id),
          }
        );

      if (
        result.deletedCount === 0
      ) {
        return res.status(404).json({
          success: false,
          message:
            "Book not found.",
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Book deleted successfully.",
        deletedCount:
          result.deletedCount,
      });
    } catch (error) {
      next(error);
    }
  }
);

// =====================================================
// GET PRICE INFORMATION
// GET /price
// =====================================================

app.get(
  "/price",
  async (req, res, next) => {
    try {
      const books =
        await bookCollection
          .find(
            {},
            {
              projection: {
                _id: 1,
                bookTitle: 1,
                price: 1,
                totalprice: 1,
                discountPercentage: 1,
              },
            }
          )
          .toArray();

      res.status(200).json(books);
    } catch (error) {
      next(error);
    }
  }
);

// =====================================================
// 404 HANDLER
// =====================================================

app.use(
  (req, res) => {
    res.status(404).json({
      success: false,
      message:
        `Route ${req.method} ${req.originalUrl} not found.`,
    });
  }
);

// =====================================================
// GLOBAL ERROR HANDLER
// =====================================================

app.use(
  (error, req, res, next) => {
    console.error(
      "❌ Server Error:",
      error
    );

    if (res.headersSent) {
      return next(error);
    }

    // CORS error
    if (
      error.message?.startsWith(
        "CORS blocked"
      )
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Request blocked by CORS policy.",
      });
    }

    res.status(500).json({
      success: false,
      message:
        NODE_ENV === "production"
          ? "Internal server error."
          : error.message,
    });
  }
);

// =====================================================
// START SERVER
// =====================================================

const startServer =
  async () => {
    try {
      console.log(
        "🔄 Connecting to MongoDB..."
      );

      await client.connect();

      await client
        .db("admin")
        .command({
          ping: 1,
        });

      console.log(
        "✅ MongoDB Connected Successfully."
      );

      const database =
        client.db(DB_NAME);

      bookCollection =
        database.collection(
          COLLECTION_NAME
        );

      console.log(
        `📚 Collection initialized: ${DB_NAME}.${COLLECTION_NAME}`
      );

      app.listen(
        PORT,
        "0.0.0.0",
        () => {
          console.log(
            `🚀 Server running on port ${PORT}`
          );

          console.log(
            `🌐 Environment: ${NODE_ENV}`
          );

          console.log(
            `🌐 Allowed origins: ${uniqueAllowedOrigins.join(
              ", "
            )}`
          );
        }
      );
    } catch (error) {
      console.error(
        "❌ Failed to start server."
      );

      console.error(error);

      try {
        await client.close();
      } catch {}

      process.exit(1);
    }
  };

// =====================================================
// GRACEFUL SHUTDOWN
// =====================================================

const shutdown =
  async (signal) => {
    console.log(
      `\n🛑 ${signal} received. Shutting down...`
    );

    try {
      await client.close();

      console.log(
        "✅ MongoDB connection closed."
      );

      process.exit(0);
    } catch (error) {
      console.error(
        "❌ Shutdown error:",
        error
      );

      process.exit(1);
    }
  };

process.on(
  "SIGINT",
  () => shutdown("SIGINT")
);

process.on(
  "SIGTERM",
  () => shutdown("SIGTERM")
);

// =====================================================
// START
// =====================================================

startServer();
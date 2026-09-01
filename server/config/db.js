// const { MongoClient, ServerApiVersion } = require("mongodb");

// const uri = process.env.MONGODB_URI;

// if (!uri) {
//   throw new Error("❌ MONGODB_URI is not defined in environment variables");
// }

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },

//   // Production-friendly connection settings
//   maxPoolSize: 20,
//   minPoolSize: 5,
//   serverSelectionTimeoutMS: 10000,
//   connectTimeoutMS: 10000,
//   socketTimeoutMS: 45000,
// });

// let database;

// async function connectDB() {
//   try {
//     await client.connect();

//     // Verify authentication + connection
//     await client.db("admin").command({ ping: 1 });

//     database = client.db();

//     console.log("✅ MongoDB connected successfully");
//     console.log(`📦 Database: ${database.databaseName}`);

//     return database;
//   } catch (error) {
//     console.error("❌ MongoDB connection failed");

//     if (error.code === 8000) {
//       console.error(
//         "Authentication failed. Check your MongoDB Atlas database username/password."
//       );
//     } else {
//       console.error(error.message);
//     }

//     process.exit(1);
//   }
// }

// function getDB() {
//   if (!database) {
//     throw new Error("Database has not been initialized");
//   }

//   return database;
// }

// async function closeDB() {
//   await client.close();
//   console.log("MongoDB connection closed");
// }

// module.exports = {
//   connectDB,
//   getDB,
//   closeDB,
// };
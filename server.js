import express from "express";
import cors from "cors";
import teamRouter from "./routes/teamRoute.js";
import bookRouter from "./routes/bookRoute.js";
import connectDB from "./config/mongodb.js";
import dotenv from 'dotenv';
dotenv.config();  // ทำให้สามารถใช้ process.env ได้
// App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
// connectCloudinary();
// middlewares
app.use(express.json());
const allowedOrigins = [
    "http://localhost:5175", // For local development
    "http://localhost:5176", // For local development
    "http://localhost:5173"
  ];
  // Configure CORS
  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (e.g., mobile apps or curl)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
          callback(null, true); // Allow the origin
        } else {
          callback(new Error("Not allowed by CORS")); // Block the origin
        }
      },
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true, // Allow cookies or Authorization headers
    })
  );
// api endpoints
app.use("/api/team-members", teamRouter);
app.use("/api/book", bookRouter);
app.get("/", (req,res)=> {
    res.send("API Working");
});
app.listen(port, ()=> {
     console.log("Server started on PORT : " + port + ":raised_hands: ")
});
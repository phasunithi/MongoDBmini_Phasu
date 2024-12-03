import express from "express";
import { getAllBookings, createBooking, updateBooking, deleteBooking } from "../controllers/bookController.js";
const bookRouter = express.Router();
bookRouter.get("/", getAllBookings);
bookRouter.post("/", createBooking);
bookRouter.put("/:meeting_id", updateBooking); // ใช้ meeting_id ใน URL
bookRouter.delete("/:meeting_id", deleteBooking); // ใช้ meeting_id ใน URL
export default bookRouter;
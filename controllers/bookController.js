import mongoose from "mongoose";
import Meeting from "../models/Meeting.js";
// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Meeting.find(); // ดึงข้อมูลการจองทั้งหมด
    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Create a booking
export const createBooking = async (req, res) => {
    try {
        const { slot, duration, staff_id, manager_id } = req.body;
        // คำนวณ startTime และ endTime
        const startTime = slot;
        const endTime = new Date(new Date(slot).getTime() + duration * 60000).toISOString();
        const newBooking = new Meeting({
            startTime,
            endTime,
            duration,
            teamMember: staff_id, // ใช้เป็น String
            manager: manager_id,  // ใช้เป็น String
        });
        await newBooking.save();
        res.status(201).json({ message: "created" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// Update booking
export const updateBooking = async (req, res) => {
  try {
    const { meeting_id } = req.params;  // รับ meeting_id จาก URL
    const { slot, duration } = req.body;
    // แปลง meeting_id จาก string ให้เป็น ObjectId
    const objectId = new mongoose.Types.ObjectId(meeting_id);
    // ค้นหาหรืออัพเดตการจอง
    const updatedBooking = await Meeting.findByIdAndUpdate(objectId, { slot, duration }, { new: true });
    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "updated" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Delete booking
export const deleteBooking = async (req, res) => {
  try {
    const { meeting_id } = req.params;  // รับ meeting_id จาก URL
    // แปลง meeting_id จาก string ให้เป็น ObjectId
    const objectId = new mongoose.Types.ObjectId(meeting_id);
    // ลบข้อมูลการจอง
    const deletedBooking = await Meeting.findByIdAndDelete(objectId);
    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
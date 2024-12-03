import mongoose from "mongoose";
const { Schema } = mongoose;
// สร้าง schema สำหรับ Meeting
const MeetingSchema = new Schema({
  startTime: { type: Date, default: Date.now},
  endTime: { type: Date, default: Date.now },
  duration: { type: Number, required: true },
  teamMember: { type: String, required: true },
  manager: { type: String,  required: true },
});
// สร้างโมเดลจาก schema
const Meeting = mongoose.model("Meeting", MeetingSchema);
export default Meeting;


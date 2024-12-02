import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  { 
    courseId: { type: String, required: true, unique: true } ,// Add courseId as unique
    name: { type: String, required: true }, // Name of the course
    number: { type: String }, // Course number, e.g., "RS4550"
    credits: { type: Number, default: 0 }, // Number of credits, default to 0
    description: { type: String }, // Description of the course
    startDate: { type: String }, // Start date of the course
    endDate: { type: String }, // End date of the course
    department: { type: String }, // Department offering the course
  },
  { collection: "courses" }
);

export default courseSchema;

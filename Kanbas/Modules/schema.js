import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
  
    name: String,
    description: String,
    course: { type: String, ref: "CourseModel" },
    moduleId: { type: String, required: true, unique: true }
  },
  { collection: "modules" }
);
export default schema;
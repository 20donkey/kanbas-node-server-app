import mongoose from "mongoose";




const assignmentSchema = new mongoose.Schema(
    { 
        assignmentId: {
            type: String,
            required: true, 
            unique: true,  
          },
          title: {
            type: String,
            required: true, 
          },
          course: {
            type: String,
           
          },
          dueDate: {
            type: Date,
           
          },
          points: {
            type: Number, // Ensures the points field accepts only numbers
            required: true,
            min: 0,  
          },
    },
    { collection: "assignments" }
  );

export default assignmentSchema;


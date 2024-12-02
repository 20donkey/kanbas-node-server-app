// import db from "../Database/index.js";

// // Retrieve all assignments for a specific course
// export const getAssignmentsByCourse = (courseId) => {
//   return db.assignments.filter((assignment) => assignment.course === courseId);
// };

// // Retrieve a specific assignment by ID
// export const getAssignmentById = (assignmentId) => {
//   return db.assignments.find((assignment) => assignment._id === assignmentId);
// };

// // Create a new assignment for a course
// export const createAssignment = (courseId, assignmentData) => {
//   const newAssignment = {
//     ...assignmentData,
//     course: courseId,
//     _id: new Date().getTime().toString(), // Generate a unique ID
//   };
//   db.assignments.push(newAssignment);
//   return newAssignment;
// };

// // Update an existing assignment by ID
// export const updateAssignment = (assignmentId, assignmentData) => {
//   const assignmentIndex = db.assignments.findIndex(
//     (assignment) => assignment._id === assignmentId
//   );
//   if (assignmentIndex === -1) return null;

//   db.assignments[assignmentIndex] = {
//     ...db.assignments[assignmentIndex],
//     ...assignmentData,
//   };
//   return db.assignments[assignmentIndex];
// };

// // Delete an assignment by ID
// export const deleteAssignment = (assignmentId) => {
//   const initialLength = db.assignments.length;
//   db.assignments = db.assignments.filter(
//     (assignment) => assignment._id !== assignmentId
//   );
//   return db.assignments.length < initialLength; // Return true if deletion was successful
// };


import model from "./model.js"



// Create a new assignment for a course
export function createAssignment(assignment){
    if (!assignment.assignmentId) {
        assignment.assignmentId = `assignment-${Date.now()}`;
      }
    delete assignment._id
    return model.create(assignment);
};


// Fetch all assignments for a specific course
export const findAssignmentsByCourse = async (courseId) => {
  try {
    console.log("courseId passed in dao:", courseId)
    console.log("Querying MongoDB with:", { course: courseId });
    const result = await model.find({course:courseId});
     console.log("query result is :", result);
    return result;

  } catch (error) {
    console.error("Error finding assignments by course:", error);
    throw error;
  }
};

// Fetch a single assignment by its ID

export function findAssignmentById(assignmentId) {
    console.log("fetched assignment by this id:", assignmentId)
    
    return model.findOne({ _id: assignmentId }); 
  }
  

// Update an existing assignment by its ID

export function updateAssignment(assignmentId, assignmentUpdates) {
    console.log("qeury for update assignment recieved in dao:", assignmentId, assignmentUpdates)
    return model.updateOne({ _id: assignmentId }, { $set: assignmentUpdates });

  }

// Delete an assignment by its ID

export function deleteAssignment(AssignmentId) {
    console.log("trying to delete Assignment:", AssignmentId)
    return model.deleteOne({ _id: AssignmentId });
   }
   

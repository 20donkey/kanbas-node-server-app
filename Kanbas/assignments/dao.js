import db from "../Database/index.js";

// Retrieve all assignments for a specific course
export const getAssignmentsByCourse = (courseId) => {
  return db.assignments.filter((assignment) => assignment.course === courseId);
};

// Retrieve a specific assignment by ID
export const getAssignmentById = (assignmentId) => {
  return db.assignments.find((assignment) => assignment._id === assignmentId);
};

// Create a new assignment for a course
export const createAssignment = (courseId, assignmentData) => {
  const newAssignment = {
    ...assignmentData,
    course: courseId,
    _id: new Date().getTime().toString(), // Generate a unique ID
  };
  db.assignments.push(newAssignment);
  return newAssignment;
};

// Update an existing assignment by ID
export const updateAssignment = (assignmentId, assignmentData) => {
  const assignmentIndex = db.assignments.findIndex(
    (assignment) => assignment._id === assignmentId
  );
  if (assignmentIndex === -1) return null;

  db.assignments[assignmentIndex] = {
    ...db.assignments[assignmentIndex],
    ...assignmentData,
  };
  return db.assignments[assignmentIndex];
};

// Delete an assignment by ID
export const deleteAssignment = (assignmentId) => {
  const initialLength = db.assignments.length;
  db.assignments = db.assignments.filter(
    (assignment) => assignment._id !== assignmentId
  );
  return db.assignments.length < initialLength; // Return true if deletion was successful
};

import Database from "../Database/index.js";

export const findEnrollmentsByUserId = (userId) => {
  return Database.enrollments.filter((enrollment) => enrollment.user === userId);
};

export const enrollUserInCourse = (userId, courseId) => {
  const enrollmentExists = Database.enrollments.some(
    (enrollment) => enrollment.user === userId && enrollment.course === courseId
  );
  if (!enrollmentExists) {
    Database.enrollments.push({ _id: Date.now().toString(), user: userId, course: courseId });
  }
};

export const unenrollUserFromCourse = (userId, courseId) => {
  Database.enrollments = Database.enrollments.filter(
    (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
  );
};


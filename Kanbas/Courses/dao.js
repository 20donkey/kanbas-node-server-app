import Database from "../Database/index.js";
import model from "./model.js";
import EnrollmentModel from "../Enrollments/model.js";
export function findAllCourses() {
    return model.find();
}
export function findCourseByCourseId(courseId) {
    console.log("looking for course by:", courseId)
    return model.findOne({ courseId: courseId }); // Query the database by courseId
  }
  
export async function findCoursesForEnrolledUser(userId) {
    const enrollments = await EnrollmentModel.find({ user: userId }).populate("course");


    const enrolledCourses = enrollments.map((enrollment) => enrollment.course);

    return enrolledCourses;
  }
  export function createCourse(course) {
    if (!course.courseId) {
        course.courseId = `COURSE-${Date.now()}`; // Example: Generate unique courseId
      }
    delete course._id;
    console.log("new course passed in dao:", course)
 return model.create(course);
  }
  export function deleteCourse(courseId) {
    console.log("trying to delete course:", courseId)
    return model.deleteOne({ courseId: courseId });
   }
   
  export function updateCourse(courseId, courseUpdates) {
    return model.updateOne({ _id: courseId }, { $set: courseUpdates });

  }
  
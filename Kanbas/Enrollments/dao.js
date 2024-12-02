import model from "./model.js"
import userModel from "../Users/model.js"



export const findEnrollmentsByUserId = async (userObjectId) => {
    console.log("Querying enrollments for user ObjectId:", userObjectId);
  
    const enrollments = await model
      .find({ user: userObjectId }) // Query the `enrollments` collection by the user's ObjectId
      .populate({
        path: "course", // Populate course details
        select: "courseId name description", // Select specific fields to return
      });
  
    console.log("Enrollments fetched:", enrollments);
    return enrollments.map((enrollment) => enrollment.course);
  };

    export async function findUsersForCourse(courseId) {
        const enrollments = await model.find({ course: courseId }).populate("user");
        return enrollments.map((enrollment) => enrollment.user);
       }
       
     
      

   export function enrollUserInCourse(user, course) {
   
    return model.create({ user, course });
   }
   export function unenrollUserFromCourse(user, course) {
    return model.deleteOne({ user, course });
   }
   

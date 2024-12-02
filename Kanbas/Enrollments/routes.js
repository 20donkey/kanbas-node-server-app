import * as enrollmentsDao from "./dao.js";
import * as usersDao from "../Users/dao.js";
import * as coursesDao from "../Courses/dao.js";
export default function EnrollmentRoutes(app) {
//   app.get("/api/users/:userId/enrollments", async (req, res) => {
//     const { userId } = req.params;
//     const enrollments = await enrollmentsDao.findEnrollmentsByUserId(userId);
//     console.log("looking for enrollment of this user:", userId)
//     res.json(enrollments);
//   });
app.get("/api/users/:userId/enrollments", async (req, res) => {
    const { userId } = req.params; // userId is the oldId (e.g., 456)
    console.log("Looking for enrollments for user:", userId);
  
    try {
      // Find the user in the `users` collection using `oldId`
      const user = await usersDao.findUserByOldId(userId); // DAO method to fetch user by oldId
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      console.log("User found:", user);
  
      // Query enrollments using the user's ObjectId (_id)
      const enrollments = await enrollmentsDao.findEnrollmentsByUserId(user._id); // Pass the ObjectId to the DAO method
      console.log("Enrollments fetched:", enrollments);
  
      res.json(enrollments);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.post("/api/users/:userId/enrollments/:courseId", async (req, res) => {
    try {
      const { userId, courseId } = req.params;
  
      // Find the user by their oldId
      const user = await usersDao.findUserByOldId(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Find the course by its courseId
      const course = await coursesDao.findCourseByCourseId(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      console.log("Data being inserted into enrollments:", course, user);
  
      // Use the found object IDs for enrollment
      await enrollmentsDao.enrollUserInCourse(user._id, course._id);
  
      res.sendStatus(200);
    } catch (error) {
      console.error("Error enrolling user in course:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.delete("/api/users/:userId/enrollments/:courseId", async (req, res) => {
    try {
      const { userId, courseId } = req.params;
  
      // Find the user by their oldId
      const user = await usersDao.findUserByOldId(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Find the course by its courseId
      const course = await coursesDao.findCourseByCourseId(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
  
      // Use the found object IDs to unenroll the user from the course
      await enrollmentsDao.unenrollUserFromCourse(user._id, course._id);
  
      res.sendStatus(200);
    } catch (error) {
      console.error("Error unenrolling user from course:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
}

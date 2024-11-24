import * as enrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app) {
  app.get("/api/users/:userId/enrollments", async (req, res) => {
    const { userId } = req.params;
    const enrollments = await enrollmentsDao.findEnrollmentsByUserId(userId);
    res.json(enrollments);
  });

  app.post("/api/users/:userId/enrollments/:courseId", async (req, res) => {
    const { userId, courseId } = req.params;
    await enrollmentsDao.enrollUserInCourse(userId, courseId);
    res.sendStatus(200);
  });

  app.delete("/api/users/:userId/enrollments/:courseId", async (req, res) => {
    const { userId, courseId } = req.params;
    await enrollmentsDao.unenrollUserFromCourse(userId, courseId);
    res.sendStatus(200);
  });
}

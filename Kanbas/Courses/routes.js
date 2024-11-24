// import * as dao from "./dao.js";
// import * as modulesDao from "../Modules/dao.js";

// export default function CourseRoutes(app) {
//     app.get("/api/courses/:courseId/modules", (req, res) => {
//         const { courseId } = req.params;
//         const modules = modulesDao.findModulesForCourse(courseId);
//         res.json(modules);
//       });
    
//   app.get("/api/courses", (req, res) => {
//     const courses = dao.findAllCourses();
//     res.send(courses);
//   });
//   app.delete("/api/courses/:courseId", (req, res) => {
//     const { courseId } = req.params;
//     const status = dao.deleteCourse(courseId);
//     res.send(status);
//   });
//   app.put("/api/courses/:courseId", (req, res) => {
//     const { courseId } = req.params;
//     const courseUpdates = req.body;
//     const status = dao.updateCourse(courseId, courseUpdates);
//     res.send(status);
//   });
//   app.post("/api/courses/:courseId/modules", (req, res) => {
//     const { courseId } = req.params;
//     const module = {
//       ...req.body,
//       course: courseId,
//     };
//     const newModule = modulesDao.createModule(module);
//     res.send(newModule);
//   });

// }
import * as dao from "./dao.js";

export default function CourseRoutes(app) {
  app.get("/api/courses", (req, res) => {
    const courses = dao.findAllCourses();
    res.json(courses);
  });

  app.post("/api/courses", (req, res) => {
    const newCourse = dao.createCourse(req.body);
    res.json(newCourse);
  });

  app.put("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    const updatedCourse = dao.updateCourse(courseId, req.body);
    res.json(updatedCourse);
  });

  app.delete("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    dao.deleteCourse(courseId);
    res.sendStatus(204);
  });
}
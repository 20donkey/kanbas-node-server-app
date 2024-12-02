import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js"

export default function CourseRoutes(app) {
    console.log("Registering /api/courses route"); 
    // app.post("/api/courses", async (req, res) => {
    //     const course = await dao.createCourse(req.body);
    //     res.json(course);
    //   });
    const findUsersForCourse = async (req, res) => {
        const { cid } = req.params;
        const course = await dao.findCourseByCourseId(cid)
        const users = await enrollmentsDao.findUsersForCourse(course._id);
        res.json(users);
      };
      app.get("/api/courses/:cid/users", findUsersForCourse);

    app.post("/api/courses", async (req, res) => {
        try {
          // Use the createCourse function from the DAO
          const newCourse = await dao.createCourse(req.body);
          console.log("my new course is : ", newCourse)
          const currentUser = req.session["currentUser"];
          console.log("the current user is:", currentUser)
          
   if (currentUser) {
  
     await enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
     console.log("new course id is ", newCourse._id)
   }

          res.status(201).json(newCourse); // Respond with the created course
        } catch (error) {
          console.error("Error creating course:", error);
          res.status(500).json({ message: "Failed to create course" });
        }
      });

    
    
  app.get("/api/courses",  async (req, res) => {
    const courses = await dao.findAllCourses();
    res.send(courses);
  });
  app.delete("/api/courses/:courseId",  async (req, res) => {
    const { courseId } = req.params;
    const currentUser = req.session["currentUser"];
    const deletedCourse = await dao.findCourseByCourseId(courseId);
    
    
    await enrollmentsDao.unenrollUserFromCourse(currentUser._id, deletedCourse._id);
      console.log("Enrollment deleted for user:", currentUser._id);
      const status = await dao.deleteCourse(courseId);
    res.send(status);
  });

  app.put("/api/courses/:courseId",  async (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = await dao.updateCourse(courseId, courseUpdates);
    res.send(status);
  });



  // create a module
  app.post("/api/courses/:courseId/modules",  async (req, res) => {
    const { courseId } = req.params;
  

    // Create the module with the corresponding course's ObjectId
    const module = {
      ...req.body,
      course: courseId, // Use the ObjectId of the course
    };
    
    const newModule = await modulesDao.createModule(module);
    res.send(newModule);
  });


// find modules for a course
  app.get("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    console.log("courseId from the api request:", courseId)
    
   
    
    const modules = await modulesDao.findModulesForCourse(courseId);
    console.log("modules found for this course:", modules)
    res.json(modules);
  });
 

}
// import * as dao from "./dao.js";

// export default function CourseRoutes(app) {
//   app.get("/api/courses", (req, res) => {
//     const courses = dao.findAllCourses();
//     res.json(courses);
//   });

//   app.post("/api/courses", (req, res) => {
//     const newCourse = dao.createCourse(req.body);
//     res.json(newCourse);
//   });

//   app.put("/api/courses/:courseId", (req, res) => {
//     const { courseId } = req.params;
//     const updatedCourse = dao.updateCourse(courseId, req.body);
//     res.json(updatedCourse);
//   });

//   app.delete("/api/courses/:courseId", (req, res) => {
//     const { courseId } = req.params;
//     dao.deleteCourse(courseId);
//     res.sendStatus(204);
//   });
// }

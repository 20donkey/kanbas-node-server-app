// import * as modulesDao from "./dao.js";
// export default function ModuleRoutes(app) {

//     app.put("/api/modules/:moduleId", async (req, res) => {
//         const { moduleId } = req.params;
//         const moduleUpdates = req.body;
//         const status = await modulesDao.updateModule(moduleId, moduleUpdates);
//         res.send(status);
//       });
    
//  app.delete("/api/modules/:moduleId", async (req, res) => {
//    const { moduleId } = req.params;
//    const status = await modulesDao.deleteModule(moduleId);
//    res.send(status);
//  });

 
// }
import * as modulesDao from "./dao.js";

export default function ModuleRoutes(app) {
  // Update a module for a specific course
  app.put("/api/courses/:courseId/modules/:moduleId", async (req, res) => {
    const { courseId, moduleId } = req.params;
    const moduleUpdates = req.body;
    try {
      const status = await modulesDao.updateModule(courseId, moduleId, moduleUpdates);
      res.send(status);
    } catch (error) {
      console.error("Failed to update module:", error);
      res.status(500).send("Error updating module");
    }
  });

  // Delete a module for a specific course
  app.delete("/api/courses/:courseId/modules/:moduleId", async (req, res) => {
    const { courseId, moduleId } = req.params;
    try {
      const status = await modulesDao.deleteModule(courseId, moduleId);
      res.send(status);
    } catch (error) {
      console.error("Failed to delete module:", error);
      res.status(500).send("Error deleting module");
    }
  });
}

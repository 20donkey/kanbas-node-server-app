import * as dao from "./dao.js"

export default function AssignmentRoutes(app) {
  app.get("/api/courses/:cid/assignments", async (req, res) => {
    const { cid } = req.params;
    console.log("look for assignment for this course Id: ", cid)
    const assignments = await dao.findAssignmentsByCourse(cid)
    console.log("assignmen found for this course: ", assignments)
    res.send(assignments);
  });

  app.get("/api/assignments/:aid", async(req, res) => {
    const { aid } = req.params;
    const assignment = await dao.findAssignmentById(aid)
    res.json(assignment || {});
  });

  app.post("/api/courses/:cid/assignments", async(req, res) => {
    const { cid } = req.params;
    const newAssignment = {
      ...req.body,
      course: cid,
     
    };
    await dao.createAssignment(newAssignment)
    res.json(newAssignment);
  });

  app.put("/api/assignments/:aid", async(req, res) => {
    const { aid } = req.params;
    console.log("recieving assignment id for update:", aid)
    const assignmentUpdates = req.body;
    console.log("updated assignment:", assignmentUpdates)
    const status = await dao.updateAssignment(aid, assignmentUpdates) ;
    res.send(status);
  });
 

  app.delete("/api/assignments/:aid", async(req, res) => {
    const { aid} = req.params;
    const status = await dao.deleteAssignment(aid);
    res.send(status);
  });
}

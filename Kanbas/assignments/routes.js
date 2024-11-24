import db from "../Database/index.js";

export default function AssignmentRoutes(app) {
  app.get("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const assignments = db.assignments.filter((a) => a.course === cid);
    res.json(assignments);
  });

  app.get("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const assignment = db.assignments.find((a) => a._id === aid);
    res.json(assignment || {});
  });

  app.post("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const newAssignment = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
    };
    db.assignments.push(newAssignment);
    res.json(newAssignment);
  });

  app.put("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const index = db.assignments.findIndex((a) => a._id === aid);
    if (index !== -1) {
      db.assignments[index] = { ...db.assignments[index], ...req.body };
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });

  app.delete("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    db.assignments = db.assignments.filter((a) => a._id !== aid);
    res.sendStatus(200);
  });
}


import * as dao from "./dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function UserRoutes(app) {
  
  const findAllUsers = async (req, res) => {
    try {
      const { role, name } = req.query; // Extract `role` from the query string
  
      if (role) {
        // If `role` is provided, find users by role
        const users = await dao.findUsersByRole(role);
        return res.json(users); // Return users with the specified role
      }
      if (name) {
        const users = await dao.findUsersByPartialName(name);
        res.json(users);
        return;
      }
  
  
      // If no `role` is provided, fetch all users
      const users = await dao.findAllUsers();
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

  // Sign in a user
  const signin = async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log("Sign-in attempt:", { username, password }); 
      const currentUser = await dao.findUserByCredentials(username, password);
      console.log("User fetched from Atlas:", currentUser);
      if (currentUser) {
        req.session["currentUser"] = currentUser; // Save current user in session
        res.json(currentUser);
        console.log("Query result:", currentUser);
      } else {
        res.status(401).json({ message: "Invalid username or password" });
        console.log("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  // Sign up a new user
  const signup = async (req, res) => {
    try {
      const existingUser = await dao.findUserByUsername(req.body.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already taken" });
      }
      const newUser = await dao.createUser(req.body);
      req.session["currentUser"] = newUser; // Save new user in session
      res.json(newUser);
    } catch (error) {
      console.error("Error during sign-up:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  // Sign out the current user
  const signout = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error during sign-out:", err);
        return res.status(500).json({ message: "Could not log out" });
      }
      res.clearCookie("connect.sid"); // Clear session cookie
      res.sendStatus(200);
    });
  };

  // Get the profile of the current user
  const profile = (req, res) => {
    console.log("Session data:", req.session); 
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    res.json(currentUser);
  };

  // Update a user
  const updateUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const updates = req.body;
      await dao.updateUser(userId, updates);
      const updatedUser = await dao.findUserById(userId);
      if (req.session["currentUser"] && req.session["currentUser"]._id === userId) {
        req.session["currentUser"] = updatedUser; // Update session if user is the logged-in user
      }
      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  // Find courses for an enrolled user
  const findCoursesForEnrolledUser = async (req, res) => {
    // try {
    //   let { userId } = req.params;
    //   if (userId === "current") {
    //     const currentUser = req.session["currentUser"];
    //     if (!currentUser) {
    //       return res.status(401).json({ message: "Not authenticated" });
    //     }
    //     userId = currentUser._id;
    //   }
    //   const courses = await courseDao.findCoursesForEnrolledUser(userId);
    //   res.json(courses);
    // } catch (error) {
    //   console.error("Error finding courses for user:", error);
    //   res.status(500).json({ message: "Internal server error" });
    // }
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    if (currentUser.role === "ADMIN") {
      const courses = await courseDao.findAllCourses();
      res.json(courses);
      return;
    }
    let { uid } = req.params;
    if (uid === "current") {
      uid = currentUser.oldId;
    }
    const courses = await enrollmentsDao.findCoursesForUser(uid);
    res.json(courses);
 
  };

  // Create a new course
  const createCourse = async (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      const newCourse = await courseDao.createCourse(req.body);
      await enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
      res.json(newCourse);
    } catch (error) {
      console.error("Error creating course:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };
  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
};
const createUser = async (req, res) => {
  const user = await dao.createUser(req.body);
  res.json(user);
};



  // Define routes
  app.post("/api/users/signin", signin);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
  app.put("/api/users/:userId", updateUser);
  app.get("/api/users", findAllUsers);
  app.post("/api/users/current/courses", createCourse);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.get("/api/users/:userId", findUserById);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users", createUser);

}

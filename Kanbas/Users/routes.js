// import * as dao from "./dao.js";
// import * as courseDao from "../Courses/dao.js";
// import * as enrollmentsDao from "../Enrollments/dao.js";

// export default function UserRoutes(app) {
//   const createUser = async (req, res) => {
//     const user = await dao.createUser(req.body);
//     res.json(user);
//   };
//   const deleteUser = async (req, res) => {
//     const status = dao.deleteUser(req.params.userId);
//     res.json(status);
//   };
//   const findAllUsers = async (req, res) => {
//     const { role } = req.query;
//     if (role) {
//       const users = await dao.findUsersByRole(role);
//       res.json(users);
//       return;
//     }
//     const users = dao.findAllUsers();
//     res.json(users);
//   };
//   const findUserById = async (req, res) => {
//     const user = dao.findUserById(req.params.userId);
//     res.json(user);
//   };
//   const updateUser = async (req, res) => {
//     const { userId } = req.params;
//     const updatedUser = await dao.updateUser(userId, req.body);
//     res.json(updatedUser); // Send back the updated user
//   };
  
//   const signup = async (req, res) => {
//     const user = dao.findUserByUsername(req.body.username);
//     if (user) {
//       res.status(400).json({ message: "Username already taken" });
//       return;
//     }
//     const createdUser = await dao.createUser(req.body);
//     req.session.currentUser = createdUser;
//     res.json(createdUser);
//   };

//   const signin = async (req, res) => {
//     const { username, password } = req.body;
//     const user = dao.findUserByCredentials(username, password);
//     if (user) {
//       req.session.currentUser = user;
//       res.json(user);
//     } else {
//       res.sendStatus(401);
//     }
//   };
//   const signout = (req, res) => {
//     req.session.destroy();
//     res.sendStatus(200);
//   };
//   const profile = async (req, res) => {
//     const currentUser = req.session.currentUser;
//     if (!currentUser) {
//       res.sendStatus(401);
//       return;
//     }
//     res.json(currentUser);
//   };
//   const findCoursesForEnrolledUser = (req, res) => {
//     let { userId } = req.params;
//     if (userId === "current") {
//       const currentUser = req.session["currentUser"];
//       if (!currentUser) {
//         res.sendStatus(401);
//         return;
//       }
//       userId = currentUser._id;
//     }
//     const courses = courseDao.findCoursesForEnrolledUser(userId);
//     res.json(courses);
//   };
//   const createCourse = (req, res) => {
//     const currentUser = req.session["currentUser"];
//     const newCourse = courseDao.createCourse(req.body);
//     enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
//     res.json(newCourse);
//   };
//   app.post("/api/users/current/courses", createCourse);

//   app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);

//   app.post("/api/users/signout", signout);
//   app.post("/api/users/signup", signup);
//   app.post("/api/users", createUser);
//   app.get("/api/users", findAllUsers);
//   app.get("/api/users/:userId", findUserById);
//   app.put("/api/users/:userId", updateUser);
//   app.delete("/api/users/:userId", deleteUser);
//   app.post("/api/users/signup", signup);
//   app.post("/api/users/signin", signin);
//   app.post("/api/users/signout", signout);
//   app.post("/api/users/profile", profile);
// }

// import * as dao from "./dao.js";

// let currentUser = null;

// export default function UserRoutes(app) {
//   const updateUser = (req, res) => {
//     const { userId } = req.params;
//     const userUpdates = req.body;
//     dao.updateUser(userId, userUpdates);
//     currentUser = dao.findUserById(userId);
//     res.json(currentUser); // Respond with the updated user for client confirmation
//   };

//   const profile = (req, res) => {
//     if (!currentUser) {
//       return res.sendStatus(401); // Unauthorized if no user is logged in
//     }
//     res.json(currentUser); // Return the current user session data
//   };
//   const signout = (req, res) => {
//     req.session.destroy((err) => {
//       if (err) {
//         console.error("Failed to destroy session:", err);
//         res.status(500).send("Could not log out");
//       } else {
//         res.clearCookie("connect.sid"); // Clear session cookie
//         res.sendStatus(200); // Successfully signed out
//       }
//     });
//   };
  

//   const signin = async (req, res) => {
//     const { username, password } = req.body;
//     const user = dao.findUserByCredentials(username, password);
//     if (!user) {
//       return res.sendStatus(401); // Unauthorized if credentials are invalid
//     }
//     currentUser = user; // Set current session user
//     res.json(currentUser); // Respond with the signed-in user's data
//   };

//   app.put("/api/users/:userId", updateUser);
//   app.post("/api/users/profile", profile);
//   app.post("/api/users/signin", signin);
//   app.post("/api/users/signout", signout);
// }
// import * as dao from "./dao.js";
// export default function UserRoutes(app) {
//   const findAllUsers = async (req, res) => {
//     const users = await dao.findAllUsers();
//     res.json(users);
//   };

//   const signin = async (req, res) => {
//     const { username, password } = req.body;
//     const currentUser = await dao.findUserByCredentials(username, password);
//     if (currentUser) {
//       req.session["currentUser"] = currentUser;
//       res.json(currentUser);
//     } else {
//       res.status(401).json({ message: "Unable to login. Try again later." });
//     }
//   };
//   const updateUser = (req, res) => {
//         const { userId } = req.params;
//         const userUpdates = req.body;
//         dao.updateUser(userId, userUpdates);
//         currentUser = dao.findUserById(userId);
//         res.json(currentUser); // Respond with the updated user for client confirmation
//       };
//   const signup = async (req, res) => {
//     const user = await dao.findUserByUsername(req.body.username);
//     if (user) {
//       res.status(400).json({ message: "Username already taken" });
//       return;
//     }
//     const currentUser = await dao.createUser(req.body);
//     req.session["currentUser"] = currentUser;
//     res.json(currentUser);
//   };
//   const signout = (req, res) => {
//         req.session.destroy((err) => {
//           if (err) {
//             console.error("Failed to destroy session:", err);
//             res.status(500).send("Could not log out");
//           } else {
//             res.clearCookie("connect.sid"); // Clear session cookie
//             res.sendStatus(200); // Successfully signed out
//           }
//         });
//       };
//   const profile = (req, res) => {
//     if (!currentUser) {
//       return res.sendStatus(401); // Unauthorized if no user is logged in
//     }
//     res.json(currentUser); // Return the current user session data
//   };

//   const findCoursesForEnrolledUser = (req, res) => {
//         let { userId } = req.params;
//         if (userId === "current") {
//           const currentUser = req.session["currentUser"];
//           if (!currentUser) {
//             res.sendStatus(401);
//             return;
//           }
//           userId = currentUser._id;
//         }
//         const courses = courseDao.findCoursesForEnrolledUser(userId);
//         res.json(courses);
//       };
//       const createCourse = (req, res) => {
//         const currentUser = req.session["currentUser"];
//         const newCourse = courseDao.createCourse(req.body);
//         enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
//         res.json(newCourse);
//       };
//   app.post("/api/users/signin", signin);
//   app.post("/api/users/signup", signup);
//   app.post("/api/users/signout", signout);
//   app.post("/api/users/profile", profile);
//   app.put("/api/users/:userId", updateUser);
//   app.get("/api/users", findAllUsers);
//   app.post("/api/users/current/courses", createCourse);

//   app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
// }
import * as dao from "./dao.js";

export default function UserRoutes(app) {
  // Fetch all users
  // const findAllUsers = async (req, res) => {
  //   try {
  //     const users = await dao.findAllUsers();
  //     res.json(users);
  //   } catch (error) {
  //     console.error("Error fetching all users:", error);
  //     res.status(500).json({ message: "Internal server error" });
  //   }
    
  // };
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
      const currentUser = await dao.findUserByCredentials(username, password);
      if (currentUser) {
        req.session["currentUser"] = currentUser; // Save current user in session
        res.json(currentUser);
      } else {
        res.status(401).json({ message: "Invalid username or password" });
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
    try {
      let { userId } = req.params;
      if (userId === "current") {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
          return res.status(401).json({ message: "Not authenticated" });
        }
        userId = currentUser._id;
      }
      const courses = await courseDao.findCoursesForEnrolledUser(userId);
      res.json(courses);
    } catch (error) {
      console.error("Error finding courses for user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
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

import express from "express";
import cors from "cors";
import session from "express-session";
import "dotenv/config";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import mongoose from "mongoose";
import Lab5 from "./Lab5/index.js";
import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import EnrollmentRoutes from "./Kanbas/Enrollments/routes.js";
import AssignmentRoutes from "./Kanbas/assignments/routes.js";
const app = express();
const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"

mongoose.connect(CONNECTION_STRING);

// Middleware for CORS (allow frontend to access backend)
app.use(
  cors({
    credentials: true, // Allow cookies and session sharing
    origin: [ "http://localhost:3000",// Local development origin
    "https://kanbas-react-web-app-nian.netlify.app"], // Deployed frontend origin, // Frontend origin
  })
);


app.options("*", cors());
// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware for session management
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas" || "Lab5", // Secret for signing session cookies
  resave: false, // Don't save session if it hasn't been modified
  saveUninitialized: false, // Don't create session until something is stored
};


if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true; // Trust reverse proxy (e.g., for HTTPS setups)
  sessionOptions.cookie = {
    sameSite: "none", // Allow cross-origin cookies
    secure: true, // Only send cookies over HTTPS
    domain: process.env.NODE_SERVER_DOMAIN, // Domain for production
  };
}

app.use(session(sessionOptions));

// Load routes (ensure middleware is set up first)
Lab5(app);
UserRoutes(app);
CourseRoutes(app);

ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);

// Start server
app.listen(process.env.PORT || 4000);

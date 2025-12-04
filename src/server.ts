import express, { NextFunction, Request, Response } from "express";
import { Pool } from "pg";
import initDB from "./config/db";
import { userRoutes } from "./moudles/user/user.routes";
import { todoRoutes } from "./moudles/todo/todo.routes";
import { authRoutes } from "./auth/auth.routes";

const app = express();
// parser
app.use(express.json());
// app.use(express.urlencoded());
// db
const pool = new Pool({
  connectionString:`{config.connection_str}`
})
// initializing DB
initDB();

// logger middleware
const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}\n`);
  next();
};

app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello Next Level Developers!");
});

//users CRUD
app.use("/users",userRoutes);
// todos crud
app.use("/todos",todoRoutes);
// auth routes
app.use("/auth",authRoutes);
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});

export default app;
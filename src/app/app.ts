import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./middleware/globalErrorHandler";
import { CourseRoutes } from "../modules/Course/Course.route";
import { CategoryRoutes } from "../modules/Category/category.route";
import { ReviewRouter } from "../modules/Review/review.route";
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api", CourseRoutes);
app.use("/api", CategoryRoutes);
app.use("/api", ReviewRouter);

const getAController = (req: Request, res: Response) => {
  res.send("Assignment 3!");
};

app.get("/", getAController);

app.use(globalErrorHandler);

export default app;

import express from "express";
import { CategoryController } from "./category.controller";

const router = express.Router();

router.post("/categories", CategoryController.createCategory);
router.get("/categories", CategoryController.getAllCategory);

export const CategoryRoutes = router;

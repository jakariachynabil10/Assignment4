import express from "express";
import { CategoryController } from "./category.controller";
import auth from "../../app/middleware/auth";
import { USER_ROLE } from "../User/User.constant";

const router = express.Router();

router.post("/categories",auth(USER_ROLE.admin), CategoryController.createCategory);
router.get("/categories", CategoryController.getAllCategory);

export const CategoryRoutes = router;

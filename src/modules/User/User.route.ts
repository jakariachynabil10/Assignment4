import express from "express";
import { UserController } from "./User.controller";
import auth from "../../app/middleware/auth";
import { USER_ROLE } from "./User.constant";

const router = express.Router();

router.post('/auth/register', UserController.createUser)
router.post('/auth/login', UserController.loginUser)
router.post(
    '/auth/change-password',
    auth(USER_ROLE.admin, USER_ROLE.user),
    UserController.changePassword
    
  );

export const UserRoutes = router;

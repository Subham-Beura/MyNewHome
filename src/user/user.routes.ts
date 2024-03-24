import { Request, Response, Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
} from "./user.controller";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.get("/:id", getUserById);
userRoutes.post("/", createUser);
userRoutes.put("/:id", updateUserById);

export default userRoutes;

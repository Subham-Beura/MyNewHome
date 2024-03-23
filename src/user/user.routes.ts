import { Request, Response, Router } from "express";
import { createUser, getAllUsers, getUserById } from "./user.controller";
import { warn } from "console";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.get("/:id", getUserById);
userRoutes.post("/", createUser);

export default userRoutes;

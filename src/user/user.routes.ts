import { Request, Response, Router } from "express";
import { createUser, getAllUsers } from "./user.controller";
import { warn } from "console";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/", createUser);

export default userRoutes;

import { Request, Response, Router } from "express";
import { getAllUsers } from "./user.controller";
import { warn } from "console";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);

export default userRoutes;

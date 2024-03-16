import { Request, Response } from "express";
import { db } from "..";
import { user } from "../drizzle/schema";
import { log } from "console";
export async function getAllUsers(req: Request, res: Response) {
  const users = await db.select().from(user);
  log(users);
  res.status(200).json({
    users: users,
  });
}

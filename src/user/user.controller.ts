import { Request, Response } from "express";
import { db } from "..";
import { user } from "../drizzle/schema";
import { eq } from "drizzle-orm";
export async function getAllUsers(req: Request, res: Response) {
  const users = await db.select().from(user);
  res.status(200).json({
    users: users,
  });
}

export async function createUser(req: Request, res: Response) {
  const newUser = req.body;
  try {
    await db.insert(user).values(newUser);
    const userCreated = await db
      .select()
      .from(user)
      .where(eq(user.emailId, newUser.emailId));
    return res.status(201).json(userCreated[0]);
  } catch {
    return res.status(500).json({
      msg: "Illegal Operation",
    });
  }
}

import { Request, Response } from "express";
import { db } from "..";
import { user } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import { Error } from "postgres";
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

export async function getUserById(req: Request, res: Response) {
  try {
    const requestedUser = await db
      .selectDistinct()
      .from(user)
      .where(eq(user.id, req.params.id));
    if (requestedUser.length === 0) throw new Error("User not found");
    return res.status(200).json(requestedUser[0]);
  } catch (error: any) {
    res.status(404).json({ msg: "User not found", error: error.message });
  }
}

export async function updateUserById(req: Request, res: Response) {
  const userId = req.params.id;
  const updatedUser = req.body;
  try {
    await db.update(user).set(updatedUser).where(eq(user.id, userId));
    const userUpdated = await db.select().from(user).where(eq(user.id, userId));
    if (userUpdated.length === 0) throw new Error("User not found");
    return res.status(200).json(userUpdated[0]);
  } catch (error: any) {
    res.status(405).json({ msg: "User not found", error: error.message });
  }
}


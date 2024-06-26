import express, { Request, Response } from "express";

import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { property, user } from "./drizzle/schema";

import * as dotenv from "dotenv";
import userRoutes from "./user/user.routes";
import addressRoutes from "./address/address.routes";
dotenv.config();

const app = express();

app.use(express.json());

export let db: PostgresJsDatabase<Record<string, never>>;

try {
  const queryClient = postgres(process.env.DATABASE_URL as string);
  db = drizzle(queryClient);
  console.log("Connected to database");
} catch (error) {
  console.log("Error connecting to database", error);
}

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/user", userRoutes);
app.use("/address", addressRoutes);

export default app;

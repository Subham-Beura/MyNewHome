import express from "express";

import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { property, user } from "./drizzle/schema";

import dotenv from "dotenv";
dotenv.config();


const app = express();


let db: PostgresJsDatabase<Record<string, never>>;
try {
  const queryClient = postgres(process.env.DATABASE_URL as string);
  db = drizzle(queryClient);
  console.log("Connected to database");
} catch (error) {
  console.log("Error connecting to database", error);
}

app.get("/", async (req, res) => {
  const result = await db.select().from(property);
  console.log(result);
  res.send("Hello World!");
});

export default app;

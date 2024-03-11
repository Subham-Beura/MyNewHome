import express from "express";

import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

import {user} from "./drizzle/schema"

// import {user} from 

import dotenv from "dotenv";
dotenv.config();

async function connectDatabase() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  const db = drizzle(client);
  return db;
}

const app = express();
const port = 3000;
let db: Promise<NodePgDatabase<Record<string, never>>>;
try {
  db = connectDatabase();
  console.log("Connected to database");
} catch (error) {
  console.log("Error connecting to database", error);
}

app.get("/", async (req, res) => {
  const result= await (await db).select().from(user);
  console.log(result)
  res.send("Hello World!");
});

// app.use("/testing",testingRoutes)

const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
// Stop the server
server.close();

export default app;

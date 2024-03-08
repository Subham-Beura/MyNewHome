import express from "express";
import mongoose from "mongoose";

import testingRoutes from "./testing/hello.routes";

const app = express();
const port = 3000;

// mongoose.connect("mongodb://{mongodb_connection_string}");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/testing",testingRoutes)

const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
// Stop the server
server.close();

export default app;

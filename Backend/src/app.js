import express from "express";
import aiRoutes from "./routes/ai.routes.js";
import cors from "cors";

const app = express();
app.use(cors());

// Middleware to parse JSON body
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/ai", aiRoutes);

export default app;

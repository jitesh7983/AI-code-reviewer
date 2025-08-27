import express from "express";
import aiRoutes from "./routes/ai.routes.js";
import cors from "cors";

const app = express();

// ✅ Secure CORS: only allow your Netlify frontend
app.use(cors({
  origin: "https://coderevie.netlify.app",  // your Netlify site
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

// Middleware to parse JSON body
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/ai", aiRoutes);

export default app;

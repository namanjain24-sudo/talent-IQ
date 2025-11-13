import express from "express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";

const app = express();
const __dirname = path.resolve();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "https://talent-iq-rose.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ msg: "API is up and running 🚀" });
});

// if (ENV.NODE_ENV === "production") {
//   const frontendPath = path.join(__dirname, "../frontend/dist");
//   app.use(express.static(frontendPath));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(frontendPath, "index.html"));
//   });
// }

// Start Server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () =>
      console.log(`✅ Server is running on port: ${ENV.PORT}`)
    );
  } catch (error) {
    console.error("💥 Error starting the server:", error);
  }
};

startServer();

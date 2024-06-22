import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import { sequelize } from "./config/sequalize";

// Load .env : environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(express.json()); // Parsear JSON
app.use(cors()); // CORS
app.use(helmet()); // Basic security
app.use(morgan("combined")); // HTTP request logging

// Rutas
app.use("/api", userRoutes);
app.use("/api/auth", authRoutes);

// Database synchronization
sequelize.sync({ force: true }).then(() => {
  console.log("Database synced");
});

// Reads the port from the environment variables
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;

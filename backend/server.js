import express from "express";
import cors from "cors";
import { initDatabase } from "./models/database.js";
import potionRoutes from "./routes/potionRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api/potions", potionRoutes);
app.use("/api/auth", authRoutes);

initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});

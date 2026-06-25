import { Router } from "express";
import { getAllPotions, createPotion, deletePotion } from "../controllers/potionController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", getAllPotions);
router.post("/", verifyToken, createPotion);
router.delete("/:id", verifyToken, deletePotion);

export default router;

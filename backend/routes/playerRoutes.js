import express from "express";
import { addPlayer, getPlayers, updateScore } from "../controllers/PlayerController.js";

const router = express.Router();

router.post("/add", addPlayer);
router.get("/", getPlayers);
router.put("/update/:id", updateScore);

export default router;

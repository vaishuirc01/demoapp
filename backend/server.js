import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import playerRoutes from "./routes/playerRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/players", playerRoutes);

const PORT = process.env.PORT;
const MONGO = process.env.MONGO_URI;

mongoose
  .connect(MONGO)
  .then(() => console.log("Mongo DB Connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

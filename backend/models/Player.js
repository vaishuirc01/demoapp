import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  targetNumber: { type: Number, required: true },
  attempts: { type: Number, default: 0 },
  won: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Player", playerSchema);

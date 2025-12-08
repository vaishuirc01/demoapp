import Player from "../models/Player.js";

// CREATE PLAYER WITH RANDOM NUMBER
export const addPlayer = async (req, res) => {
  const { name } = req.body;

  try {
    const targetNumber = Math.floor(Math.random() * 100) + 1;

    const newPlayer = await Player.create({
      name,
      targetNumber,
      attempts: 0,
      won: false
    });

    res.json(newPlayer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL PLAYERS (leaderboard)
export const getPlayers = async (req, res) => {
  try {
    const players = await Player.find().sort({ attempts: 1 });
    res.json(players);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE score
export const updateScore = async (req, res) => {
  const { id } = req.params;
  const { attempts, won } = req.body;

  try {
    const updated = await Player.findByIdAndUpdate(
      id,
      { attempts, won },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

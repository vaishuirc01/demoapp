import { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Card,
  CardContent,
} from "@mui/material";
import { motion } from "framer-motion";

const API = "https://demoapp-slog.onrender.com/api/players";
;

export default function App() {
  const [name, setName] = useState("");
  const [player, setPlayer] = useState(null);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);

  const startGame = async () => {
    if (!name.trim()) return alert("Enter your name");
    const res = await axios.post(`${API}/add`, { name });
    setPlayer(res.data);
    setMessage("Game Started! Guess 1–100");
  };

  const makeGuess = async () => {
    const num = Number(guess);
    const target = player.targetNumber;

    let won = false;
    let msg = "";

    if (num === target) {
      msg = `🎉 Correct! You guessed in ${attempts + 1} attempts`;
      won = true;
      setGameOver(true);
    } else if (num < target) {
      msg = "⬆ Too Low";
    } else {
      msg = "⬇ Too High";
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    setMessage(msg);

    if (newAttempts >= 10 && !won) {
      setGameOver(true);
      setMessage("❌ You Lost! Only 10 attempts allowed.");
    }

    await axios.put(`${API}/update/${player._id}`, {
      attempts: newAttempts,
      won,
    });
  };

  const showLeaderboard = async () => {
    const res = await axios.get(API);
    const sorted = res.data.sort((a, b) => a.attempts - b.attempts);
    setLeaderboard(sorted.slice(0, 3));
  };

  // START SCREEN
  if (!player)
    return (
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#000",
        }}
      >
        <Paper
          component={motion.div}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          elevation={10}
          sx={{
            padding: 4,
            width: 350,
            textAlign: "center",
            borderRadius: 4,
            background: "rgba(15,15,15,0.9)",
            border: "1px solid #ff0033",
            boxShadow: "0 0 25px #ff003355",
          }}
        >
          <Typography variant="h4" sx={{ color: "#ff0033", mb: 2 }}>
            🔥 Number Guess Game
          </Typography>

          <TextField
            label="Enter your name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputLabelProps={{ style: { color: "#aaa" } }}
            sx={{
              input: { color: "white" },
              mb: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#ff0033" },
                "&:hover fieldset": { borderColor: "#ff3355" },
              },
            }}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={startGame}
            sx={{
              background: "#ff0033",
              py: 1.4,
              borderRadius: 3,
              fontSize: "16px",
              "&:hover": { background: "#cc0028" },
            }}
          >
            Start Game
          </Button>
        </Paper>
      </Box>
    );

  // GAME SCREEN
  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 5,
        background: "#000",
        textAlign: "center",
      }}
    >
      <Card
        component={motion.div}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        sx={{
          maxWidth: 420,
          margin: "auto",
          borderRadius: 4,
          padding: 3,
          background: "rgba(20,20,20,0.95)",
          border: "1px solid #ff0033",
          boxShadow: "0 0 30px #ff003355",
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ color: "#ff0033", mb: 1 }}
          >
            Welcome {player.name}
          </Typography>

          <Typography
            component={motion.p}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            sx={{ fontSize: 18, color: "#ff3355", mb: 2 }}
          >
            {message}
          </Typography>

          {!gameOver && (
            <>
              <TextField
                type="number"
                label="Enter guess"
                fullWidth
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                InputLabelProps={{ style: { color: "#aaa" } }}
                sx={{
                  input: { color: "white" },
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#ff0033" },
                    "&:hover fieldset": { borderColor: "#ff3355" },
                  },
                }}
              />

              <Button
                variant="contained"
                fullWidth
                onClick={makeGuess}
                sx={{
                  background: "#ff0033",
                  py: 1.2,
                  borderRadius: 3,
                  "&:hover": { background: "#cc0028" },
                }}
              >
                Submit Guess
              </Button>

              <Typography mt={2} sx={{ color: "#bbb" }}>
                Attempts: {attempts}/10
              </Typography>
            </>
          )}

          {gameOver && (
            <Button
              variant="contained"
              fullWidth
              onClick={showLeaderboard}
              sx={{
                mt: 2,
                background: "#ff0033",
                py: 1.4,
                borderRadius: 3,
                "&:hover": { background: "#cc0028" },
              }}
            >
              🏆 Show Scoreboard
            </Button>
          )}
        </CardContent>
      </Card>

      {/* LEADERBOARD */}
      {leaderboard.length > 0 && (
        <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} mt={4}>
          <Typography variant="h4" sx={{ color: "#ff0033", mb: 3 }}>
            🏆 Leaderboard
          </Typography>

          {leaderboard.map((p, i) => (
            <Paper
              key={i}
              sx={{
                width: 300,
                margin: "10px auto",
                padding: 2,
                background: "rgba(40,40,40,0.9)",
                border: "1px solid #ff0033",
                borderRadius: 3,
                color: "white",
              }}
            >
              <Typography fontSize={18}>
                {i + 1}. {p.name} — {p.attempts} attempts
              </Typography>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
}

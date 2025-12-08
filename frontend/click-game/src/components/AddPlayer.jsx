import { useState } from "react";
import { API } from "../api";

export default function AddPlayer({ onAdd }) {
  const [name, setName] = useState("");

  const addPlayer = async () => {
    if (!name.trim()) return alert("Enter player name");

    const res = await API.post("/players/add", { name });
    onAdd(res.data.player);
    setName("");
  };

  return (
    <div style={styles.box}>
      <input
        style={styles.input}
        placeholder="Enter player name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button style={styles.btn} onClick={addPlayer}>
        Add Player
      </button>
    </div>
  );
}

const styles = {
  box: { display: "flex", gap: "10px", marginBottom: "20px" },
  input: { padding: "10px", width: "250px" },
  btn: {
    padding: "10px 20px",
    background: "black",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

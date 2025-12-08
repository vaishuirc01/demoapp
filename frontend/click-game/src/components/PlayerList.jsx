import { API } from "../api";

export default function PlayerList({ players, refresh }) {
  const updateScore = async (id, score) => {
    await API.put(`/players/update/${id}`, { score });
    refresh();
  };

  return (
    <div>
      <h2>Scoreboard</h2>
      {players.length === 0 && <p>No players added yet.</p>}

      {players.map((p, i) => (
        <div key={p._id} style={styles.row}>
          <span>{i + 1}. {p.name}</span>
          <span>Score: {p.score}</span>

          <button onClick={() => updateScore(p._id, p.score + 1)} style={styles.btn}>
            +1
          </button>

          <button onClick={() => updateScore(p._id, p.score - 1)} style={styles.btnRed}>
            -1
          </button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    background: "#f4f4f4",
    marginBottom: "10px",
  },
  btn: {
    padding: "5px 10px",
    background: "green",
    color: "white",
    border: "none",
  },
  btnRed: {
    padding: "5px 10px",
    background: "red",
    color: "white",
    border: "none",
  },
};

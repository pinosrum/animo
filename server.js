const express = require("express");
const axios = require("axios");
const sqlite3 = require("sqlite3").verbose();

require("dotenv").config();

const app = express();

// DB接続
const db = new sqlite3.Database("moods.db");

// テーブル作成
db.run(`
  CREATE TABLE IF NOT EXISTS moods (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mood TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

app.use(express.json());
app.use(express.static(__dirname));

app.get("/token", async (req, res) => {
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      "grant_type=client_credentials",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: process.env.CLIENT_ID,
          password: process.env.CLIENT_SECRET,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "token error" });
  }
});

app.post("/save-mood", (req, res) => {
  const { mood } = req.body;

  db.run(
    "INSERT INTO moods (mood) VALUES (?)",
    [mood],
    (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      console.log("保存:", mood);
      res.json({ success: true });
    }
  );
});

app.get("/status", (req, res) => {
  db.all(
    "SELECT mood, COUNT(*) as count FROM moods GROUP BY mood",
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    }
  );
});

app.listen(3000, () => {
  console.log("Server running");
});
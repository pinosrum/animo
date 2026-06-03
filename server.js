app.use(express.json());

const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(express.static(__dirname));const express = require("express");

const axios = require("axios");
require("dotenv").config();

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
  console.log(req.body);
  res.json({ success: true });
});

app.listen(3000, () => {
  console.log("Server running");
});


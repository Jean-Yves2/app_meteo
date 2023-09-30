require("dotenv").config();
const path = require("path");
const express = require("express");

const app = express();
const fetch = require("node-fetch").default;
const PORT = process.env.PORT;
const API_KEY = process.env.API_KEY;

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/Html/index.html"));
});

app.get("/weather", async (req, res) => {
  const cityName = req.query.cityName;

  try {
    const response = await fetch(
      `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${cityName}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des données météo" });
  }
});

app.listen(PORT, () => {
  console.log(`Écoute sur http://localhost:${PORT}`);
});

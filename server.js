const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
require("./src/db/sequelize");
const CrudPokemon = require("./src/routes/CrudPokemon.routes");

const app = express();
const PORT = 4000;

app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json());


app.use("/api/pokemons", CrudPokemon);

app.use(({ res }) => {
  const message = "Impossible de trouver la ressource";
  res.status(404).json({ message });
});


app.listen(PORT, () => {
  console.log(`Port : ${PORT}`);
});

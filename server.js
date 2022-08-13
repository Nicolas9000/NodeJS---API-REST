const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const a = require("./src/db/sequelize");
const CrudPokemonRoute = require("./src/routes/CrudPokemon.routes");
const UserRoute = require("./src/routes/User.routes");

const app = express();
const PORT = 4000;

app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json());

app.use("/api/pokemons", CrudPokemonRoute);
app.use("/api/user", UserRoute)

a.initDb();

app.use(({ res }) => {
  const message = "Impossible de trouver la ressource";
  res.status(404).json({ message });
});

app.listen(PORT, () => {
  console.log(`Port : ${PORT}`);
});

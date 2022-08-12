const router = require("express").Router();
const PokemonController = require("../controllers/pokemon.controller");

router.get("/", PokemonController.getAllPokemon);
router.post("/", PokemonController.createPokemon);
router.get("/:id", PokemonController.getPokemonById);
router.put("/:id", PokemonController.updatePokemon);
router.delete("/:id", PokemonController.deletePokemon);

module.exports = router;

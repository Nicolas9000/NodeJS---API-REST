const router = require("express").Router();
const PokemonController = require("../controllers/pokemon.controller");
const auth = require("../auth/auth");

router.get("/", auth, PokemonController.getAllPokemon);
router.post("/", auth, PokemonController.createPokemon);
router.get("/:id", auth, PokemonController.getPokemonById);
router.put("/:id", auth, PokemonController.updatePokemon);
router.delete("/:id", auth, PokemonController.deletePokemon);

module.exports = router;

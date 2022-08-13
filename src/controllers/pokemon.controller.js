const { Pokemon } = require("../db/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize");
const { Op } = require("sequelize");

module.exports.getAllPokemon = (req, res) => {
  if (req.query.name) {
    const name = req.query.name;
    const limit = parseInt(req.query.limit) || 5;
    if (name.length < 2) {
      const message = "Le nom doit contenir minimum 2 caractères";
      return res.status(400).json({ message });
    }
    return Pokemon.findAndCountAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
      //par défaut ["name", 'ASC']
      order: ["name"],
      limit: limit,
    }).then(({ count, rows }) => {
      const message = `Il y a ${count} pokémon qui correspond au terme de recherche ${name}`;
      res.json({ message, data: rows });
    });
  } else {
    Pokemon.findAll({
      order: ["name"],
    })
      .then((pokemons) => {
        const message = "La liste des pokémons a bien été récupérée.";
        // status 200 par défaut grâce a express
        res.json({ message, data: pokemons });
      })
      .catch((err) => {
        const message = "La liste des pokémons n'a pas pu être récupérée.";
        res.status(500).json({ message, data: err });
      });
  }
};

module.exports.createPokemon = (req, res) => {
  Pokemon.create(req.body)
    .then((pokemon) => {
      const message = `Le pokémon ${req.body.name} a bien été crée.`;
      res.json({ message, data: pokemon });
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }

      if (error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message = "Le pokemon n'a pas pu être créer.";
      res.status(500).json({ message, data: error });
    });
};

module.exports.getPokemonById = (req, res) => {
  Pokemon.findByPk(req.params.id).then((pokemon) => {
    const message = "Un pokémon a bien été trouvé.";
    res.json({ message, data: pokemon });
  });
};

module.exports.updatePokemon = (req, res) => {
  const id = req.params.id;
  Pokemon.update(req.body, {
    where: { id: id },
  })
    .then((_) => {
      return Pokemon.findByPk(id).then((pokemon) => {
        if (pokemon === null) {
          const message = "Le pokemon modifié n'existe pas.";
          return res.status(404).json({ message, data: err });
        }

        const message = `Le pokémon ${pokemon.name} a bien été modifié.`;
        res.json({ message, data: pokemon });
      });
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }

      if (error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message = "La liste des pokémons n'a pas pu être modifié.";
      res.status(500).json({ message, data: error });
    });
};

module.exports.deletePokemon = (req, res) => {
  Pokemon.findByPk(req.params.id)
    .then((pokemon) => {
      if (pokemon === null) {
        const message = "Le pokemon modifié n'existe pas.";
        return res.status(404).json({ message, data: err });
      }
      const pokemonDeleted = pokemon;
      return Pokemon.destroy({
        where: { id: pokemon.id },
      }).then((_) => {
        const message = `Le pokémon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé.`;
        res.json({ message, data: pokemonDeleted });
      });
    })
    .catch((err) => {
      const message = "La liste des pokémons n'a pas pu être modifié.";
      res.status(500).json({ message, data: err });
    });
};

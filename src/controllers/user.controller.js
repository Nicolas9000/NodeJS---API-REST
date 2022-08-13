const { User } = require("../db/sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const privateKey = require("../auth/private_key");
const user = require("../models/user");
module.exports.login = (req, res) => {
  User.findOne({ where: { username: req.body.username } })
    .then((username) => {
      if (!username) {
        const message = "Le nom n'existe pas";
        return res.status(404).json({ message });
      }
      bcrypt
        .compare(req.body.password, username.password)
        .then((IfValidePassword) => {
          if (!IfValidePassword) {
            const message = "Mot de passe incorect";
            return res.status(400).json({ message });
          }

          const token = jwt.sign({ userId: username.id }, privateKey, {
            expiresIn: "24h",
          });

          const message = "L'utilisateur a été trouvé avec success";
          res.json({ message: message, data: username, token });
        });
    })
    .catch((err) => {
      const message = "L'utilisateur n'a pas pu être connecté";
      res.status(500).json({ message: message, data: err });
    });
};

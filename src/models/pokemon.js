const validTypes = [
  "Plante",
  "Poison",
  "Feu",
  "Eau",
  "Insecte",
  "Vol",
  "Normal",
  "Electrik",
  "Fée",
];
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Le nom est déjà pris",
        },
        validate: {
          notEmpty: {
            msg: "Le nom ne doit pas être vide",
          },
          notNull: {
            msg: "Le nom est une propriété requise",
          },
          min: {
            args: [1],
            msg: "Le nom ne doit pas être inférieur à 1 caractère",
          },
          max: {
            args: [25],
            msg: "Le nom ne doit pas dépassé 25 caractères",
          },
        },
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Utilisez uniquement des nombres entiers pour les points de vie",
          },
          notNull: { msg: "Les points de vie sont une propriété requise" },
          min: {
            args: [0],
            msg: "Les points de vie ne doivent pas être inférieur à 0",
          },
          max: {
            args: [999],
            msg: "Les points de vie de doivent pas être supérieur à 999",
          },
        },
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Utilisez uniquement des nombres entiers pour les points d'attaques",
          },
          notNull: {
            msg: "Les points d'attaques sont une propriété requise",
          },
          min: {
            args: [0],
            msg: "L'attaque ne doit pas être inférieur à 0",
          },
          max: {
            args: [99],
            msg: "L'attaque ne doit pas être supérieur 99",
          },
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: {
            msg: "Utilisez uniquement une URL valide pour l'images",
          },
          notNull: {
            msg: "L'url de l'image est requise",
          },
        },
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue("types").split(",");
        },
        set(types) {
          this.setDataValue("types", types.join());
        },
        validate: {
          isTypesValid(value) {
            if (!value) {
              throw new Error("Le pokemon doit avoir minimum 1 type");
            }

            if (value.split(",").length > 3) {
              throw new Error("Le pokemon ne doit pas voir plus de 3 types");
            }

            value.split(",").forEach((type) => {
              if (!validTypes.includes(type)) {
                throw new Error(
                  `Le type de pokemon doit appartenir à la liste suivante : ${validTypes}`
                );
              }
            });
          },
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};

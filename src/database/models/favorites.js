const { Model, DataTypes } = require("sequelize");
const sequelize = require("../index");

class Favorites extends Model { }

Favorites.init({
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "UserId field can't be empty",
      }
    },
  },
  RecipeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "RecipeId field can't be empty",
      }
    },
  }
},
  {
    modelName: "Favorites",
    sequelize,
    timestamps: false,
  }
);


module.exports = Favorites;
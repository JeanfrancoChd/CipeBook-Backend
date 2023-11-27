const { Model, DataTypes } = require("sequelize");
const sequelize = require("../index");

class Recipes extends Model { }

Recipes.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Name field can't be empty",
      },
      len: {
        args: [2, 255],
        msg: "Name length must be between 2 and 255",
      },
    },
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Description field can't be empty",
      },
      len: {
        args: [2, 255],
        msg: "Description length must be between 2 and 255",
      },
    },
  },
  difficult: {
    type: DataTypes.STRING,
    allowNull: false,
    isIn: [['Baja', 'Media', 'Alta']],
    validate: {
      notNull: {
        msg: "Difficult field can't be empty",
      },
      isAlpha: {
        args: true,
        msg: "Difficult can only contain letters",
      },
      len: {
        args: [2, 255],
        msg: "Difficult length must be between 2 and 255",
      },
    },
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "time field can't be empty",
      },
      len: {
        args: [2, 255],
        msg: "time length must be between 2 and 255",
      },
    },
  },
  ingredients: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "ingredientes field can't be empty",
      },
      len: {
        args: [2, 255],
        msg: "ingredientes length must be between 2 and 255",
      },
    },
  },
},
  {
    modelName: "Recipes",
    sequelize,
    timestamps: false,
  }
);


module.exports = Recipes;
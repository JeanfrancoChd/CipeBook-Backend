const { Model, DataTypes } = require("sequelize");
const sequelize = require("../index");

class Users extends Model {}

Users.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name field can't be empty",
        },
        isAlpha: {
          args: true,
          msg: "Name can only contain letters",
        },
        len: {
          args: [2, 255],
          msg: "Name length must be between 2 and 255",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "Please provide a valid email",
        },
        notNull: {
          msg: "Email can't be empty",
        },
        len: {
          args: [5, 255],
          msg: "Email length must be between 5 and 255",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password field can't be empty",
        },
      },
    },
    roles:{
      type: DataTypes.STRING,
    allowNull: true,
    isIn: [['Admin', 'User']],
    validate: {
      isAlpha: {
        args: true,
        msg: "Difficult can only contain letters",
      },
      len: {
        args: [2, 255],
        msg: "Difficult length must be between 2 and 255",
      },
    },      
    }
  },
  {
    modelName: "Users",
    sequelize,
    timestamps: false,
  }
);

module.exports = Users;

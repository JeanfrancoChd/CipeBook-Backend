const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const { buildToken, authByToken } = require("../auth/authenticate");
const User = require("../database/models/users");
const Users = require("../database/models/users");
const Recipes = require("../database/models/recipe");
const Favorites = require("../database/models/favorites");


router.post("/register", async (req, res) => {
  const { name, email, password, roles } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      roles
    });
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: { email: email },
    });
    if (user) {
      const validatePassword = bcrypt.compareSync(password, user.password);
      if (validatePassword) {
        res.json({
          userData: { id: user.id, name: user.name, email: user.email, roles: user.roles},
          token: buildToken(user),
        });
      } else {
        res.json({ error: "Invalid Password" });
      }
    } else {
      res.json({ error: "Invalid Email" });
    }
  } catch (error) {
    res.json(error);
  }
});


router.get("/", authByToken, async (req, res) => {
  try {
    const users = await Users.findAll({
      include: [{
        model: Recipes,
        as: "Recipes"
      },{model:Favorites,
        as:"Favorites"}]
    });
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});

router.get("/:id", authByToken, async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
      attributes: {
        exclude: ["password"],
      },
    });
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

router.delete("/:id", authByToken,async (req, res) => {
  const { id } = req.params;
  try {
    const result = await User.destroy({ where: { id } })
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    // Verificar si el usuario existe en la base de datos
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Actualizar los campos del usuario
    user.name = name;
    user.email = email;
    user.password = bcrypt.hashSync(password, 10);

    // Guardar los cambios en la base de datos
    await user.save();

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

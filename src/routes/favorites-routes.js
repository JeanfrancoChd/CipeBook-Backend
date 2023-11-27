const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const { authByToken } = require("../auth/authenticate");
const User = require("../database/models/users");
const Favorites = require("../database/models/favorites");

router.get("/:id", async (req, res) => {
    try {
        const user = await Favorites.findAll({
            where: { UserId: req.params.id }
        });
        res.json(user);
    } catch (error) {
        res.json(error);
    }
});

router.get("/", async (req, res) => {
    try {
        const user = await Favorites.findAll();
        res.json(user);
    } catch (error) {
        res.json(error);
    }
});

router.post("/", async (req, res) => {
    try {
        const user = await Favorites.create({
            UserId: req.body.UserId,
            RecipeId: req.body.RecipeId
        });
        res.json(user);
    } catch (error) {
        res.json(error);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const result = await Favorites.destroy({ where: { id: req.params.id } })
        res.json(result);
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;

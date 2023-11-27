const express = require("express");
const router = express.Router();
const multer = require('multer');
const Recipe = require("../database/models/recipe");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpg");
  },
});

const upload = multer({ storage: storage });
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { originalname, path } = req.file;
    const userId = parseInt(req.body.id);
    const newRecipe = await Recipe.create({
      name: req.body.name,
      description: req.body.description,
      difficult: req.body.difficult,
      UserId: userId,
      image: path,
      time: req.body.time,
      ingredients: req.body.ingredientes,
    });

    res.status(201).json(newRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Recipe.destroy({ where: { id } })
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.findAll();
    res.json(recipes);
  } catch (error) {
    res.json(error);

  }

});


router.get("/:id", async (req, res) => {
  try {
    const recipes = await Recipe.findOne({ where: { id: req.params.id } });
    res.json(recipes);
  } catch (error) {
    res.json(error);

  }
});

router.get("/users/:UserId", async (req, res) => {
  try {
    const recipes = await Recipe.findAll({ where: { UserId: req.params.UserId } });
    res.json(recipes);
  } catch (error) {
    res.json(error);

  }
});

router.get("users/:id", async (req, res) => {
  try {
    const recipes = await Recipe.findAll({ where: { id: req.params.id } });
    res.json(recipes);
  } catch (error) {
    res.json(error);

  }
});


router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, difficult } = req.body;
  try {
    const result = await Recipe.update({ name, description, difficult }, { where: { id } });
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});
module.exports = router;
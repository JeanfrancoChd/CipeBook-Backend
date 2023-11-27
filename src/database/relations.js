const user = require("./models/users");
const recipes = require("./models/recipe");
const Favorites = require("./models/favorites");

user.hasMany(recipes, {as: "Recipes", foreignKey: "UserId"});
recipes.belongsTo(user);

user.hasMany(Favorites, {as: "Favorites", foreignKey:"UserId"});
Favorites.belongsTo(user)

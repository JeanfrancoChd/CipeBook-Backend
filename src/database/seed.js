const sequelize = require("./index");
const bcrypt = require("bcryptjs");
const User = require('./models/users');
const Recipe = require('./models/recipe');
const Favorites = require('./models/favorites');
require('./relations');


// Users
const validatePassword = bcrypt.hashSync("1234", 10);
const users = [
    { name: "JF", email: "JFAdmin@yahoo.es", password: validatePassword, roles: "Admin" },
    { name: "Candela", email: "Candelaria32@gmail.com", password: validatePassword, roles: "User" },
    { name: "Alberto", email: "AlbertoCAbiert@hotmail.com", password: validatePassword, roles: "User" },
    { name: "Maksy", email: "MaxitodopolacoRaperito@hotmail.com", password: validatePassword, roles: "User" },
    { name: "Masi", email: "Masitodoloco@hotmail.com", password: validatePassword, roles: "User" }
];

// Recipes
const recipes = [
    { name: "Salchipapas", description: "Cortar la papa, freir la papa y salchicha", difficult: "Baja", image: "uploads\\salchipapas.jpg", UserId: 1, time: "10Min", ingredients: "1/2 papas, 1 paquete de salchichas" },
    { name: "Bocadillo de pollo", description: "Cocer el pollo, mezclar con ingredientes al gusto y emplatar", difficult: "Media", image: "uploads\\bocadillodepollo.jpg", UserId: 2, time: "10Min", ingredients: "1 Barra de pan, 1/2 Pollo" },
    { name: "Aire de limon", description: "Exprimir limon, reservar con lectina y usar sifón", difficult: "Alta", image: "uploads\\airelima.jpg", UserId: 1, time: "30Min", ingredients: "1L de limon, Lectina"  },
    { name: "Tiramisu", description: "Hacer el bizcocho, emborrachar con cafe y emplatar", difficult: "Media", image: "uploads\\tiramisu.jpg", UserId: 3, time: "30Min", ingredients: "Cafe, huevos y azúcar"  },
    { name: "Takkeboki", description: "Cocinar la pasta de arroz, meclar con la salsa añadir huevo y queso ", difficult: "Baja", image: "uploads\\tteokbokki.jpg", UserId: 2, time: "30Min", ingredients: "Pasta de arroz, col, ajo, cebolla, salsa tteok" },
    { name: "Pabellon Criollo", description: "Cocinar el arroz, las caraotas y mezclar con pollo", difficult: "Baja", image: "uploads\\pabellon_criollo.jpg", UserId: 3, time: "30Min", ingredients: "Arroz, caraotas, pollo" },
    { name: "Pizza", description: "Hacer la masa de pizza, cocinar primero por 5min, despues poner ingredientes y otros 10 min", difficult: "Media", image: "uploads\\pizza.jpg", UserId: 4, time: "30Min", ingredients: "Harina, aceite, sal, tomate, queso"  },
    { name: "Puré de papas", description: "Hervir la papa, triturarla con leche", difficult: "Baja", image: "uploads\\purepapas.jpg", UserId: 5, time: "30Min", ingredients: "Papas, leche, sal, pimineta"  },
    { name: "Pasta Carbonara", description: "Cocinar la pasta y mezclarla con huevo y queso", difficult: "Baja", image: "uploads\\pasta.jpg", UserId: 4, time: "30Min", ingredients: "Pasta al gusto, huevos, queso, Guaciale/Bacon" },
];

//Favorites
const favorites = [
    {UserId: 1, RecipeId: 2 },
    {UserId: 1, RecipeId: 3 },
    {UserId: 1, RecipeId: 1 },
    {UserId: 2, RecipeId: 4 },
    {UserId: 2, RecipeId: 6 },
    {UserId: 3, RecipeId: 9 },
    {UserId: 3, RecipeId: 7 },
    {UserId: 4, RecipeId: 1 },
    {UserId: 4, RecipeId: 9 },
    {UserId: 5, RecipeId: 8 },
];


sequelize.sync({ force: true }).then(() => {
    // Conexión establecida
    console.log("Conexión establecida...");
}).then(() => {
    // Rellenar usuarios
    users.forEach(user => User.create(user));
}).then(() => {
    // Rellenar Recetas
    recipes.forEach(recipe => Recipe.create(recipe));
}).then(() => {
    // Rellenar Favorites
    favorites.forEach(favorite => Favorites.create(favorite));
})
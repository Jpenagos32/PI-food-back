const express = require('express');
const recipesRouter = express.Router();
const {
	filterRecipeById,
	filterRecipeByName,
	postRecipe,
} = require('../handlers/index');

recipesRouter.get('/:idRecipe', filterRecipeById);

recipesRouter.get('/', filterRecipeByName);

recipesRouter.post('/', postRecipe);

module.exports = recipesRouter;

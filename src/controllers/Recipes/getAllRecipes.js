const getAllApiRecipes = require('./getAllApiRecipes');
const getAllDbRecipes = require('./getAllDbRecipes');

const getAllRecipes = async () => {
	// traigo todas las recetas de la api
	const apiRecipe = await getAllApiRecipes();
	// traigo todas las recetas de la base de datos
	const dbRecipe = await getAllDbRecipes();

	// almaceno la union de los dos resultados en una constante
	const allRecipes = [...apiRecipe, ...dbRecipe];
	return allRecipes;
};

module.exports = getAllRecipes;

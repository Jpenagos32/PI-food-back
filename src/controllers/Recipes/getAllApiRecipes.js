require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');

// console.log(API_KEY);

const getAllApiRecipes = async () => {
	try {
		// esta peticion me trae todas las recetas de la api
		const response = await axios.get(
			`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
		);

		const recipeData = response.data.results.map((item) => {
			const { title, image, summary, healthScore, diets, id } = item;
			return {
				id,
				title,
				image,
				summary,
				healthScore,
				// los paso a paso están dentro de analyzedInstructions, este es un arreglo de objetos
				steps: item.analyzedInstructions?.map((step) =>
					step.steps.map((step) => {
						return {
							number: step.number,
							step: step.step,
						};
					})
				),
				diets: diets.map((diet) => {
					return { name: diet };
				}),
			};
		});

		return recipeData;
	} catch (error) {
		return { error: error.message };
	}
};

module.exports = getAllApiRecipes;

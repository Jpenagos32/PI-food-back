const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;

const { Recipe, Diet } = require('../../db');

const getRecipeDetail = async (id) => {
	// si el id incluye - que busque en la base de datos
	if (id.includes('-')) {
		try {
			const recipeDB = await Recipe.findOne({
				where: { id: id },
				include: { model: Diet },
			});
			return recipeDB;
		} catch (error) {
			return { error: error.message };
		}
	} else {
		try {
			//  en caso contrario debe hacer la request a la api
			const response = await axios.get(
				`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&addRecipeInformation=true`
			);

			const {
				title,
				summary,
				healthScore,
				image,
				analyzedInstructions,
				diets,
			} = response.data;

			const apiRecipe = {
				id: response.data.id,
				title,
				summary,
				healthScore,
				image,
				steps: analyzedInstructions[0]?.steps.map((step) => {
					return {
						number: step.number,
						step: step.step,
					};
				}),
				diets: diets.map((diet) => {
					return { name: diet };
				}),
			};

			return apiRecipe;
		} catch (error) {
			return { error: error.message };
		}
	}
};

module.exports = getRecipeDetail;

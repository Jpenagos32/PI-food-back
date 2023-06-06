require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const { Diet } = require('../../db');

const getDietsController = async () => {
	// si existen datos en la DB que los traiga
	const existingDiets = await Diet.findAll();
	if (existingDiets.length > 0) {
		// const dietsNotDuplicated = existingDiets.map((diet) => diet.name);
		// return dietsNotDuplicated;
		const dietsArray = [];
		existingDiets.forEach((diet) =>
			dietsArray.push({ name: diet.name, id: diet.id })
		);
		return dietsArray;
	}

	// De lo contrario que haga el llamado a la api
	const apiDiets = await axios.get(
		`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
	);

	const dietsArray = apiDiets.data.results
		.map((recipe) => recipe.diets)
		.flat();

	// para quitar todos los datos duplicados usamos el Set
	const dietsNotDuplicated = [...new Set(dietsArray)];

	dietsNotDuplicated.forEach((element) => {
		Diet.findOrCreate({
			where: {
				name: element,
			},
		});
	});

	return dietsNotDuplicated;
};

module.exports = getDietsController;

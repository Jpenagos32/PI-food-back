const { postDataRecipe } = require('../controllers/Recipes');

const postRecipe = async (req, res) => {
	try {
		const { title, image, summary, healthScore, steps, diets } = req.body;
		if (!(title && image && summary && healthScore && steps && diets)) {
			res.status(400).send('Faltan datos para poder crear la receta');
		}

		const recipeObj = {
			title,
			image,
			summary,
			healthScore,
			steps,
			diets,
		};

		const newRecipe = await postDataRecipe(recipeObj);

		res.status(200).json(newRecipe);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = postRecipe;

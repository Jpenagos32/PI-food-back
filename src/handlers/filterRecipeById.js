const { getRecipeDetail } = require('../controllers/Recipes/index');

const filterRecipeById = async (req, res) => {
	try {
		// Recibir el id que viene por params
		const { idRecipe } = req.params;

		const response = await getRecipeDetail(idRecipe);

		res.status(200).json(response);
	} catch (error) {
		res.status(500).json({ err: error.message });
	}
};

module.exports = filterRecipeById;

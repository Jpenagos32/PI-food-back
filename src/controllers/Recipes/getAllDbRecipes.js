const { Recipe, Diet } = require('../../db');

const getAllDbRecipes = async () => {
	try {
		const response = await Recipe.findAll({
			attributes: [
				'id',
				'title',
				'summary',
				'healthScore',
				'steps',
				'image',
			],
			include: { model: Diet },
		});

		return response?.map((res) => {
			return {
				id: res.dataValues.id,
				title: res.dataValues.title,
				summary: res.dataValues.summary,
				healthScore: res.dataValues.healthScore,
				image: res.dataValues.image,
				steps: res.dataValues.steps,
				diets: res.dataValues.diets.map((diet) => {
					return { name: diet.name };
				}),
			};
		});
	} catch (error) {
		throw new Error(error.message);
	}
};

module.exports = getAllDbRecipes;

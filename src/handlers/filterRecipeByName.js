const { getAllRecipes } = require('../controllers/Recipes/index');

const filterRecipeByName = async (req, res) => {
	try {
		const name = req.query.name;

		const response = await getAllRecipes();

		// si no existe el nombre, debe retornar todas las recetas
		if (!name) {
			return res.status(200).json(response);
		}

		let filtradas = response.filter((resp) =>
			resp.title.toLowerCase().includes(name.toLowerCase())
		);

		filtradas.length
			? res.status(200).json(filtradas)
			: res.status(400).json({
					msg: `No existe una receta que contenga el nombre ${name}`,
			  });
	} catch (error) {
		res.status(500).json({ err: error.message });
	}
};

module.exports = filterRecipeByName;

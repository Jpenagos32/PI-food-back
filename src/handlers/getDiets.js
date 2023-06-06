const getDietsController = require('../controllers/Diet/getDietsController');

const getDiets = async (req, res) => {
	try {
		const allDiets = await getDietsController();
		// console.log(allDiets);

		res.status(200).json(allDiets);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = getDiets;

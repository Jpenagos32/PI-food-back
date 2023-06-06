const express = require('express');
const getDiets = require('../handlers/getDiets');
const dietsRouter = express.Router();

dietsRouter.get('/', getDiets);

module.exports = dietsRouter;

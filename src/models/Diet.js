const { DataTypes } = require('sequelize');

const Diet = (sequelize) => {
	sequelize.define(
		'diet',
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4, // especifica un UUID generado automaticamente
				allowNull: false,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			timestamps: false,
		}
	);
};

module.exports = Diet;

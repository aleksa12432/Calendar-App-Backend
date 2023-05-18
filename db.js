const { Sequelize, DataTypes } = require("sequelize");
const dbconfig = require("./dbconfig.json");

const sequelize = new Sequelize(
	dbconfig.db,
	dbconfig.username,
	dbconfig.password,
	{
		dialect: "mariadb",
		host: dbconfig.host,
		port: dbconfig.port,
	}
);

sequelize
	.authenticate({
		logging: false,
	})
	.then(() => {
		console.log("Successful database connection!");
	})
	.catch((err) => {
		throw err;
	});

sequelize.define(
	"User",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: "user",
	}
);

sequelize
	.sync({
		logging: false,
	})
	.then(() => {
		console.log("Successful syncing with database!");
	});

module.exports = sequelize;

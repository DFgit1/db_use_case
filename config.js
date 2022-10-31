const Sequelize = require("sequelize");
const config = new Sequelize("db-use-case", "root", "buckster12", {dialect: "mariadb"});

module.exports = config;
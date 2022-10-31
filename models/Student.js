const Sequelize = require("sequelize");
const config = require("./../config");

const Student = config.define("Student", {
id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
},
name: {
    type: Sequelize.STRING,
    allowNull: false
},
section: {
    type: Sequelize.STRING,
    allowNull: false
},
gpa: {
    type: Sequelize.INTEGER,
    allowNull: false
},

nationality: {
    type: Sequelize.STRING,
    allowNull: false
}

}, {timestamps: false});

module.exports = Student;
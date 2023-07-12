const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql');

const StudentScheme = sequelize.define('Student', {
    fname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dob: {
        type: DataTypes.DATE,
        allowNull: false
    },
    bloodgrp: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneno: {
        type: DataTypes.NUMBER,
        allowNull: false,
        unique: true
    }
}, {}
);

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

module.exports = sequelize.model('student', StudentScheme);

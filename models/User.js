// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('mysql');

// const UserScheme = sequelize.define('User', {
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     date: {
//         type: DataTypes.DATE,
//         defaultValue: Date.now
//     }
// }, {}
// );

// // `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true

// module.exports = sequelize.exports('user', UserScheme);

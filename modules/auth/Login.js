const express = require('express');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('mysql');
const User = sequelize.import('../../models/User');

const router = express.Router();

router.get('/', (req, res) => {
    const user = User(req.body);
    user.save();
})

module.exports = router;

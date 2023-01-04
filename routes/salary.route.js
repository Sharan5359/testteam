const authController = require('../controller/salary.controller');
const express = require('express');
const router = express.Router();
const authJwt  = require('../middleware/awthjwt.js')

router.post('/salary', authJwt.verifyToken, authController.create)


module.exports = router
const userController = require('../controllers/userController')
const express = require('express');
const router = express.Router();

router.post('/signin',userController.CreatreUser);
router.post('/login',userController.login);

module.exports = router
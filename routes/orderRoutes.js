const express = require('express');
const orderController = require('../controllers/orderController');
const router = express.Router();
const auth = require('../controllers/middlewares/auth');

router.post('/',auth,orderController.createOrder);

module.exports = router;    

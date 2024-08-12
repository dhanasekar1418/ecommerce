const cartController = require('../controllers/cartController')
const express = require('express');
const router = express.Router();
const auth = require("../controllers/middlewares/auth")

router.post('/',auth,cartController.createcart);
router.get('/',auth,cartController.getcart);
router.delete('/:product_id',auth,cartController.deletecart);

module.exports = router;
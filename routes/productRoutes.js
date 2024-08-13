const Productcontroller = require('../controllers/productController')
const express = require('express');
const router = express.Router();
const auth = require('../controllers/middlewares/auth');

router.get("/",auth, Productcontroller.getProducts);
router.post("/",Productcontroller.createProduct);
router.delete("/:id", Productcontroller.deleteProduct);
router.put("/:id",Productcontroller.updateProduct);
router.patch("/:id", Productcontroller.patchProduct);

module.exports = router

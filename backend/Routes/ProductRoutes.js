const express = require("express");
const router = express.Router();
const multer = require('multer')
const { createProduct,getAllProducts,getProductById,updateProductById,deleteProductById,searchProducts }=require('../Controlers/ProductController')
const upload = require("../Middleware/multer");



router.post('/createProduct',upload.single("image"),createProduct);
router.get('/getAllProducts', getAllProducts);
router.get("/getProductById/:_id", getProductById);
router.put("/updateProduct/:_id",updateProductById)
router.delete("/deleteProduct/:_id", deleteProductById);
router.post('/search', searchProducts);





module.exports =router;
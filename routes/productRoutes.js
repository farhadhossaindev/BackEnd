import express from 'express'
import { isAdmin, requireSingIn, } from '../middlewares/authMiddleware.js'
import {
    braintreePaymentController,
    braintreeTokenController,
    createProductController,
    deleteProductController,
    getProductController,
    getSingleProductController,
    productCategoryController,
    productCountController,
    productFilterController,
    productListController,
    productPhotoController,
    relatedProductController,
    searchProductController,
    updateProductController
} from '../controller/productController.js'
import formidable from 'express-formidable'

const router = express.Router()


//routes
router.post('/create-product', requireSingIn, isAdmin, formidable(), createProductController)
//product Update
router.put('/update-product/:pid', requireSingIn, isAdmin, formidable(), updateProductController)

// get Product
router.get('/get-product', getProductController)

// get single Product
router.get('/get-product/:slug', getSingleProductController)

//get product photo
router.get('/product-photo/:pid', productPhotoController)

// delete product
router.delete('/delete-product/:pid', deleteProductController)

//filter product
router.post('/product-filter', productFilterController)

//product count
router.get('/product-count', productCountController)

//product per page 
router.get('/product-list/:page', productListController)

//Serch product
router.get('/search/:keyword', searchProductController)

// simmlar product
router.get('/related-product/:pid/:cid', relatedProductController)

// category wise product 
router.get('/product-category/:slug', productCategoryController)

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSingIn, braintreePaymentController);



export default router
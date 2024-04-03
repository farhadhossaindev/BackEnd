import express from 'express'
import { isAdmin, requireSingIn } from '../middlewares/authMiddleware.js'
import {
    categoryController,
    creatCategoryController,
    deleteCategoryController,
    singleCategoryController,
    updateCategoryController
} from '../controller/categoryController.js'

const router = express.Router()

// route
//creat category
router.post('/create-category', requireSingIn, isAdmin, creatCategoryController);

//update category
router.put('/update-category/:id', requireSingIn, isAdmin, updateCategoryController);

//getAll category
router.get('/get-category', categoryController);

router.get('/single-category/:slug', singleCategoryController);

//detele category
router.delete('/delete-category/:id', requireSingIn, isAdmin, deleteCategoryController)

export default router
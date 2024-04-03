import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const creatCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(401).send({ message: 'Name is Requred' })
        }

        const existingCategory = await categoryModel.findOne({ name })
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: 'Category Already Exists'
            })
        }
        const category = await new categoryModel({ name, slug: slugify(name) }).save()
        res.status(201).send({
            success: true,
            message: 'new Category created',
            category
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error in Category'
        })
    }
};

//update category
export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        const { id } = req.params
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        res.status(200).send({
            success: true,
            message: 'category updated successfully',
            category,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error while updating category',
            error
        })
    }
}

// getAll category

export const categoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({})
        res.status(200).send({
            success: true,
            message: 'All Gategory List',
            category
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: 'Error while getting all categories'
        })
    }
};

//single Category
export const singleCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        res.status(200).send({
            success: true,
            message: 'Get Single Category Successfully',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).sand({
            success: false,
            error,
            message: 'Error while getting Single Category'
        })
    }
}

//Delete controller
export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message:'Category deleted Successfully'
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error White deleting Category',
            error
        })
    }
}
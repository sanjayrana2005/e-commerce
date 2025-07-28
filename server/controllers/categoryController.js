const categoryModel = require("../models/category-model")
const CategoryModel = require("../models/category-model")
const productModel = require("../models/product-model")
const subCategoryModel = require("../models/subCategory-model")

const AddCategoryController = async (req, res) => {
    try {
        const { name, image } = req.body
        if (!name || !image) {
            return res.status(400).json({
                message: "Enter required fields"
            })
        }
        require
        const addCategory = new CategoryModel({
            name,
            image
        })

        const saveCategory = await addCategory.save()
        if (!saveCategory) {
            return res.status(500).json({
                message: "Not created",
                error: true,
                success: true
            })
        }

        return res.json({
            message: "Added category",
            data: saveCategory,
            error: false,
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

const getCategoryController = async (req, res) => {
    try {
        const data = await CategoryModel.find().sort({createdAt  : -1})
        return res.json({
            data: data,
            error: false,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })

    }
}

const updateCategoryController = async (req, res) => {
    try {
        const { _id: categoryId, name, image } = req.body

        const update = await CategoryModel.updateOne({
            _id: categoryId
        }, {
            name,
            image
        })
        return res.json({
            message: "Updated Successfully",
            error: false,
            success: true,
            data: update
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message || error,
            error: true,
            success: false
        })
    }
}

const deleteCategoryController = async (req, res) => {
    try {
        const { _id } = req.body

        const checkSubCategory = await subCategoryModel.find({
            category: {
                "$in": [_id]
            }
        }).countDocuments()

        const checkProduct = await productModel.find({
            category: {
                "$in": [_id]
            }
        }).countDocuments()

        if (checkSubCategory > 0 || checkProduct > 0) {
            return res.status(400).json({
                message: "Category is Already in use can't delete",
                error: true,
                success: false
            })
        }

        const deleteCategory = await categoryModel.deleteOne({ _id : _id })

            return res.json({
                message: "Category deleted successfully",
                data: deleteCategory,
                error:false,
                success:true
            })
    

    } catch (error) {
    res.status(500).json({
        message: error.message || error,
        error: true,
        success: false
    })
}
}
module.exports = {
    AddCategoryController,
    getCategoryController,
    updateCategoryController,
    deleteCategoryController
}

const subCategoryModel = require("../models/subCategory-model")

const AddSubCategoryController = async (req, res) => {
    try {
        const { name, image, category } = req.body
        if (!name && !image && !category && !category.length === 0) {
            return res.status(400).json({
                message: "Provide name, image and category",
                error: true,
                success: false
            })
        }

        const payload = {
            name,
            image,
            category
        }

        const createSubCategory = new subCategoryModel(payload)
        const save = await createSubCategory.save()

        return res.json({
            message: "Sub Category created",
            data: save,
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

const getSubCategoryController = async (req, res) => {
    try {
        const data = await subCategoryModel.find().sort({ createdAt: -1 }).populate("category")
        return res.json({
            message: "Sub category data",
            data: data,
            error: false,
            success: true
        })
    } catch (error) {
        return res.json({
            message: error.message || error,
            error: true,
            success: false
        })

    }
}

const updateSubCategoryController = async (req, res) => {
    try {
        const { _id, name, image, category } = req.body

        const checkSub = await subCategoryModel.findById(_id)

        if (!checkSub) {
            return res.status(400).json({
                message: "Check your _Id",
                error: true,
                success: false
            })
        }

        const updateSubCategory = await subCategoryModel.findByIdAndUpdate(_id, {
            name,
            image,
            category
        })

        return res.json({
            message: "Updated sub category Successfully",
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

const deleteSubCategoryController = async (req,res) =>{
    try {
        const {_id} = req.body

        const deleteSubCategory = await subCategoryModel.findByIdAndDelete(_id)
        return res.json({
            message : "Deleted successfully",
            data:deleteSubCategory,
            error : false,
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error:true,
            success:false

        })
        
    }
}
module.exports = {
    AddSubCategoryController, getSubCategoryController,
    updateSubCategoryController,
    deleteSubCategoryController
}
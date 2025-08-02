const express = require("express")
const auth = require("../middleware/auth")
const {AddSubCategoryController, getSubCategoryController, updateSubCategoryController, deleteSubCategoryController} = require("../controllers/subCategoryController")


const subCategoryRouter = express.Router()

subCategoryRouter.post("/create",auth,AddSubCategoryController)
subCategoryRouter.post("/get",getSubCategoryController)
subCategoryRouter.put("/update",auth,updateSubCategoryController)
subCategoryRouter.delete("/delete",auth,deleteSubCategoryController)


module.exports = subCategoryRouter
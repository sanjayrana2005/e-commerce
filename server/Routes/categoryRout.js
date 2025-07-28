const express = require("express");
const auth = require("../middleware/auth")
const { AddCategoryController, getCategoryController,
    updateCategoryController, deleteCategoryController } = require("../controllers/categoryController")

const categoryRouter = express.Router()
categoryRouter.post("/add-category", auth, AddCategoryController)
categoryRouter.get("/get", getCategoryController)
categoryRouter.put("/update", auth, updateCategoryController)
categoryRouter.delete("/delete", auth, deleteCategoryController)

module.exports = categoryRouter
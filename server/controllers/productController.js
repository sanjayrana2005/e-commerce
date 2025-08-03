const productModel = require("../models/product-model")

const createProductController = async (req, res) => {
    try {
        const { name, image, category, subCategory, unit, stock, price, discount, description, more_details } = req.body

        if (
            !name ||
            !image?.[0] ||
            !category?.[0] ||
            !subCategory?.[0] ||
            !unit ||
            !price ||
            !description
        ) {
            return res.status(400).json({
                message: "Enter required fields",
                error: true,
                success: false
            })
        }
        const product = new productModel({
            name,
            image,
            category: category[0],
            subCategory: subCategory[0],
            unit,
            stock,
            price,
            discount,
            description,
            more_details
        })
        const saveProduct = await product.save()

        return res.json({
            message: "Product Created Successfully",
            data: saveProduct,
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

const getProductController = async (req, res) => {
    try {
        let { page, limit, search } = req.body
        if (!page) {
            page = 1
        }
        if (!limit) {
            limit = 10
        }


        const query = search ? {
            $text: {
                $search: search
            }
        } : {}
        const skip = (page - 1) * limit
        const [data, totalCount] = await Promise.all([
            productModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
            productModel.countDocuments(query)
        ])

        return res.json({
            message: "Product data",
            error: false,
            success: true,
            totalCount: totalCount,
            totalNoPage: Math.ceil(totalCount / limit),
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

const getProductByCategory = async (req, res) => {
    try {
        console.log("id search", req.body.id)
        const { id } = req.body
        if (!id) {
            return res.status(400).json({
                message: "Provide category id",
                error: true,
                success: false
            })
        }

        const product = await productModel.find({
            category: { $in: id }
        }).limit(15)

        console.log("Querying products for category ID:", id);
        console.log("Found:", product.length, "products");
        return res.json({
            message: "Category product list",
            data: product,
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

module.exports = { createProductController, getProductController, getProductByCategory }
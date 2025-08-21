const cartModel = require("../models/cartProduct-model")
const cartProductModel = require("../models/cartProduct-model")
const userModel = require("../models/user-models")

const addToCartController = async (req, res) => {
    try {
        const userId = req.userId
        const { productId } = req.body

        if (!productId) {
            return res.status(400).json({
                message: "Provide productId",
                error: true,
                success: false
            })
        }
        const cheakItemCart = await cartModel.findOne({
            userId: userId,
            productId: productId
        })

        if (cheakItemCart) {
            return res.status(400).json({
                message: "Item already in cart"
            })
        }

        const cartItem = new cartProductModel({
            quantity: 1,
            userId: userId,
            productId: productId
        })

        const save = await cartItem.save()

        const updateCartUser = await userModel.updateOne({ _id: userId }, {
            $push: {
                shopping_cart: productId
            }
        })

        return res.json({
            message: "Item added",
            error: false,
            success: true,
            data: save

        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })

    }
}

const getItemController = async (req, res) => {
    try {
        const userId = req.userId
        const cartItem = await cartModel.find({
            userId: userId,
        }).populate("productId")

        return res.json({
            data: cartItem,
            error: false,
            success: true
        })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            errro: true,
            success: false
        })
    }
}

const updateCartItemQuantityController = async (req, res) => {
    try {
        const userId = req.userId
        const { _id, quantity } = req.body

        if (!_id || !quantity) {
            return res.status(400).json({
                message: "provide _Id, quantity"
            })
        }

        const updateCartItem = await cartModel.updateOne({ _id: _id }, {
            quantity: quantity
        })

        return res.json({
            message: "Item added",
            error: false,
            success: true,
            data: updateCartItem
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

const deleteCartItemQuantityController = async (req, res) => {
    try {
        const userId = req.userId
        const { _id } = req.body
        if (!_id) {
            return res.status(400).json({
                message: "provide _id",
                error: true,
                success: false
            })
        }

        const deleteCartItem = await cartProductModel.deleteOne({ _id: _id, userId: userId })

        return res.json({
            message: "Item reomved",
            error: false,
            success: true,
            data: deleteCartItem
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = { addToCartController, getItemController, updateCartItemQuantityController, deleteCartItemQuantityController }
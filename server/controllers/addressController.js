const { json } = require("express");
const addressModel = require("../models/address-model");
const userModel = require("../models/user-models");

const addAddressController = async (req, res) => {
    try {
        const userId = req.userId //midddleware
        const { address_line, city, state, pincode, country, mobile } = req.body

        const createAddress = new addressModel({
            address_line,
            city,
            state,
            pincode,
            country,
            mobile,
            userId: userId
        })
        const saveAddress = await createAddress.save()

        const addUserAddressId = await userModel.findByIdAndUpdate(userId, {
            $push: {
                address_details: saveAddress._id
            }
        })

        return res.json({
            message: "Address created",
            error: false,
            success: true,
            data: saveAddress

        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: true
        })
    }
}

const getAddressController = async (req, res) => {
    try {
        const userId = req.userId //middleware auth

        const data = await addressModel.find({ userId: userId }).sort({ createdAt: -1 })

        return res.json({
            data: data,
            message: "List of addresses",
            error: false,
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

const updateAddressController = async (req, res) => {
    try {
        const userId = req.userId  //middleware
        const { _id, address_line, city, state, country, pinCode, mobile } = req.body

        const updateAddress = await addressModel.updateOne({ _id, userId }, {
            address_line,
            city,
            state,
            country,
            pinCode,
            mobile

        })

        return res.json({
            message: "Address updated",
            error: false,
            success: true,
            data: updateAddress
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

const deleteAddressController = async (req, res) => {
    try {
        const userId = req.userId    // auth middleware

        const { _id } = req.body

        const disableAddress = await addressModel.updateOne({ _id: _id, userId }, {
            status: false
        })

        return res.json({
            message: "Address removed",
            error: false,
            success: true,
            data: disableAddress
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
module.exports = { addAddressController, getAddressController, updateAddressController,deleteAddressController }
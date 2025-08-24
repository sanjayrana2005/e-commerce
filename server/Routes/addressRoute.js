const express = require("express")
const auth = require("../middleware/auth")
const {addAddressController, getAddressController, updateAddressController, deleteAddressController}  = require("../controllers/addressController")
const addressRouter = express.Router()

addressRouter.post("/create",auth,addAddressController)
addressRouter.get("/get",auth,getAddressController)
addressRouter.put("/update",auth,updateAddressController)
addressRouter.delete("/disable",auth,deleteAddressController)

module.exports  = addressRouter
const express = require("express") 
const auth = require("../middleware/auth")
const UploadImageController = require("../controllers/uploadImageController")
const upload = require("../middleware/multer")

const uploadRouter = express.Router()

uploadRouter.post("/upload",auth,upload.single("image"),UploadImageController)


module.exports = uploadRouter
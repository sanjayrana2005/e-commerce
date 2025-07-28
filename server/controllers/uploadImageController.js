const uploadImageCloudinary = require("../utils/uploadImageCloudinary")

const UploadImageController =async (req,res) =>{
    try {
        const file = req.file
        const uploadImage = await uploadImageCloudinary(file)
        return res.json({
            message :"Uploaded successfully",
            data : uploadImage,
            error : false,
            success : true
        })
        
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

module.exports = UploadImageController

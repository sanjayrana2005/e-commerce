 const generateOtp = (req,res)=>{
    return Math.floor(Math.random() * 900000) + 100000  // 0 to 999999
 }

 module.exports = generateOtp;
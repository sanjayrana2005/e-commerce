const verifyEmailTemplate = ({name, url}) => {
    return `
<p>Dear ${name}</p>
<p>Thank you for registering to Binkeyit</p>
<a href=${url} style="color:black;background:orange;margin-top:10px;padding:20px">
    verify email
</a>    
    `
}

module.exports = {verifyEmailTemplate};
const { Resend } = require("resend");
require("dotenv").config();

if (!process.env.RESEND_API) {
    console.log("Provide RESEND_API inside the .env file");
}

const resend = new Resend(process.env.RESEND_API);

const sendEmail = async ({ sendTo, subject, html }) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Binkeyit <onboarding@resend.dev>',
            to: sendTo,
            subject: subject,
            html: html,
        });
        if (error) {
            return ("error",{ error });
        }
        return data;
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = sendEmail;

const stripe = require("stripe")

const Stripe = stripe(process.env.STRIPE_SECERET_KEY)

module.exports = Stripe
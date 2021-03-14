// domain/.netlify/functions/serverless
require('dotenv').config

const stripe = require('stripe')(process.env.REACT_APP_STRIPE_PRI)
exports.handler = async function (event, context) {
  console.log(event)
  if (event.body) {
    const { cart, shipping_fee, total_amount } = JSON.parse(event.body)
    const calculateAmount = () => {
      return shipping_fee + total_amount
    }
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateAmount(),
        currency: 'usd',
      })
      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      }
    } catch (error) {
      return {
        statusCode: 200,
        body: JSON.stringify({ msg: error.message }),
      }
    }
  }
  return {
    statusCode: 200,
    body: 'helllo',
  }
}

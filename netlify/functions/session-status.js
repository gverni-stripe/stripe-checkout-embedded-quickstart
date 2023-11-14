const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
    appInfo: { 
      name: "stripe-checkout-embedded-quickstart",
      url: "https://github.com/gverni-stripe/https://github.com/gverni-stripe/stripe-checkout-embedded-quickstart"
    }
  });

exports.handler = async (request, context) => {
  const session = await stripe.checkout.sessions.retrieve(
    request.queryStringParameters.session_id
  );

  // res.send({
  //     status: session.status,
  //     customer_email: session.customer_details.email
  //   });

  return {
    statusCode: 200,
    body: JSON.stringify({
      status: session.status,
      customer_email: session.customer_details.email,
    }),
  };
};

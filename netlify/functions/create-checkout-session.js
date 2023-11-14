const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  appInfo: { 
    name: "stripe-checkout-embedded-quickstart",
    url: "https://github.com/gverni-stripe/https://github.com/gverni-stripe/stripe-checkout-embedded-quickstart"
  }
});

const lineItems = [
  {
    price_data: {
      unit_amount: 1599,
      currency: 'gbp',
      product_data: {
        name: 'Item 1',
      },
    },
    quantity: 1,
  }, 
  price_data: {
    unit_amount: 2199,
    currency: 'gbp',
    product_data: {
      name: 'Item 2',
    },
  },
  quantity: 1,
}, 

]

exports.handler = async () => {
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    line_items: lineItems,
    mode: "payment",
    return_url: `${process.env.URL}/return.html?session_id={CHECKOUT_SESSION_ID}`,
  });

  // res.send({ clientSecret: session.client_secret });

  return {
    statusCode: 200,
    body: JSON.stringify({ clientSecret: session.client_secret }),
  };
};

const User = require("../models/user")
const Cart = require("../models/cart")
const Product = require("../models/product")
const stripe = require("stripe") (process.env.STRIPE_SECRET);


exports.createPaymentIntent = async (req,res) => {

    //1 find user

    const user = await User.findOne({email: req.user.email}).exec();


    //2 get user cartTotal

    const {cartTotal} = await Cart.findOne({orderedBy: user._id}).exec();

    console.log("CART TOTAL AMT",cartTotal);

    // create paymentIntent with order amnt and currency

    const paymentIntent = await stripe.paymentIntents.create({
        amount: cartTotal * 100,
        currency: "usd",
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
};

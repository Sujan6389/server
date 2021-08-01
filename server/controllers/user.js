const User = require("../models/user")
const Product = require("../models/product")
const Cart = require("../models/cart");
const Order = require("../models/order");

exports.userCart = async(req,res) => {

    // console.log(req.body); //{cart:[]}
    const {cart} = req.body;

    let products = [];

    const user = await User.findOne({email: req.user.email}).exec()

    // check if cart with logged in user id already exist

    let cartExistbyThisUser = await Cart.findOne({orderedBy : user._id}).exec();

    if(cartExistbyThisUser){
        cartExistbyThisUser.remove();
        // console.log("remove old cart");

    }

    for (let i=0; i < cart.length; i++){
        let object ={}

        object.product = cart[i]._id;

        object.count = cart[i].count 

        // get price for creating total

        let productFromDb = await Product.findById(cart[i]._id)
        .select("price")
        .exec()
        
        object.price = productFromDb.price;

        products.push(object);
    }

    // console.log("products", products)

     let cartTotal = 0
     for(let i=0; i<products.length; i++){
         cartTotal = cartTotal + products[i].price * products[i].count;
     }

     console.log("cartTotal", cartTotal);

     let newCart = await new Cart({
         products,
         cartTotal,
         orderedBy: user._id,
     }).save();

    //  console.log("new cart", newCart);
     res.json({ok: true})
};



exports.getUserCart = async(req,res) =>{
    const user = await User.findOne({ email: req.user.email}).exec();

    let cart = await Cart.findOne({
        orderedBy: user._id,
    }).populate("products.product", "_id title price ")
    .exec();

    const {products, cartTotal, } = cart;
    res.json({ products, cartTotal, });
    // console.log("---->",products);
};

exports.emptyCart = async (req,res) =>{
    const user = await User.findOne({email: req.user.email}).exec();

    const cart = await Cart.findOneAndRemove({orderedBy: user._id}).exec()
    res.json(cart);
};

// exports.saveAddress = async (req,res) => {
//     console.log(req.body.address);
//     const address =req.body.address;
//     const addresss = await new Order({
//         address
//     }).save();
//     if(addresss){
//         console.log("success");
//     }else{
//         console.log("error");
//     }
//     //  const userAddress = await Order.findOneAndUpdate({address: req.body.address})
//     //  .exec();
//     //  res.json({ok:true});
   

//     // const address = req.body.address.exec()
//     // const order = await new Order ({
//     //     address,
//     // }).save()
//     // res.json(order);
   
// };

exports. createOrder = async (req,res) =>{

    const {paymentIntent} = req.body.stripeResponse;
    const address = req.body.shippingAddress;
    const phone = req.body.phone;

    console.log(address);

   
       
    const user = await User.findOne({email: req.user.email}).exec();

    let {products} = await Cart.findOne({orderedBy: user._id}).exec();

    let newOrder = await new Order({
        products,
        paymentIntent,
        orderedBy: user._id,
        address,
        phone,
         }).save();

   
    


    // decrement quantity, increment sold

    let bulkOption = products.map((item) =>{
        return {
            updateOne :{
                filter: {
                    _id: item.product._id
                }, 
                update: {
                    $inc: {quantity: -item.count, sold: +item.count}
                },
            },
        };
    });

    let updated = await Product.bulkWrite(bulkOption,{});
    console.log("PRODUCT QUANTITY AND SOLD ++",updated);


    // console.log("New Ordered Saves", newOrder);
    res.json({ ok: true});
}

exports.orders = async (req,res) =>{
    let user = await User.findOne({email: req.user.email}).exec();

    let userOrders = await Order.find({ orderedBy: user._id}).populate(
        "products.product "
    ).populate("orderedBy").exec();

    res.json(userOrders);
};



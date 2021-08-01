const express = require("express");

const router = express.Router();

//middlewares
const {authCheck} = require('../middlewares/auth');

//controllers
const {userCart, getUserCart, emptyCart , saveAddress,  createOrder , orders, read} = require("../controllers/user");

// userCart

// route

router.post("/user/cart", authCheck, userCart ); //save cart
router.get("/user/cart", authCheck, getUserCart);
router.delete("/user/cart", authCheck, emptyCart);

// router.post("/user/address", authCheck, saveAddress);


//  for order

router.post("/user/order", authCheck, createOrder);
router.get("/user/orders", authCheck, orders);
// router.get("/user/address/:slug",read);






// router.get("/user", (req,res)=>{
//     res.json({
//         data:'hey you hit user API endpoint',
//     });
//     });

    module.exports = router;



import axios from "axios"

export const userCart = async (cart, authtoken) => 
await axios.post(`${process.env.REACT_APP_API}/user/cart`, { cart },{
    headers:{
        authtoken,
    },
});

export const getUserCart = async (authtoken) =>

await axios.get(`${process.env.REACT_APP_API}/user/cart`,{
    headers:{
        authtoken,
    },
} );

export const emptyUserCart = async (authtoken) =>

await axios.delete(`${process.env.REACT_APP_API}/user/cart`, {
    headers:{
        authtoken,
    },
}
);

// export const saveUserAddress = async (authtoken, address) => 
// await axios.post(`${process.env.REACT_APP_API}/user/address`, { address },{
//     headers:{
//         authtoken,
//     },
// });

// create new order

export const createOrder = async (stripeResponse,shippingAddress,phone,authtoken) => 
await axios.post(`${process.env.REACT_APP_API}/user/order`,{stripeResponse,shippingAddress,phone},

{
    headers:{
        authtoken,
    }
});




export const getUserOrders = async (authtoken) =>

await axios.get(`${process.env.REACT_APP_API}/user/orders`,{
    headers:{
        authtoken,
    },
} );

// export const getUserAddress = async (address) => 
// await axios.get (`${process.env.REACT_APP_API}/user/address`, {address});
// console.log(getUserAddress);



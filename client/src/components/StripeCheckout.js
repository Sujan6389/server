import React, { useEffect,useState } from "react";
import { CardElement,useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";

import {createPaymentIntent} from "../function/stripe";

import { createOrder,emptyUserCart } from "../function/user";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";



const StripeCheckout = () =>{
    const dispatch = useDispatch();
    const {user} = useSelector((state) => ({...state}));

    const [succeeded, setSucceeded] = useState(false);
    const[error, setError]=useState(null);
    const[processing, setProcessing]=useState();
    const[disabled, setDisabled]=useState(true);
    const[clientSecret, setClientSecret]=useState("");
    const[address,setAddress] = useState("");
    const[phone,setPhone] = useState("");

   
    // const [values,setValues] = useState("");

    // const {address,phone,} = values;
    


    const stripe = useStripe();
    const elements = useElements ();

    useEffect(() => {
        createPaymentIntent(user.token)
        .then((res)=>{
            console.log("create payment intent", res.data);
            setClientSecret(res.data.clientSecret);
        });
    },[]);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: e.target.name.value,
            },
          },
        });

        if(payload.error){
          setError(`Payment Failed ${payload.error.message}`);
          setProcessing(false)
        }
        else{

          //create order and save in db

          createOrder(payload,address,phone,user.token)
          .then((res)=>{
           
            
            if(res.data.ok){
              // empty cart from local storage
              if(typeof window !== "undefined")
              localStorage.removeItem("cart");;

              // empty cart from redux

              dispatch(
                {
                  type:"ADD_TO_CART",
                  payload:[],
                  
                  
                }
              );
              // reset coupon to false
              dispatch({
                type:"COUPON_APPLIED",
                payload: false,
              })
              // empty user cart
              emptyUserCart(user.token);
            }
          }
          );
          ///////////////////////////////////////////
        
          // console.log(JSON.stringify(payload,null,4))
          setError(null);
          setProcessing(false);
          setSucceeded(true);
        }
        toast.success("Paymant Success");
    };

    const handleChange = async (e) =>{
       
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "" );

    };

    const cardStyle ={
        base: {
            color: "#32325d",
            fontFamily: 'Arial, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
              color: "#32325d"
            }
          },
          invalid: {
            fontFamily: 'Arial, sans-serif',
            color: "#fa755a",
            iconColor: "#fa755a"
          },
          
    }





    return (
        <div>
        
          
          <form id="payment-form" className="s-form stripe-form bg-light" onSubmit={handleSubmit}>

          <label className="form-label">Shipping Address</label>
          <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
          <br />
          <label className="form-label">Phone Number</label>
          <input type="number" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <br />
          <br />
          <br />
             <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
             
             <button className="stripe-button button" disabled={processing || disabled || succeeded || address.length<6 
         
            
             }>


               <span id="button-text">
                 {processing ? <div className="spinner" id="spinner">
                    </div>:"pay"}
               </span>
             </button>
             <br />
             {error && (
               <div className="card-error" role="alert">{error}
               </div>
               )}
          </form>

             <p className={succeeded ? "result-message" : "result-message hidden"}> Go to 
              <Link to="/user/history"> history </Link></p>
        </div>
    )
};

export default StripeCheckout;
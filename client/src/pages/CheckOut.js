import React, {useEffect, useState}from "react"

import { useSelector, useDispatch } from "react-redux";

import { getUserCart, emptyUserCart, saveUserAddress } from "../function/user";

import {toast} from "react-toastify"

import ReactQuill from "react-quill"

import 'react-quill/dist/quill.snow.css';





const CheckOut = ({history}) =>{

   const dispatch = useDispatch();
   const {user} = useSelector((state) => ({...state})) 


   const [products, setProducts]= useState([]);
   const [total, setTotal] = useState(0);
  


   useEffect(()=>{
      getUserCart(user.token)
      .then((res)=>{
       
        // console.log("user cart res");
        setProducts(res.data.products);
        setTotal(res.data.cartTotal);
       
      })
     },[]);

     const emptyCart = () =>{
       if(typeof window !=="undefined"){
         localStorage.removeItem("cart");
       }

       // remove from redux

       dispatch(
       {  type:"ADD_TO_CART", 
          payload: [], 
       }
       );

       emptyUserCart(user.token)
       .then((res)=>{
         setProducts([])
         setTotal(0)
         toast.success("cart is empty")
       });
     };

  //  const saveAddressToDb = () =>{
  //    console.log("add",address);

  //    saveUserAddress(user.token, address).then((res)=>{

  //     if(res.data.ok) {
  //       setSaveAddress(true)
  //       toast.success("Address saved")
  //     }

  //    })

  //  }




   //<ReactQuill value={address} theme="snow" onChange={setAddress} />
     //    <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
            //    Save
            //  </button>
        //     <div className="col-md-6">
        //     <h4>Delivery Address</h4>
        //     <br/>
        //       <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
         

            
        //  </div>
    return(
        <div className="container">
        

             <div className="row">
             <div className="col-md-12">
             <h4 className="text-center">Order Summary</h4>
             <hr />
            
             <div className="card p-4 bg-light">
             <h4>List of Product</h4>
             <hr />
              {products.map((p,i)=>(
                <div key={i}>

                   <p>{p.product.title} x {p.count}={p.product.price* p.count}</p>
                
                </div>
              ))}
             <h5>
               Cart Total : ${total}
             </h5>
             </div>
             </div>
             
             </div>

              <div className="row">
                <div className="col-md-6">
                  <button className="btn btn-primary"  onClick={() => history.push("/payment")} disabled={!products.length} > Place Ordered</button>
                
                </div>

                <div className="col-md-6">
                <button disabled={!products.length}className="btn btn-primary" onClick={emptyCart}> Empty Cart</button>
              
              </div>
              </div>
          
        </div>
    )
}

export default CheckOut
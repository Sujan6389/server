import React from "react";
import ModalImage from "react-modal-image";
import image from "../../images/default.jpg";
import { useSelector, useDispatch } from "react-redux";
import {toast,} from 'react-toastify';
import { CheckCircleOutlined, CloseCircleOutlined,CloseOutlined } from "@ant-design/icons";


const ProductCardCheckout = ({p}) =>{

    const {cart,user} = useSelector((state)=> ({...state}))

    const dispatch = useDispatch ();
   
    // quantity change

    const handleQuantityChange = (e) =>{

        // console.log("Available Quantity", p.quantity);

       

        let count = e.target.value < 1 ? 1 : e.target.value;

        if(count > p.quantity) {
            toast.error("Maximum Quantity : $(p.quantity)");
            return;
        }  // quantity check
          


        let cart = [];

        if(typeof window !== "undefined"){
            if(localStorage.getItem("cart")){
                 cart = JSON.parse(localStorage.getItem("cart"));
            }
            cart.map((product, i) =>{
                if(product._id == p._id) {
                    cart[i].count = count; //e.target.value
                }
            });

            localStorage.setItem("cart", JSON.stringify(cart));
            dispatch({
                type: "ADD_TO_CART",
                payload: cart,
            })
        };

       

        

    };
    const handleRemove = () =>{
        console.log(p._id, "to remove");

        let cart = [];

        if(typeof window !== "undefined"){
            if(localStorage.getItem("cart")){
                 cart = JSON.parse(localStorage.getItem("cart"));
            }
            //[1,2]
            cart.map((product, i) =>{
                if(product._id == p._id) {
                  cart.splice(i, 1)
                }
            });

            localStorage.setItem("cart", JSON.stringify(cart));
            dispatch({
                type: "ADD_TO_CART",
                payload: cart,
            })
        };

       
    };
    return(

      <tbody>
        <tr>
          <td>
             <div style={{width:"100px", height: "auto"}}>
             {
                p.images.length ? (<ModalImage  small={p.images[0].url}
                   large={p.images[0].url}/>) : ( <ModalImage small={image} large={image} /> )
            }
             </div>
          </td>
          <td>
          {p.title}
          </td>
          <td>
          ${p.price}
          </td>
          <td>
          {p.brand}
          </td>
          <td>
            {p.color}
          </td>
          <td className="text-center">
            
              <input type="number" className="form-control" value={p.count} onChange={handleQuantityChange}/>
              
          </td>
          <td  className="text-center pt-4">
             {
                 p.shipping ==="Yes" ? (<CheckCircleOutlined className="text-success"/>) :
                 (<CloseCircleOutlined className="text-danger"/>)
             }
          </td>
          <td className="text-center pt-4">
        <CloseOutlined onClick={handleRemove }
        className=" text-danger pointer"/>
          </td>
        </tr>
      </tbody>

    )
};

export default ProductCardCheckout;
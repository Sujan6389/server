import React from "react";
import {Card} from "antd"
import {EyeOutlined,ShoppingCartOutlined  } from "@ant-design/icons";
import image from "../../images/default.jpg";
import {Link} from "react-router-dom"
import _ from "lodash"

import { useSelector, useDispatch } from "react-redux";

const {Meta}=Card;

const ProductCard = ({product}) =>{

  // redux
  const {user, cart} = useSelector((state) => ({...state})); 
  const dispatch = useDispatch()



  // add roduct to loacal storage

  const handleAddToCart = () =>{

     // create cart array

     let cart = [];
      if(typeof window !== "undefined") {
        // if cart is in the loacal storage

        if (localStorage.getItem("cart")){
          cart = JSON.parse(localStorage.getItem("cart"))
        }
        // push new product to cart

        cart.push({
          ...product,

          count : 1,
          
        });
        // remove duplicate
          let unique = _.uniqWith(cart, _.isEqual )
          


        // save to local storage
        //  console.log("unique",unique)
       localStorage.setItem("cart",JSON.stringify(unique));

       //add to redux state

       dispatch({
         type:"ADD_TO_CART",
         payload: unique,
       })

      }
      
  };

    //destructure

    const {images,title,description,slug} = product;

  return(


<Card cover={
  <img src={images && images.length? images[0].url:image}
      />
  } 
  actions={[
      <Link to={`/product/${slug}`}>   <EyeOutlined className="text-success"/> <br/> View Product</Link>, 
        <a onClick={handleAddToCart} disabled={product.quantity < 1}><ShoppingCartOutlined  className="text-danger" /> <br/>
        { product.quantity<1 ? "Out of Stock" : "Add to Cart"} </a>,
      ]} >
  <Meta title={title} description={`${description && description.substring(0,40)}...`} />
  
  

</Card>


        );

}

export default ProductCard;


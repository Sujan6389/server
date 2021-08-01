import React from "react"
import {Card, Tabs} from "antd"
import {Link} from "react-router-dom"

import { HeartOutlined,ShoppingCartOutlined } from "@ant-design/icons"


import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import image from "../../images/default.jpg"
import ProductListItems from "./ProductListItems";

import _ from "lodash"

import { useSelector, useDispatch } from "react-redux";




const {TabPane}= Tabs;

const SingleProduct = ({product})=>{

   // redux
   const {user, cart} = useSelector((state) => ({...state})); 
   const dispatch = useDispatch()


     const {title, images , description} = product;

     
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
     
   return(

   <>
     <div className="col-md-7">

     { images && images.length? (<Carousel  showArrows={true} autoPlay infiniteLoop >
        {images && images.map((i) => <img src={i.url} key={i.public_id}/>)}
      </Carousel>) : (
          <Card cover={<img src={image} className="mb-3 card-image" />}/>
      )
    
    }

    <Tabs type="card" className=" mb-5 pb-5">
       <TabPane tab="Description" key="1" className="p-1 ml-4">
          {description && description}
       </TabPane>
       <TabPane tab="More" key="2" className="p-1 ml-4">
          For More Description Contact us 
       </TabPane>
    </Tabs>

      <br />
   
     </div>



     <div className="col-md-5">

       <h1 className="bg-info p-2">{title}</h1>
     
        <Card 
        actions={[
          <a onClick={handleAddToCart}><ShoppingCartOutlined  className="text-danger" /> <br/> Add to Cart </a>,
            <Link to="/"> <HeartOutlined className="text-info" /> <br />  Add to Whislist
            
            </Link>
        ]}
        >
         <ProductListItems product={product} />
        </Card>
     </div>
   </>

   );

}

export default SingleProduct;
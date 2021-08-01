import React from "react";
import {Link} from "react-router-dom";


const ProductListItems = ({product}) =>{
    const {price,category,shipping,color,brand,quantity,sold}=product;
    
   
    return(
    <div>
    <ul className="list-group">
    <li className="list-group-item">
       Price {""} <span className="label label-default label-pill pull-xs-right"> ${product.price}</span>
     </li>
   { category && ( <li className="list-group-item">
     Category {""} <span className="label label-default label-pill pull-xs-right"> {category.name}</span>
     </li>)}
     <li className="list-group-item">
     Shipping <span className="label label-default label-pill pull-xs-right"> {shipping}</span>
     </li>
     <li className="list-group-item">
     Color <span className="label label-default label-pill pull-xs-right"> {color}</span>
     </li>
     <li className="list-group-item">
     Brand <span className="label label-default label-pill pull-xs-right"> {brand}</span>
     </li>
     <li className="list-group-item">
     Quantity <span className="label label-default label-pill pull-xs-right"> {quantity}</span>
     </li>
     <li className="list-group-item">
     Sold <span className="label label-default label-pill pull-xs-right"> {sold}</span>
     </li>
   
   
 </ul>
 
    
    </div>
    );
};

export default ProductListItems;
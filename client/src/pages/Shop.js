import React, { useEffect, useState } from "react"
import {fetchProductByFilter, getProductByCount} from "../function/product"
import { useSelector, useDispatch } from "react-redux"
import ProductCard from "../components/cards/ProductCard"

const Shop = () => {
    const [products,setProducts] = useState([])

    const [loading, setLoading] = useState(false);

    //redux

    let {search} = useSelector((state) => ({...state}));
    const {text} = search;

    useEffect(()=>{
        loadAllProducts()
    },[]);

    // load product default
    const loadAllProducts = () =>{
        getProductByCount(12).then((p) => {
            setProducts(p.data);
            setLoading(false);
        });
    };

    //load products on user search input

    useEffect(()=>{
        // console.log("load products on User Search input", text);
      const delayed = setTimeout(()=>{
        fetchProducts({query: text});
         if(!text) {
           loadAllProducts();
         }
      }, 300)

      return () => clearTimeout(delayed);
     
    },[text]);

    const fetchProducts = (arg) => {
     fetchProductByFilter(arg).then((res)=>{
      setProducts(res.data);
    }); };

    return(

        <div className="container">

       
           

         
              
               {loading ? (
                   <h4 className="text-danger">Loading...</h4>
               ):(
                   <h4 className="text-dark text-center">Products</h4>
               )}

               {products.length<1 && <p> No Products Found</p>}

              
                 
                  <div className="row">
                  {products.map((p)=>(
                    <div key={p._id} className=" col-md-6 col-lg-6 p-4">
                     <ProductCard product={p}  />
                     <br />
                    </div> 
                      ))} 
                  </div>

              
           
         

        </div>
    );

};

export default Shop
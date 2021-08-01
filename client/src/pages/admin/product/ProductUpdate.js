import React, {useState, useEffect} from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {useSelector} from 'react-redux';
import {getProduct,updateProduct} from "../../../function/product";
import {toast,} from 'react-toastify';
import {getCategories,} from "../../../function/category";
import FileUpload from "../../../components/forms/FileUpload";
import {LoadingOutlined} from "@ant-design/icons"

import ProductUpdateForm from "../../../components/forms/ProductUpdateForm"


const initialState={
    
  title:'',
  description:'',
  price:'',
  category:'',
  shipping:'',
  quantity:'',
  images:[],
  colors:["Black","Brown","Silver","White","Blue"],
  brands:["Apple","Samsung","Asus","Redmi"],
  color:'',
  brand:"",


};



const ProductUpdate = ({match,history})=>{

  //state

  const[values,setValues] = useState(initialState);

  const[categories,setCategories] = useState([]);

  const[loading,setLoading] = useState(false);
  

  
    
     const{slug}=match.params;
      const{user} =useSelector((state) => ({...state}));

    useEffect(()=>{
      loadProduct();
      loadCategories();
    },[])

    const loadProduct = ()=>{

      getProduct(slug)
      .then((p)=>{
        // console.log("single product",p);
        setValues({...values, ...p.data})
      });
    };

    const loadCategories=()=>{

      getCategories().then((c)=>{
        
       setCategories(c.data);

    });
  };

  const handleSubmit = (e)=>{
    e.preventDefault();
    setLoading(true);

    updateProduct(slug,values, user.token ).then((res)=>{
      setLoading(false);
      toast.success(`"${res.data.title}" is updated`);
      history.push("/admin/products");
    })
    .catch((err)=>{
      console.log(err);
      setLoading(false);
      toast.error(err.response.data.err)
    })
    
  };

  const handleChange =(e)=>{
    setValues({...values, [e.target.name]:e.target.value})
  };
   

  
    return(
        <div className="container-fluid">
         <div className="row">
          <div className="col-md-2">
             <AdminNav />
          </div>
          <div className="col-md-10">
          {loading? <LoadingOutlined className="text-danger h1"/>:<h4>Product Create</h4>}
          
          <div className="p-3">
          <FileUpload 
          values={values}
          setValues={setValues}
          setLoading={setLoading}
          />
        </div>

     
            <hr/>

            <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            categories={categories}
            
            
            />
                          
          </div>
         </div>
        </div>
    );

};

export default ProductUpdate;
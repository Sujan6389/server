import React, {useState, useEffect} from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {useSelector} from 'react-redux';
import {createProduct,} from "../../../function/product";
import {toast,} from 'react-toastify';
import {getCategories,} from "../../../function/category";
import FileUpload from "../../../components/forms/FileUpload";
import {LoadingOutlined} from "@ant-design/icons"

import ProductCreateForm from "../../../components/forms/ProductCreateForm"

const initialState={
    
        title:'',
        description:'',
        price:'',
        categories:[],
        category:'',
        shipping:'',
        quantity:'',
        images:[],
        colors:["Black","Brown","Silver","White","Blue"],
        brands:["Apple","Samsung","Asus","Redmi"],
        color:'',
        brand:"",


};


const ProductCreate= ()=>{

    

    const[values,setValues] = useState(initialState);
    const [loading, setLoading] = useState(false);

    //redux

    const{user} =useSelector((state) => ({...state}));

    //create product with category

    useEffect(() =>{
        loadCategories();
    },[]);

    const loadCategories = () =>
      getCategories().then((c)=>setValues({...values, categories: c.data}));

   

    const handleSubmit = (e) =>{
        e.preventDefault();
       createProduct(values, user.token) 
        .then((res)=>{
           
            console.log(res);
            window.alert(`"${res.data.title} is created"`)
            window.location.reload();
        })

        .catch((err)=>{
            console.log(err)
           
            toast.error(err.response.data.err);
        })
    };

    const handleChange = (e) =>{
       setValues({...values, [e.target.name]: e.target.value})
       console.log(e.target.name,"------",e.target.value);
    }


    return(
        <div className="container-fluid">
         <div className="row">
          <div className="col-md-2">
             <AdminNav />
          </div>
          <div className="col-md-10">
           {loading? <LoadingOutlined className="text-danger h1"/>:<h4>Product Create</h4>}
            <hr/>

            {JSON.stringify(values.images)}

        <div className="p-3">
          <FileUpload 
          values={values}
          setValues={setValues}
          setLoading={setLoading}
          />
        </div>


        <ProductCreateForm
        
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        values={values}
        setValues={setValues}
              
        />

            
          </div>
         </div>
        </div>
    )

}

export default ProductCreate
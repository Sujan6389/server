import React, { useEffect,useState } from "react";
import {Switch,Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import History from "./pages/user/History";
import Wishlist from "./pages/user/Wishlist";
import AdminDashboard from "./pages/admin/AdminDashboard";

import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";

import AllProducts from "./pages/admin/product/AllProducts";
import ProductCreate from "./pages/admin/product/ProductCreate";
import ProductUpdate from "./pages/admin/product/ProductUpdate";





import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";



import Register from './pages/auth/Register';
import Home from './pages/Home';
import Product from "./pages/Product";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";
import Payment from "./pages/Payment";



import Header from './components/nav/Header';
import RegisterComplete from './pages/auth/RegisterComplete';
import Login from './pages/auth/Login';

import {auth} from "./firebase";
import {useDispatch} from "react-redux";

import {currentUser} from "./function/auth";



const App =() => {
  const dispatch = useDispatch();

  //to check firebase auth state
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(async (user)=>{
      if (user){
        const idTokenResult = await user.getIdTokenResult();
        console.log("user",user);
        currentUser(idTokenResult.token)
        .then((res)=>   {dispatch({
            type: "LOGGED_IN_USER",
            payload:{
                name:res.data.name,
                email:res.data.email,
                token: idTokenResult.token,
                role:res.data.role,
                _id:res.data._id,
                },
        });
      })
        .catch(err => console.log(err));
        }
        });
        //cleanup
        return () => unsubscribe();

       },[dispatch]);

    return(
    <>
      <ToastContainer/>
      <Header />
      <Switch>
       <Route path="/" component={Home} exact/>
       <Route path="/product/:slug" component={Product} exact/>
       <Route path="/shop" component={Shop} exact/>
       <Route path="/cart" component={Cart} exact/>
       <Route path="/checkout" component={CheckOut} exact/>


       <Route path="/register" component={Register} exact/>
       <Route path="/register/complete" component={RegisterComplete} exact/>
       <Route path="/login" component={Login} exact/>

       <UserRoute path="/user/history" component={History} exact/>
       <UserRoute path="/user/wishlist" component={Wishlist} exact/>
       <UserRoute path="/payment" component={Payment} exact/>

       <AdminRoute path="/admin/dashboard" component={AdminDashboard} exact/>
       <AdminRoute path="/admin/category" component={CategoryCreate} exact/>
       <AdminRoute path="/admin/category/:slug" component={CategoryUpdate} exact/>
       <AdminRoute path="/admin/product/" component={ProductCreate} exact/>
       <AdminRoute path="/admin/products/" component={AllProducts} exact/>
       <AdminRoute path="/admin/product/:slug" component={ProductUpdate} exact/>
 
      
      </Switch>

   </>
    );
};

export default App;

import React, {useEffect,useState} from "react";
import {Route,} from "react-router-dom";
import {useSelector} from "react-redux";
import Redirect from "./Redirect";
import {currentAdmin} from "../../function/auth";


const AdminRoute = ({ children,...rest}) =>{
    const {user} = useSelector((state) => ({...state}));

    const [ok, setOK]= useState(false);

    if(user && user.token){
        currentAdmin(user.token)
        .then(res=>{
            console.log('CURRENT ADMIN RES', res)
            setOK(true)
        })
        .catch(err =>{
            console.log('ADMIN ROUTE ERR',err);
        });
    }

    return ok?  (
        <Route {...rest} />
    ) :  (
       <Redirect></Redirect>
    )
};

export default AdminRoute;
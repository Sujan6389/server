 import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
 import AdminNav from "../../components/nav/AdminNav"
 import { getOrders, changeStatus } from "../../function/admin";
 import {toast} from "react-toastify"
 import Orders from "../../components/order/Orders"


 const AdminDashboard = () =>{

  const [orders, setOrders] = useState([]);
  const {user} = useSelector((state) => ({...state}));

  

  useEffect(()=>{
   loadOrders()
  },[])

  const loadOrders = () => 
    getOrders(user.token).then((res)=>{
    // console.log(JSON.stringify(res.data,null,4));
    setOrders(res.data);
  });

  const handleStatusChange = ( orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then ((res) =>{
      toast.success("status updated")
      loadOrders();
      // console.log(JSON.stringify(res.data,null,4));
    })
  }
  
        return(
            <div className="container-fluid">
            <div className="row">
            <div className="col-md-2">
                <AdminNav/>
            </div>
        
           <div className="col-md-10">

           <div>
            <h4 className="text-center">Admin Dashboard</h4> <br /> <hr />
           
            <Orders orders={orders}   handleStatusChange={handleStatusChange}/>
           </div>
            
     
          </div>
        </div>
       </div>
     )

 }

 export default AdminDashboard;
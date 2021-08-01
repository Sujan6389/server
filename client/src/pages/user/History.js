import React, { useEffect, useState } from "react";
import UserNav from "../../components/nav/UserNav";
import {getUserOrders} from "../../function/user";
import { useSelector , useDispatch } from "react-redux";
import {CheckCircleOutlined,CloseCircleOutlined} from "@ant-design/icons"

import ShowPaymentInformation from "../../components/cards/ShowPaymentInformation"

const History = () =>{

  const [orders, setOrders] = useState([]);
  const {user} = useSelector((state) => ({...state}));

  
  
  useEffect(() =>{
    loadUserOrder()
   
  },[])

  
    
  // const loadUserAddress = () => getUserAddress(user.address).then((res)=>{
  //     console.log(JSON)
  // }) 


  const loadUserOrder = () => getUserOrders(user.token).then((res)=>{
    // console.log(JSON.stringify(res.data,null,4));
    // console.log("test",order.address);
    
    setOrders(res.data);
  });

  const showOrderInTable = (order) => (
    
  <table className="table table-bordered">
    <thead className="thead-light">
  
      <th scope="col">
        Title 
      </th>
      <th scope="col">
       Price
      </th>
      <th scope="col">
       Brand
     </th>
      <th scope="col">
       Color
      </th>
      <th scope="col">
       Quantity
      </th>
      <th scope="col">
       Shipping
      </th>
     
      
    </thead>

    <tbody>
      {order.products.map((p,i) =>(
        <tr key={i}>
          <td>
            <b>{p.product.title}</b>
          </td>
          <td>{p.product.price}</td>
          <td>{p.product.brand}</td>
          <td>{p.product.color}</td>
          <td>{p.count}</td>
          <td>{p.product.shiping ==="Yes" ?( <CheckCircleOutlined style={{color:"green"}} />)
           : (<CloseCircleOutlined style={{color:"red"}} />)}</td>
        </tr>
      ))}
    </tbody>
  
  </table>
  )

  const showEachOrders = () =>
     orders.map((order, i) => (
    <div key={i} className="m-5 p-4 card">
      <ShowPaymentInformation order={order} />
      {showOrderInTable(order)}

      
    </div>
     )) 

  return(
    
    <div className="container-fluid">
    <div className="row">
    <div className="col-md-4 col-lg-2  mt-5 pt-5 ">
        <UserNav/>
    </div>
    <div className="col-md-8 col-lg-10  text-center  ">
     <h4 >
      {orders.length > 0 ? "user purchase orders" : "No purchase orders"}
     </h4>

     {showEachOrders()}

    </div>
    </div>
    </div>
  );
}

export default History;
import React from "react"
import {CheckCircleOutlined,CloseCircleOutlined} from "@ant-design/icons"
import ShowPaymentInformation  from "../cards/ShowPaymentInformation"

const Orders = ({orders, handleStatusChange}) => {

 

  const showOrderInTable = (order) => (

    <table className="table table-bordered bg-light">
      <thead className="thead ">
  
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


  return(

     <div>
       {orders.map((order) => (
           <div key={orders._id}  >

             <div className="row"> 

              <div className="col-md-10">
                 <table className="table table-bordered bg-light">
                   <thead>
                    <tr className="p-4">

                      <th>Shipping Address</th>

                      <th>Phone</th>
                       
                    </tr>
                   </thead>
                   <tbody>
                     <tr>
                      
                       <td>{order.address}</td>
                       <td>{order.phone}</td>
                     </tr>
                   </tbody>
                 </table>
              </div>
             
             </div>
             
             
             <div className="row" >
             <div className="col-md-10">
             <ShowPaymentInformation order={order} showStatus={false} />
             </div>
              
            
              <div className="col-md-2">
                <div>
               <h4>Delivery status</h4> </div>

               
                 <div>
                 <select onChange={e => handleStatusChange(order._id, e.target.value)} className="form-control bg-light"
                   defaultValue={order.orderStatus} name="status">
                  
                   <option value="Not Processed">

                     Not Processed
                   
                   </option>

                   <option value="Processing">

                   Processing
                 
                    </option>

                   <option value="Dispatched">

                   Dispatched
               
                    </option>

                    <option value="Cancelled">

                    Cancelled
                  
                  </option>

                  <option value="Completed">

                   Completed
                
                   </option>
                 
                 </select>
               
               </div>
               </div>

               
              
         </div>

         <div className="row">
           
          <div className="col-md-10">
          <h4>Cart Information</h4>
          {showOrderInTable (order)}

          </div>
         </div> <br /> <hr/>
          

          </div>
        
       ))}  
      
     </div> 
        )

       }
     


export default Orders
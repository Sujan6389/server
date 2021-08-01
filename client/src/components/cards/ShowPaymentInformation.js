
import React from "react"



const ShowPaymentInformation = ({order, showStatus = true}) => {

 

 

    return (

        <div>
       
         <div>
         <h4> Payment Information</h4>
        
         <table className="table table-bordered bg-light">

         <thead>
           <tr>
           
           <th scope="col">Amount</th>
           <th scope="col">Currency</th>
           <th scope="col">Payment Method</th>
           <th scope="col">Payment</th>
           <th scope="col">Order Date</th>
          <th>Order Status</th>
          
           </tr>
         </thead>
          
            <tbody>
         
            <tr>
        
           <td>{(order.paymentIntent.amount /= 100).toLocaleString("en-US", {
             style: "currency" ,
             currency : "USD",
            })}
            </td>
           <td>
           {order.paymentIntent.currency.toUpperCase()}
           </td>
           <td>
           {order.paymentIntent.payment_method_types[0]}
           </td>
           <td>
           {order.paymentIntent.status.toUpperCase()}
           </td>
         
           <td>
           {new Date(order.paymentIntent.created * 1000).toLocaleString()}
           </td>
       
            <td>
           {order.orderStatus}
      
          
           </td>
        
           </tr>
         </tbody>
        </table> 
        </div>
      
     
        
        </div>
    );

}

export default ShowPaymentInformation
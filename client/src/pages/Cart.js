import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import ProductCardCheckout from "../components/cards/ProductCardCheckout"
import { userCart } from "../function/user"



const Cart = ({history}) =>{

    const {cart,user} = useSelector((state)=> ({...state}))

    const dispatch = useDispatch ();

      const getTotal = () =>{
          return cart.reduce((currentValue, nextValue) => {
           return  currentValue + nextValue.count * nextValue.price
          },0)
      }

      const saveOrderToDb = () =>{

        // alert("save order to db")
         // console.log("cart",cart)
      
       

        userCart(cart, user.token)
        .then((res)=> {
          console.log("CART POST RES",  res)
          if(res.data.ok){
          history.push("/CheckOut")
          }
        })
        .catch((err) => {
          console.log("cart save err", err);
        });
      };

      const showCart = () =>(
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
               <th scope="col"> Image
               </th>
               <th scope="col"> Title
               </th>
               <th scope="col"> Price
               </th>
               <th scope="col"> Brand
               </th>
               <th scope="col"> Color
               </th>
               <th scope="col"> Count
               </th>
               <th scope="col"> Shipping
               </th>
               <th scope="col"> Remove
               </th>
              </tr>
            </thead>

            {cart.map((p) => 
              
              <ProductCardCheckout key={p._id} p={p} />
              
              )}
          </table>
      )

    return (

        <div className="container">
        

          <div className="row">
            <div className="col-md-8 col-lg-8">
              <h4>Cart</h4>
             {!cart.length ? (<h4> No Product in cart. <Link to="/shop">Continue Shopping </Link></h4>):
             
            
            (
                showCart()
            )
          
            }
            </div>

            <div className="col-md-4 col-lg-4">
               Order Summary
               <hr/>
               {cart.map((c,i) => (
                   <div key={i}>
                       <p>{c.title}  X  {c.count}=${c.price * c.count}</p>
                   </div>
               ))}
               <hr />
                 Total : <b>${getTotal()}</b>
               <hr />

               {
                   user ? (
                       <button className="btn btn-sm btn-primary mt-2" 
                         onClick={saveOrderToDb}
                         disabled={!cart.length}>
                          Proceed to CheckOut
                       </button>
                   ):(
                      <button className="btn btn-sm btn-primary mt-2">
                        <Link to={{
                            pathname: "/login",
                           
                        }}>  Login to CheckOut
                        </Link>
                      </button>
                   )
               }
            </div>
          
          </div>
        </div>
    )

}

export default Cart
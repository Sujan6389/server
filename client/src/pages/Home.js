import React, {useEffect,useState}from 'react';
import Jumbotron from '../components/cards/Jumbotron';
import NewArrivals from '../components/home/NewArrivals';
import BestSellers from '../components/home/BestSellers';


const Home=()=>{

 
    return(

      <>
      <div className=" h1 font-weight-bold text-center ">

       <Jumbotron text={["Latest Product", "New Arrivals", "Best Sellers"]} />
       
      </div>
      <br/>

      <h4 className="text-center p-2 m-5 display-4">

      New Arrivals
      
      </h4>
      
     <NewArrivals />

     <br/>

     <h4 className="text-center p-2 m-5 display-4">

     Best Sellers
     
     </h4>
     

     <BestSellers />
    
      
      </>

        
    );
}
export default Home;
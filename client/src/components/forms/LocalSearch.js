import React from "react";

const LocalSearch = ({keyword}, setKeyword) => {

    const hanldeSearchChange =(e) =>{

        e.preventDefault()
        setKeyword(e.target.value.toLowerCase())
    };

   return(
    
     
    <input type="search" placeholder="filter" value={keyword}
     
    onChange={hanldeSearchChange}

    className="form-control mb-4"
    
    />

  );
};




export default LocalSearch
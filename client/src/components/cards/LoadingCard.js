import React from "react"
import { Skeleton,Card } from "antd"

const LoadingCard =({count})=>{

    const cards = () =>{
        let totalCards = [];

        for (let i=0; i<count; i++) {
            totalCards.push(

                <Card className="col-md-4 col-lg-3" key={i}>
                 <Skeleton active>
                 
                 </Skeleton>
                </Card>
            )
        }

        return totalCards;

    };
    return <div className="row">{cards(4)}</div>

    

    
};

export default LoadingCard
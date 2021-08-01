import React from "react";
import {Card} from "antd";
import image from "../../images/default.jpg";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons"
import './card.css';
import {Link} from "react-router-dom"



const {Meta} =Card;


const AdminProductCard = ({product, handleRemove}) =>{

    // destructure

    const {title, description, images,slug} = product;

    return(
      <Card  hoverable cover={
          <img src={images && images.length? images[0].url:image}
          className="p-2"/>
      } 
      
      actions={[
      <Link to={`/admin/product/${slug}`}>   <EditOutlined className="text-success"/></Link>, 
        <DeleteOutlined onClick={()=>handleRemove(slug)} className="text-danger"/>
      ]}
      
      >

      <Meta title={title} description={`${description && description.substring(0,40)}...`}>
      
      </Meta>
      
      </Card>
    );
};

export default AdminProductCard;
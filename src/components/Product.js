import React from "react";
import "./Product.css";
import Update from './Update';
import Delete from './Delete';

function Product(props) {
    const ProductData = Object.keys(props.pdata)
                              .filter(function(item) {
                                   return (item !== 'id' && item !== 'barcodeid' && item !== 'barcodetype');
                              })
                              .map(key => 
                                  <td key={key} name={key}>{props.pdata[key]}</td>
                              );

    return (
        <tr className="product">
            {ProductData}
            <td><Update pdata={props.pdata} barcodetypes={props.barcodetypes} action={props.action} /></td>
            <td><Delete pdata={props.pdata} action={props.action} /></td>
        </tr>
    );
}

export default Product;
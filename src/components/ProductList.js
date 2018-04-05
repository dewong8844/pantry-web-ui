import React from "react";
import Product from "./Product";
import Add from './Add';

function ProductList(props) {
    const ListHeader = ((props.products.length > 0)? Object.keys(props.products[0])
                                 .filter(function(item) {
                                      return (item !== 'id' && item !== 'barcodeid' && item !== 'barcodetype');
                                    })
                                .map(key => 
                                   <th key={key} name={key}>{key}</th>
                                 ) : <th>Click  <span className="fa fa-cart-plus" style={{fontSize:'12px', color:'white'}}></span> to add product >>></th>);

  return (
    <table><tbody>
      <tr>{ListHeader}<th colSpan='2' width='1%' style={{backgroundColor: 'white'}}><Add barcodetypes={props.barcodetypes} action={props.action} /></th></tr>
      {props.products.map(p => <Product key={p.barcode} pdata={p} barcodetypes={props.barcodetypes} action={props.action} />)}
     </tbody></table>  
  ); 
} 

export default ProductList;
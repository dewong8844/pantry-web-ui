import React, { Component } from "react";
import store from'./store.png';
import pantry from'./pantry.png';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import "./App.css";
import ProductList from "./components/ProductList";
import axios from "axios";

class App extends Component {
    constructor() {
        super();
        this.state = {
            products: [],
            barcodetypes: [
                { value: 'UPC_A', label: 'UPC_A'},
                { value: 'UPC_E', label: 'UPC_E'},
                { value: 'ENA_13', label: 'ENA_13'},
                { value: 'ENA_8', label: 'ENA_8'},
                { value: 'RSS_14', label: 'RSS_14'},
                { value: 'CODE_39', label: 'CODE_39'},
                { value: 'CODE_93', label: 'CODE_93'},
                { value: 'CODE_128', label: 'CODE_128'},
                { value: 'ITF', label: 'ITF'},
                { value: 'CODABAR', label: 'CODABAR'},
                { value: 'DATA_MATRIX', label: 'DATA_MATRIX'},
                { value: 'PDF_417', label: 'PDF_417'}
            ]
        };
        this.getData = this.getData.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.history.location) {
            this.getData();
        }
    } 

    componentDidMount() {
        this.getData();
    }

    getData() {
        axios.get("/product")
             .then(response => {
                const newProducts = JSON.parse(response.data);
                this.setState({products: newProducts});
             })
             .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="App">  
                <header className="App-header">
                    <ul>
                        <li><div style={{ display: 'inline-block', width: '10%', textAlign: 'center'}}>
                                <img src={store} width="50px" height="50px" style={{ verticalAlign: 'center', backgroundColor: '#71d2f8'}} /></div></li>
                        <li><div style={{ display: 'inline-block', width: '80%', textAlign: 'center', verticalAlign: 'top', fontFamily: "cursive"}}>My Pantry</div></li>
                        <li><div style={{ display: 'inline-block', width: '10%', textAlign: 'center'}}>
                                <span className="fa fa-shopping-cart cart-moving" style={{align:'right', fontSize:'24px', color:'#3B2414'}}></span>
                                <img src={pantry} width="56px" height="46px" style={{marginLeft:'-20px', verticalAlign: 'center', backgroundColor: '#71d2f8', zIndex:'-1'}} /></div></li>
                    </ul>
                </header>
                <ProductList products={this.state.products} barcodetypes={this.state.barcodetypes} action={this.getData}/>
            </div>
        );
    }
}

export default App;

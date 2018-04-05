import React from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class Add extends React.Component {
    constructor() {
        super();
        this.state = {
            brand: '',
            name: '',
            amount: '',
            unit: '',
            category: '',
            ingredient: '',
            barcode: '',
            barcodetype: '',
            messageFromServer: '',
            modalIsOpen: false,
        }

        this.onClick = this.onClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.insertNewProduct = this.insertNewProduct.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillMount() {
        Modal.setAppElement('body');
        this.setState({ barcodetypes : this.props.barcodetypes });
    }

    openModal() {
        this.setState({
            modalIsOpen: true
        });
    }

    closeModal() {
        this.setState({
            brand: '',
            name: '',
            amount: '',
            unit: '',
            category: '',
            ingredient: '',
            barcode: '',
            barcodetype: '',
            modalIsOpen: false
        }); 
    }

    onClick(e) {
        this.insertNewProduct(this);
    }

    insertNewProduct(e) {
        axios.post('/product', 
             {
                'brand' : e.state.brand,
                'name' : e.state.name,
                'amount' : e.state.amount,
                'unit' : e.state.unit,
                'category' : e.state.category,
                'ingredient' : e.state.ingredient,
                'barcodetype' : e.state.barcodetype,
                'barcode' : e.state.barcode                           
             })
             .then(function(response) {
                e.closeModal();
                e.props.action(); 
             })
             .catch(error => console.log(error));
    }

    handleTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                <Button bsStyle="danger" bsSize="large" onClick={this.openModal} style={{backgroundColor: '#3A8FDA', width: '100%', borderStyle: 'none'}}>
                    <span className="fa fa-cart-plus" style={{fontSize:'24px', color:'white'}}></span></Button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="Add Product"
                    className="Modal">
                        <Link to={{pathname: '/'}} style={{ textDecoration: 'none' }}>
                            <Button bsStyle="danger" bsSize="small" onClick={this.closeModal} style={{backgroundColor: '#3A8FDA', borderStyle: 'none'}}>
                                <span className="fa fa-times-thin" style={{fontSize:'18px', color:'white'}}></span></Button>
                        </Link><br/>
                        <fieldset>
                            <label htmlFor="brand">Brand:</label><input type="text" id="brand" name="brand" value={this.state.brand} onChange={this.handleTextChange}></input><br/>
                            <label htmlFor="name">Name:</label><input type="text" id="name" name="name" value={this.state.name} onChange={this.handleTextChange}></input><br/>
                            <label htmlFor="amount">Amount:</label><input type="number" id="amount" name="amount" value={this.state.amount} onChange={this.handleTextChange}></input><br/>
                            <label htmlFor="unit">Unit:</label><input type="text" id="unit" name="unit" value={this.state.unit} onChange={this.handleTextChange}></input><br/>
                            <label htmlFor="category">Category:</label><input type="text" id="category" name="category" value={this.state.category} onChange={this.handleTextChange}></input><br/>
                            <label htmlFor="ingredient">Ingredient:</label><input type="text" id="ingredient" name="ingredient" value={this.state.ingredient} onChange={this.handleTextChange}></input><br/>
                            <label htmlFor="barcode">Bar Code:</label><input type="text" id="barcode" name="barcode" value={this.state.barcode} onChange={this.handleTextChange}></input><br/>
                            <label htmlFor="barcodetype" style={{verticalAlign: 'top'}}>Bar Code Type:</label>
                                <div style={{ display: 'inline-block', width: '120px', fontSize: '10px' }}>
                                    <Select
                                        name="barcodetype"
                                        value={this.state.barcodetype}
                                        options={this.state.barcodetypes}
                                        onChange={e => this.setState({barcodetype: (e? e.value : '')})} />
                                </div>
                        </fieldset>
                        <div className='button-center'>
                            <br/>
                            <Button bsStyle="danger" bsSize="large" onClick={this.onClick} style={{height: '30px', fontWeight: 'bold', backgroundColor: '#3A8FDA', color: 'white', borderStyle: 'none'}}>Add New Product</Button>
                        </div>
                </Modal>
            </div>
        )
    }
}

export default Add;
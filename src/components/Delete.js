import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Delete extends React.Component {
    constructor() {
        super();
        this.state = {id:''};
        this.onClick = this.onClick.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        this.setState({
            id: this.props.pdata.id
        })
    }

    onClick(e) {
        this.delete(this);
    }

    delete(e) {
        axios.delete('/product/'+e.state.id)
        .then(function(response) {
            e.props.action();
        });
    }

    render() {
        return (
            <Button bsStyle="danger" bsSize="small" onClick={this.onClick} style={{backgroundColor: '#3A8FDA', borderStyle: 'none'}}>
                <Link to={{pathname: '/'}} style={{ textDecoration: 'none' }}>
                    <span className="fa fa-remove" style={{color:'white', verticalAlign: 'middle'}}></span>
                </Link>
            </Button>
        )
    }
}

export default Delete;
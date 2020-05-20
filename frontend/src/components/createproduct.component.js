import React, { Component } from 'react';
import axios from 'axios';

export default class CreateExercise extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeprice = this.onChangeprice.bind(this);
        this.onChangequantity = this.onChangequantity.bind(this);
        this.onSubmit1 = this.onSubmit1.bind(this);
        this.onSubmit2 = this.onSubmit2.bind(this);

        this.state = {
            username: '',
            description: '',
            quantity: 0,
            price: 0,
            users: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/userdata')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        username: response.data[0].username
                    })
                    console.log(this.state.username)
                }
                {
                    console.log(this.state.username.class)
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    onSubmit1(e) {
        e.preventDefault();
        const temp = this.state.username;
        // axios.get('http://localhost:4000/productsv/findvendor/'+temp)
        //      .then(response => {
        //          this.setState({products: response.data});
        //      })
        //      .catch(function(error) {
        //          console.log(error);
        //      })
        // console.log('submit')
    }

    // onChangeUsername(e) {
    //     this.setState({
    //         username: e.target.value
    //     })
    // }
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
        console.log('fine')
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onChangeprice(e) {
        this.setState({
            price: e.target.value
        })
    }

    onChangequantity(e) {
        this.setState({
            quantity: e.target.value
        })
    }

    onSubmit2(e) {
        e.preventDefault();
        const product = {
            product_name: this.state.description,
            vendor: this.state.username,
            price: this.state.price,
            quantity: this.state.quantity,
            quantity_sold: 0,
            state: "Listed"
        }

        console.log("submit2");

        axios.post('http://localhost:4000/productsv/add', product)
            .then(res => {console.log(res.data)
            window.location='/'
            })
            .catch(err => console.log("Error:" + err));

        // window.location = '/';
    }

    render() {
        return (
            <div>
                
                <h3>Create New Product</h3>
                <form onSubmit={this.onSubmit2}>

                    <div className="form-group">
                        <label>Product name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Price: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.price}
                            onChange={this.onChangeprice}
                        />
                    </div>
                    <div className="form-group">
                        <label>Quantity: </label>
                        <div>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.quantity}
                                onChange={this.onChangequantity}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Product" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
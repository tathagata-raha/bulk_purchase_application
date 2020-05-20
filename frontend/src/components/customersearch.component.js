import React, { Component } from 'react';
import axios from 'axios';
// const Order=(props)=>{
//     return(
//         <button type="button" class="btn btn-success" onClick={this.order}>Order!</button>
//     );
// };
class Order extends Component {
    constructor(props) {
        super(props);
        this.order = this.order.bind(this);
    }
    order(e) {
        e.preventDefault();
        const product = {
            product_name: this.props.product.product_name,
            vendor: this.props.product.vendor,
            price: this.props.product.price,
            quantity: this.props.product.quantity,
            quantity_sold: parseInt(this.props.product.quantity_sold, 10) + parseInt(this.props.order_quantity, 10),
            state: "Listed"
        }
        console.log(product)
        axios.post('http://localhost:4000/productsv/update/' + this.props.product._id, product)
            .then(response => { console.log(response.data) })
            .catch(err => {
                console.log(err);
            })
        const product2 = {
            product_name: this.props.product.product_name,
            productv_id: this.props.product._id,
            vendor: this.props.product.vendor,
            price: this.props.product.price,
            quantity_ordered: parseInt(this.props.order_quantity, 10),
            customer: this.props.username,
            state: "Waiting"
        }
        console.log(product2)
        console.log(this.props.order_quantity)
        axios.post('http://localhost:4000/productsc/add/', product2)
            .then(response => { console.log(response.data) })
            .catch(err => {
                console.log(err);
            })
        setTimeout(() => {
            axios.post('http://localhost:4000/productsv/changelisted/')
                .then(response => { console.log(response.data) 
                    window.location='/customer-search'
                })
                .catch(err => {
                    console.log(err);
                })
            // window.location='/customer-search'
        }, 3000);
        this.props.clear()

    }
    render() {
        return (
            <button type="button" class="btn btn-success" onClick={this.order}>Order</button>
        );
    }
}
export default class ViewProductListed extends Component {

    constructor(props) {
        super(props);
        this.onChangequantity = this.onChangequantity.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        // this.onSubmit2 = this.onSubmit2.bind(this);
        this.order = this.order.bind(this);
        this.sortp = this.sortp.bind(this);
        this.sortq = this.sortq.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);

        this.clear_order_quantity = this.clear_order_quantity.bind(this);
        this.state = { users: [], products: [], description: "", order_quantity: 0 }



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

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
        console.log('fine')
    }
    onChangequantity(e) {
        this.setState({
            order_quantity: e.target.value
        })
        console.log(this.state.order_quantity)
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const temp = this.state.description;
        axios.get('http://localhost:4000/productsv/findlistedfuzzy/' + temp)
            .then(response => {
                this.setState({ products: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
        console.log('submit')
    }

    clear_order_quantity() {
        this.setState({
            order_quantity: 0
        })
    }

    order(e) {
        e.preventDefault();
        console.log(this.order_quantity)
    }

    sortp(e) {
        e.preventDefault();
        const temp = this.state.description;
        axios.get('http://localhost:4000/productsv/findlistedfuzzy/' + temp + '/sortp')
            .then(response => {
                this.setState({ products: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
        console.log('submit')
    }
    sortq(e) {
        e.preventDefault();
        const temp = this.state.description;
        axios.get('http://localhost:4000/productsv/findlistedfuzzy/' + temp + '/sortq')
            .then(response => {
                this.setState({ products: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
        console.log('submit')
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
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
                        <input type="submit" value="Search product" className="btn btn-primary" />
                    </div>
                </form>
                <div>
                    <h1>Products Listed:</h1>
                    <a href="#" id="sellproduct" onClick={this.sortq}>Sort by quantity left desc.</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" id="sellproduct" onClick={this.sortp}>Sort by price desc.</a>

                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Product name</th>
                            <th>Price</th>
                            <th>Quantity left</th>
                            {/* <th>Quantity sold</th> */}
                            <th>Vendor</th>
                            <th>Order amount</th>
                            <th>Confirm</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.products.map((Product, i) => {
                                return (
                                    <tr>
                                        <td>{Product.product_name}</td>
                                        <td>{Product.price}</td>
                                        <td>{Product.quantity - Product.quantity_sold}</td>
                                        <td><a href={'/view-reviews-vendor/' + Product.vendor}>{Product.vendor}</a></td>
                                        <td><input type="text"
                                            required
                                            className="form-control"
                                            value={this.state.order_quantity}
                                            onChange={this.onChangequantity}
                                            id="order-quantity"
                                        />
                                        </td>
                                        <td>
                                            <Order product={Product} clear={this.clear_order_quantity} username={this.state.username} order_quantity={this.state.order_quantity} />
                                            {/* {
                                            this.setState({
                                                order_quantity: 0
                                            })
                                        } */}
                                            {/* <button type="button" class="btn btn-success" onClick={this.order}>Order!</button> */}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import StarRatings from 'react-star-ratings';

class Star extends Component {
    constructor(props) {
        super(props);
        this.changeRating = this.changeRating.bind(this);
        this.state = {
            rating: this.props.product.rating
        }
    }
    
    changeRating(newRating, name) {
        this.setState({
            rating: newRating
        });
        // const product = {
        //     product_name: this.props.product.product_name,
        //     vendor: this.props.product.vendor,
        //     price : this.props.product.price,
        //     quantity: this.props.product.quantity,
        //     quantity_sold: parseInt(this.props.product.quantity_sold,10)+parseInt(this.props.order_quantity,10),
        //     state: "Listed"
        // }
        // console.log(product)
        const rating = {
            rating: newRating
        }
        axios.post('http://localhost:4000/productsc/rating/' + this.props.product._id, rating)
            .then(response => { console.log(response.data) })
            .catch(err => {
                console.log(err);
            })
        // const product2 = {
        //     product_name: this.props.product.product_name,
        //     productv_id: this.props.product._id,
        //     vendor: this.props.product.vendor,
        //     price : this.props.product.price,
        //     quantity_ordered: parseInt(this.props.order_quantity, 10),
        //     customer: this.props.username,
        //     state: "Waiting"
        // }
        // console.log(product2)
        // console.log(this.props.order_quantity)
        // axios.post('http://localhost:4000/productsc/add',product2)
        //   .then(response => { console.log(response.data)})
        //   .catch(err =>{
        //     console.log(err);
        // })
        // this.props.clear()
        // // window.location='/'
    }
    render() {
        return (
            <StarRatings
                rating={this.state.rating}
                starRatedColor="blue"
                changeRating={this.changeRating}
                numberOfStars={5}
                starDimension="20px"
                starSpacing="3px"
                name='rating'
            />
            //   <a>Comment</a>
        );
    }
}
export default class ViewProductListed extends Component {

    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = { users: [], products: [], username: "" }
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
        setTimeout(() => {
            const temp = this.state.username;
            axios.get('http://localhost:4000/productsc/findcustomer/' + temp)
                .then(response => {
                    this.setState({ products: response.data });
                })
                .catch(function (error) {
                    console.log(error);
                })
        }, 1000);
        console.log('submit')
    }
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
        console.log('fine')
    }

    onSubmit(e) {
        e.preventDefault();
        const temp = this.state.username;
        axios.get('http://localhost:4000/productsc/findcustomer/' + temp)
            .then(response => {
                this.setState({ products: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
        console.log('submit')
    }
    changeRating(newRating, name) {
        this.setState({
            rating: newRating
        });
    }

    render() {
        return (
            <div>
                <div>
                    <h1>Products Listed:</h1>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Product name</th>
                            <th>Price</th>
                            <th>Quantity ordered</th>
                            <th>State</th>
                            <th>Actions</th>
                            <th>Comment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.products.map((Product, i) => {
                                return (
                                    <tr>
                                        <td>{Product.product_name}</td>
                                        <td>{Product.price}</td>
                                        <td>{Product.quantity_ordered}</td>
                                        <td>{Product.state}</td>
                                        <td>
                                            {Product.state == "Waiting" && (
                                                <Link to={"/customeredit/" + Product._id}>edit</Link>
                                            )}
                                            {Product.state == "Dispatched" && (
                                                <Star product={Product} />
                                            )}
                                        </td>
                                        <td>
                                            {Product.state == "Dispatched" && (
                                                <Link to={"/comment/" + Product._id}>Comment</Link>
                                            )}
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
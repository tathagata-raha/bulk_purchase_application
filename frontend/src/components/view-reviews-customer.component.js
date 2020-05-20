import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import StarRatings from 'react-star-ratings';

export default class ViewReviewsVendor extends Component {

    constructor(props) {
        super(props);
        this.state = { users: [], products: [], products: [] }
    }


    componentDidMount() {
        axios.get('http://localhost:4000/productsc/findvendorreviews/' + this.props.match.params.name)
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        products: response.data
                    })

                }
                console.log(this.state.products)
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    render() {
        return (
            <div>
                <div>
                    <h1>Reviews:</h1>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>

                            <th>Product name</th>
                            <th>Customer</th>
                            <th>Quantity bought</th>
                            <th>Rating</th>
                            <th>Comment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.products.map((Product, i) => {
                                return (
                                    <tr>

                                        <td>{Product.product_name}</td>
                                        <td>{Product.customer}</td>
                                        <td>{Product.quantity_ordered}</td>
                                        <td><StarRatings
                                            rating={Product.rating}
                                            starRatedColor="red"
                                            starDimension="20px"
                                            starSpacing="5px"
                                            numberOfStars={5}
                                            name='rating'
                                        /></td>
                                        <td>{Product.comment}</td>
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
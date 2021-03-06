import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class ViewProductReady extends Component {
    
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {users: [],products:[],username:""}
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
            const temp=this.state.username;
        axios.get('http://localhost:4000/productsv/findvendor/'+temp+'/dispatched')
             .then(response => {
                 this.setState({products: response.data});
             })
             .catch(function(error) {
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

    sellproduct(Product) {
        const product = {
            product_name: Product.product_name,
            vendor: Product.vendor,
            price : Product.price,
            quantity: Product.quantity,
            quantity_sold: Product.quantity,
            state: "Dispatched"
        }
        console.log(product)
        axios.post('http://localhost:4000/productsv/changeplaced/'+Product._id,product)
          .then(response => { console.log(response.data)})
          .catch(err =>{
            console.log(err);
        })
        setTimeout(() => {
        axios.post('http://localhost:4000/productsv/changeplaced2/'+Product._id,product)
          .then(response => { console.log(response.data)})
          .catch(err =>{
            console.log(err);
        }
        )
        window.location='/ready'
        }, 1000);
        console.log('abc')

        
      }

    onSubmit(e) {
        e.preventDefault();
        const temp=this.state.username;
        axios.get('http://localhost:4000/productsv/findvendor/'+temp+'/ready')
             .then(response => {
                 this.setState({products: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
        console.log('submit')
    }

    render() {
        return (
            <div>
                <div>
                    <h1>Products ready to be dispatched:</h1>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Product name</th>
                            <th>Price</th>
                            <th>Quantity sold</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.products.map((Product, i) => {
                            return (
                                <tr>
                                    <td>{Product.product_name}</td>
                                    <td>{Product.price}</td>
                                    <td>{Product.quantity}</td>
                                    <td><Link to={"/viewreviews/" + Product._id}>View Reviews</Link></td>
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
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"

import UsersList from './components/users-list.component'
import CreateUser from './components/create-user.component'
import Navbar from "./components/navbar.component"
import Navbar2 from "./components/navbar2.component"
import Navbar3 from "./components/navbar3.component"
import ViewProductListed from "./components/viewproductlisted.component"
import CreateProduct from "./components/createproduct.component"
import ViewProductReady from "./components/viewproductreadytobedispatched.component"
import ViewProductDispatched from "./components/viewproductdispatched.component"
import CreateVendor from "./components/createvendor.component"
import CreateCustomer from "./components/createcustomer.component"
import CustomerSearch from "./components/customersearch.component"
import CustomerProducts from "./components/view-products-bought.js"
import EmptyCustomer from "./components/emptycustomer.component"
import EditOrder from "./components/edit-order-customer";
import Login from "./components/login.component";
import LoginFail from "./components/login.fail.component"
import Logout from "./components/logout.component"
import GiveComment from "./components/give-comments.component"
import ViewReviews from "./components/view-reviews.component"
import ViewReviewsVendor from "./components/view-reviews-customer.component"
export default class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			class: "Vendor",
			userdata: []
		}
	}
	componentDidMount() {
		axios.get('http://localhost:4000/userdata')
			.then(response => {
				if (response.data.length > 0) {
					this.setState({
						username: response.data[0]
					})
					console.log(this.state.username)
				}
				else
				{
					axios.post('http://localhost:4000/userdata/addempty/');
					this.setState({
						username: {username:"",class:true}
					})
				}
				{
					console.log(this.state.username.class)
				}
			})
			.catch(function (error) {
				console.log(error);
			})
		axios.post('http://localhost:4000/productsv/changelisted/')
			.then(response => { console.log(response.data) })
			.catch(err => {
				console.log(err);
		})

	}
	render() {
		return (

			<Router>
				<div className="container">
					{
						(this.state.username.username === "") ?
							<Navbar2 />
							:
							// (this.state.username.class===true)?

							<Navbar type={this.state.username.class == "true" ? "vendor" : "customer"} />
						// :<Navbar3/>
					}
					<br />
					{
						(this.state.username.username === "") ?
							<Route path="/" exact component={Login} /> :
							(this.state.username.class == "true") ?
								<Route path="/" exact component={ViewProductListed} />
								: <Route path="/" component={EmptyCustomer} />
					}
					<Route path="/ready" exact component={ViewProductReady} />
					<Route path="/dispatched" exact component={ViewProductDispatched} />
					<Route path="/create" component={CreateProduct} />
					<Route path="/customer-search" component={CustomerSearch} />
					<Route path="/create-vendor" component={CreateVendor} />
					<Route path="/create-customer" component={CreateCustomer} />
					<Route path="/customeredit/:id" component={EditOrder} />
					<Route path="/customer-products" component={CustomerProducts} />
					<Route path="/login-fail" component={LoginFail} />
					<Route path="/logout" component={Logout} />
					<Route path="/comment/:id" component={GiveComment} />
					<Route path="/viewreviews/:id" component={ViewReviews} />
					<Route path="/view-reviews-vendor/:name" component={ViewReviewsVendor} />

				</div>
			</Router>
		);
	}
}

// function App(){

//   return (
//     <Router>
//       <div className="container">
//       {
//         1?          
//         <Navbar2/>
//         :
//         <Navbar/>
//       }
//         <br/>
//         {
//         1?
//         <Route path="/" exact component={Login}/>
//         :
//         <Route path="/" exact component={ViewProductListed}/>
// }
//         <Route path="/ready" exact component={ViewProductReady}/>
//         <Route path="/create" component={CreateProduct}/>
//         <Route path="/customer-search" component={CustomerSearch}/>
//         <Route path="/create-vendor" component={CreateVendor}/>
//         <Route path="/create-customer" component={CreateCustomer}/>
//         <Route path="/customeredit/:id" component={EditOrder} />
//         <Route path="/customer-products" component={CustomerProducts}/>
//         <Route path="/login-fail" component={LoginFail}/>
//       </div>
//     </Router>
//   );
// }

// export default App;

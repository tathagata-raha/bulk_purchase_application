import React, { Component } from 'react';
import axios from 'axios';

export default class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      quantity_ordered: 0,
      duration: 0,
      date: new Date(),
      users: "",
      difference:0,
      difference2:0,
      quantity:0,
      quantity_sold:0
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/productsc/'+this.props.match.params.id)
      .then(response => {
        this.setState({
            product_name: response.data.product_name,
            productv_id: response.data.productv_id,
            vendor: response.data.vendor,
            price: response.data.price,
            difference2 : response.data.quantity_ordered,
            quantity_ordered: response.data.quantity_ordered,
            customer: response.data.customer,
            state: response.data.state
        })
      })
      .catch(function (error) {
        console.log(error);
      })

  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeQuantity(e) {
    this.setState({
        
      quantity_ordered: e.target.value,
    //   difference: parseInt(this.state.difference,10)-parseInt(this.state.quantity_ordered,10)
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const product = {
        product_name: this.state.product_name,
        productv_id: this.state.productv_id,
        vendor: this.state.vendor,
        price: this.state.price,
        quantity_ordered: this.state.quantity_ordered,
        customer: this.state.customer,
        state: this.state.state
    }

    // console.log(product);
    // console.log( this.props.match.params.id);

    axios.post('http://localhost:4000/productsc/update/' + this.props.match.params.id, product)
      .then(res => console.log(res.data));
    console.log(parseInt(this.state.difference2,10)-parseInt(this.state.quantity_ordered,10))
    axios.get('http://localhost:4000/productsv/'+this.state.productv_id)
    .then(response => {
        this.setState({
            users: response.data,
            quantity: response.data.quantity,
            quantity_sold: response.data.quantity_sold
        })
    // setTimeout(() => {console.log('a')}, 1000);
    console.log("yum")  
    })
      .catch(function (error) {
        console.log(error);
      })
      axios.post('http://localhost:4000/productsv/changelisted/')
			.then(response => { console.log(response.data) })
			.catch(err => {
				console.log(err);
        })
    setTimeout(() => {
      console.log(this.state.productv_id)
    console.log("Product:"+this.state.users.quantity_sold)
    const product2 = {
        product_name: this.state.product_name,
        vendor: this.state.vendor,
        price : this.state.price,
        quantity: this.state.quantity,
        quantity_sold: this.state.quantity_sold-parseInt(this.state.difference2,10)+parseInt(this.state.quantity_ordered,10),
        state: "Listed"
    }
    console.log(product2)
    axios.post('http://localhost:4000/productsv/update/'+this.state.productv_id, product2)
            .then(res => {console.log(res.data)
              window.location = '/customer-products';
            })
            .catch(err => console.log("Error:"+err));
    this.setState({
        difference2: this.state.quantity_ordered
    })
    }, 1000);
    // window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit Order Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Quantity ordered: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.quantity_ordered}
              onChange={this.onChangeQuantity}
              />
        </div>
        <div className="form-group">
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}
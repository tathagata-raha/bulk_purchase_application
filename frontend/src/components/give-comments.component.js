import React, { Component } from 'react';
import axios from 'axios';

export default class GiveComment extends Component {
  constructor(props) {
    super(props);

    this.onChangeComment = this.onChangeComment.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      id:'',
        comment:""
    }
  }

  componentDidMount() {
        this.setState({
            id: this.props.match.params.id,
        })
        console.log(this.props.match.params.id)
  }

  onChangeComment(e) {
    this.setState({
      comment: e.target.value
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

    const comment = {
        comment: this.state.comment
    }

    // console.log(product);
    // console.log( this.props.match.params.id);

    axios.post('http://localhost:4000/productsc/comment/' + this.state.id, comment)
      .then(res => {console.log(res.data)
      window.location='/customer-products'
      
      });
    
    // window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit Order Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Comment: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.comment}
              onChange={this.onChangeComment}
              />
        </div>
        <div className="form-group">
          <input type="submit" value="Comment" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}
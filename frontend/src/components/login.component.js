import React, { Component } from 'react';
import axios from 'axios';
import { Base64 } from 'js-base64';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeClass = this.onChangeClass.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit1 = this.onSubmit1.bind(this);

        this.state = {
            username: '',
            password: '',
            class: "Vendor",
            userdata: "khs"
        }
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

    onChangeClass(e) {
        this.setState({
            class: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    // onChangequantity(e) {
    //     this.setState({
    //         quantity: e.target.value
    //     })
    // }
    isDict(v) {
        return typeof v === 'object' && v !== null && !(v instanceof Array) && !(v instanceof Date);
    }

    onSubmit1(e) {
        e.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password,
            class: this.state.class === "Vendor" ? true : false
            // quantity: this.state.quantity,
            // quantity_sold: 0,
            // state: "Listed"
        }


        // console.log(user);
        if (user.class) {
            console.log('a')
            axios.get('http://localhost:4000/users/findv/' + user.username)
                .then(response => {
                    this.setState({ userdata: response.data[0] });
                })
                .catch(err => console.log("Error:" + err));
        }
        else {

            axios.get('http://localhost:4000/users/findc/' + this.state.username)
                .then(response => {
                    this.setState({ userdata: response.data[0] });
                    // console.log(this.state.username)
                })
                .catch(err => console.log("Error:" + err));
        } // 
        setTimeout(() => {
            console.log(this.state.userdata)
            if (this.isDict(this.state.userdata)) {
                console.log(this.state.userdata)
                if (this.state.userdata.password === Base64.encode(this.state.password)) {
                    console.log("Login Successful")
                    if (this.state.userdata.cclass == true) {
                        axios.post('http://localhost:4000/userdata/update/' + this.state.username + '/v')
                            .then(response => {
                                console.log(response.data);
                                // console.log(this.state.username)
                                window.location = '/'
                            })
                    }
                    else {
                        axios.post('http://localhost:4000/userdata/update/' + this.state.username + '/c')
                            .then(response => {
                                console.log(response.data);
                                // console.log(this.state.username)
                                window.location = '/'
                            })
                    }
                }
                else {
                    console.log("Done")
                    window.location = '/login-fail'
                }
                console.log(this.state.userdata.password)
            }
            else {
                console.log("Done")
                window.location = '/login-fail'
            }
        }, 1000);
        // window.location = '/';
    }

    render() {
        return (
            <div>

                <h3>Login</h3>
                <form onSubmit={this.onSubmit1}>
                    <div className="form-group">
                        <label>Type: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            onChange={this.onChangeClass}>
                            <option key="Vendor" value="Vendor">
                                Vendor
                        </option>
                            <option key="Customer" value="Customer">
                                Customer
                        </option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input
                            type="password"
                            required
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary" />
                    </div>
                </form>
                {/* <form onSubmit={this.onSubmit2}>
                    
                    
                    
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
                </form> */}
            </div>
        )
    }
}

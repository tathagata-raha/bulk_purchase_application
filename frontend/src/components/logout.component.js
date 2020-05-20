import React, { Component } from 'react';
import axios from 'axios';

export default class Logout extends Component {

    constructor(props) {
        super(props);
        this.back = this.back.bind(this);

        this.state = {
            username: '',
            password: '',
            class: "Vendor",
            userdata: []
        }
    }
    back()
    {
        window.location='/'
    }
    logout()
    {
        axios.post('http://localhost:4000/userdata/clear')
                    .then(response => {
                        console.log(response.data);
                        // console.log(this.state.username)
                        window.location='/'
                    })
    }
    render() {
        return (
            <div>

                <h3>Confirm Logout</h3>
                <button type="button" class="btn btn-danger" onClick={this.back}>No</button><h3> </h3>
                <button type="button" class="btn btn-success" onClick={this.logout}>Yes</button>
            </div>
        )
    }
}

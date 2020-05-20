import React, { Component } from 'react';
import axios from 'axios';

export default class LoginFail extends Component {

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
    render() {
        return (
            <div>

                <h3>Login Failed</h3>
                <button type="button" class="btn btn-danger" onClick={this.back}>Go back</button>
            </div>
        )
    }
}

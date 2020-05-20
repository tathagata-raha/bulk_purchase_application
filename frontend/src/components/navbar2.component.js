import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">Shop Me!</Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                    <Link to="/" className="nav-link">Login</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/create-vendor" className="nav-link">Add vendor</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/create-customer" className="nav-link">Add customer</Link>
                </li>
                </ul>
            </div>
            </nav>
        );
    }
}
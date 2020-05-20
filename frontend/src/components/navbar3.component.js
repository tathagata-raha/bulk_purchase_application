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
                    <Link to="/customer-search" className="nav-link">Customer search</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/customer-products" className="nav-link">Customer products</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/logout" className="nav-link">Logout</Link>
                </li>
                </ul>
            </div>
            </nav>
        );
    }
}
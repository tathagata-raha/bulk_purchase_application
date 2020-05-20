import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
    }
  render() {
    return (
            
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">Shop Me!</Link>
            <div className="collapse navbar-collapse">
                {/* <ul className="navbar-nav mr-auto"> */}
                {
                    (this.props.type==="vendor")?
                    <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                    <Link to="/" className="nav-link">Products listed</Link>
                    </li>
                    <li className="navbar-item">
                    <Link to="/create" className="nav-link">Create product</Link>
                    </li>
                    <li className="navbar-item">
                    <Link to="/ready" className="nav-link">Products ready</Link>
                    </li>
                    <li className="navbar-item">
                    <Link to="/dispatched" className="nav-link">Products dispatched</Link>
                    </li>
                    <li className="navbar-item">
                    <Link to="/logout" className="nav-link">Logout</Link>
                </li>
                    </ul>
                :
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
                }    
                    
                {/* <li className="navbar-item">
                    <Link to="/" className="nav-link">Products listed</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/create" className="nav-link">Create product</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/ready" className="nav-link">Products ready</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/customer-search" className="nav-link">Customer search</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/create-vendor" className="nav-link">Add vendor</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/create-customer" className="nav-link">Add customer</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/customer-products" className="nav-link">Customer products</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/logout" className="nav-link">Logout</Link>
                </li>
                </ul> */}
            </div>
            </nav>
        );
    }
}
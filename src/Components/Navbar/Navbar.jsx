import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import './Navbar.css'
import jwt_decode from 'jwt-decode';
import SearchInput from './SearchInput';

import img from "./../../images/movie.svg";

export default class Navbar extends Component {

    constructor() {
        super();
        this.token = localStorage.getItem('token');
        this.obj = jwt_decode(this.token);
    }

    render() {
        return (
            <>
                <nav className="navbar navbar-expand-lg fixed-top navbar-dark pb-4 pt-3" >
                    <span className="dot">.</span>

                    <div className="container-fluid">
                        <NavLink className="navbar-brand" to="/home" title="cinema house"><img src={img} alt="cinema house" title="cinema house" />cinema house</NavLink>

                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="nav navbar-nav mr-auto">

                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/home" title="Home">Home</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/movies" title="Movies">Movies</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/series" title="Tv Series">Series</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/actors" title="People">Actors</NavLink>
                                </li>
                            </ul>

                            <SearchInput />

                            <ul className="nav navbar-nav ">
                                <li className="nav-item">
                                </li>
                            </ul>

                            <div className="btn-group dropdown" title="Setting">

                                <button type="button" className="btn bg-purple dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>

                                <div className="dropdown-menu my-2">
                                    <Link className="dropdown-item disabled" to="/setting" data-set="1">Setting</Link>
                                    <Link className="dropdown-item disabled" to="/setting" data-set="2">{this.obj.first_name}</Link>

                                    <div className="dropdown-divider"></div>
                                    <Link className="dropdown-item text-white" to="/logout" data-set="3">Logout</Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </nav>
            </>
        )
    }
}

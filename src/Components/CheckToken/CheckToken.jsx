import React, { Component } from 'react'
import jwt_decode from 'jwt-decode';
import { Redirect, Route } from 'react-router-dom';

export default class CheckToken extends Component {

    constructor() {
        super();
        this.token = localStorage.getItem('token');
    }
    render() {
        try {
            jwt_decode(this.token);

        } catch (error) {
            return (<Route path={this.props.path} component={this.props.component} />)
        }

        return this.token ? <Redirect to="/home" /> : <Route path={this.props.path} component={this.props.component} />;

    }
}

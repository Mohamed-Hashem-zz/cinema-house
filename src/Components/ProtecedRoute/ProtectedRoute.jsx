import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom';
import jwt_decode from "jwt-decode";

export default class ProtectedRoute extends Component {

    render() {
        let token = localStorage.getItem("token");

        try {
            jwt_decode(token);
        } catch (error) {
            localStorage.removeItem("token");
        }

        return token ? <Route path={this.props.path} component={this.props.component} /> : <Redirect to="/login" />;
    }
}

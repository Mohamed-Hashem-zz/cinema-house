import React, { Component } from 'react';
import axios from 'axios';
import SolidNavbar from './../../Components/Solid Navbar/SolidNavbar';

export default class Login extends Component {

    controller = new AbortController();

    constructor() {
        super();

        this.state = { errorMessage: "", status: "", waiting: false };

        this.User = {
            email: "",
            password: ""
        }
    }

    getFormData = (e) => {
        this.User[e.target.name] = e.target.value;
    }
    validateUserData = () => {
        if (this.User.email === "") {

            this.setState({
                errorMessage: "Please Enter Valid Email",
                status: "alert alert-danger text-center font-weight-bolder"
            })

            return false;
        }
        else if (this.User.password === "") {

            this.setState({
                errorMessage: "Please Enter Valid Password",
                status: "alert alert-danger text-center font-weight-bolder"
            })

            return false;
        } else
            return true;
    }
    sendData = async (e) => {

        e.preventDefault();

        this.setState({ waiting: true })

        const isValid = this.validateUserData();

        if (isValid) {

            await axios.post("https://route-egypt-api.herokuapp.com/signin", this.User, { signal: this.controller.signal }).then((res) => {

                const { data } = res;

                if (data.message === "success") {

                    localStorage.setItem("token", data.token);
                    this.props.history.replace('/home'); // to change the direction to home and back to empty Page
                }
                else {
                    this.setState({
                        errorMessage: data.message,
                        status: "alert alert-danger text-center font-weight-bolder"
                    })
                }

            }).catch((err) => this.setState({ errorMessage: err.message, status: "alert alert-danger text-center font-weight-bolder" }))
        }

        this.setState({ waiting: false })

    }

    componentWillUnmount() {
        this.setState({ waiting: false })
        this.controller.abort();
    }

    render() {
        return (
            <>
                <SolidNavbar />

                <section className='d-flex align-items-center justify-content-center' style={{ minHeight: "73vh", top: "80px" }}>
                    <div className="container text-center" style={{ width: "35%" }}>

                        <form onSubmit={this.sendData} >

                            <input onChange={this.getFormData} type="email" name="email" className="form-control my-3" placeholder="Email" autoFocus autoComplete="email" />
                            <input onChange={this.getFormData} type="password" name="password" className="form-control my-3" placeholder="Password" autoComplete="current-password" />

                            <div className={this.state.status}>{this.state.errorMessage}</div>

                            <button className="btn btn-info w-50 my-3">{this.state.waiting ? "Waiting ... " : "Login"}</button>
                        </form>
                    </div>
                </section>
            </>
        )
    }
}

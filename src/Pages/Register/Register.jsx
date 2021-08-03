import React, { Component } from 'react'
import axios from 'axios';
import SolidNavbar from './../../Components/Solid Navbar/SolidNavbar';

export default class Register extends Component {

    controller = new AbortController();

    constructor() {
        super();

        this.state = {
            errorMessage: "",
            status: "",
            statusFirstnameError: "",
            statusLastnameError: "",
            statusAgeError: "",
            statusEmailError: "",
            statusPasswordError: "",
            firstnameError: "",
            lastnameError: "",
            ageError: "",
            emailError: "",
            passwordError: "",
            waiting: false
        }

        this.User = {
            first_name: "",
            last_name: "",
            age: "",
            email: "",
            password: ""
        }
    }

    validation() {

        const emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        let emailValidate = emailRegex.test(String(this.User.email));

        const passwordRegex = new RegExp(/^.{6,}$/);
        let passwordValidate = passwordRegex.test(String(this.User.password));

        if (this.User.first_name === "") {

            this.setState({
                firstnameError: "Firstname field is Empty , Please enter at least 3 lowercase alphabetical character",
                statusFirstnameError: "alert alert-danger text-center font-weight-bolder"
            })

            return false;

        } else if (this.User.last_name === "") {

            this.setState({
                lastnameError: "Lastname field is Empty , Please enter at least 3 lowercase alphabetical character",
                statusLastnameError: "alert alert-danger text-center font-weight-bolder"
            })

            return false;
        }
        else if (this.User.age === null || this.User.age < 18) {

            if (this.User.age === null)
                this.setState({
                    ageError: "Age is field Empty ,Please enter age Should be More than or Equal 18",
                    statusAgeError: "alert alert-danger text-center font-weight-bolder"
                })
            else
                this.setState({
                    ageError: "Age is small ,Please enter age Should be More than or Equal 18",
                    statusAgeError: "alert alert-danger text-center font-weight-bolder"
                })


            return false;
        }
        else if (!emailValidate || this.User.email === "") {

            if (this.User.email === "")
                this.setState({
                    emailError: "Email field is Empty ,Please Enter Valid Email",
                    statusEmailError: "alert alert-danger text-center font-weight-bolder"
                })
            else {
                this.setState({
                    emailError: "Email is Invalid Please Enter Valid Email",
                    statusEmailError: "alert alert-danger text-center font-weight-bolder"
                })
            }
            return false;
        }
        else if (!passwordValidate || this.User.password === "") {

            if (this.User.password === "")
                this.setState({
                    passwordError: `Password field is Empty ,Please Enter Password More Than 6`,
                    statusPasswordError: "alert alert-danger text-center font-weight-bolder"
                })
            else {
                this.setState({
                    passwordError: `Password is Invalid ,Please Enter Password More Than 6`,
                    statusPasswordError: "alert alert-danger text-center font-weight-bolder"
                })
            }
            return false;
        }
        else
            return true;
    }

    getFormData = (e) => {
        this.User[e.target.name] = e.target.value;
    }

    sendData = async (e) => {

        e.preventDefault();

        this.setState({ waiting: true });

        const isValid = this.validation();

        if (isValid) {

            await axios.post("https://route-egypt-api.herokuapp.com/signup", this.User, { signal: this.controller.signal }).then((res) => {

                const { data } = res;

                this.setState({
                    errorMessage: data.message,
                    status: "alert alert-success text-center font-weight-bolder"
                })

                e.target.reset();

            }).catch((err) => this.setState({ errorMessage: err.message, status: "alert alert-danger text-center font-weight-bolder" }))

        }

        this.setState({ waiting: false });
    }

    componentWillUnmount() {
        this.setState({ waiting: false });
        this.controller.abort();
    }

    render() {
        return (
            <>
                <SolidNavbar />

                <section className="d-flex justify-content-center align-items-center position-relative" style={{ minHeight: "73vh", top: "100px" }}>
                    <div className="container text-center" style={{ width: "35%" }}>

                        <form onSubmit={this.sendData}>
                            <input onChange={this.getFormData} type="text" name="first_name" className="form-control my-3" placeholder="First Name" autoFocus />
                            {
                                this.state.errorMessage === "success" ? <div className="d-none"></div> : <div className={this.state.statusFirstnameError}>{this.state.firstnameError}</div>
                            }

                            <input onChange={this.getFormData} type="text" name="last_name" className="form-control my-3" placeholder="Last Name" />
                            {
                                this.state.errorMessage === "success" ? <div className="d-none"></div> : <div className={this.state.statusLastnameError}>{this.state.lastnameError}</div>
                            }

                            <input onChange={this.getFormData} type="number" name="age" className="form-control my-3" placeholder="Age" />
                            {
                                this.state.errorMessage === "success" ? <div className="d-none"></div> : <div className={this.state.statusAgeError}>{this.state.ageError}</div>
                            }

                            <input onChange={this.getFormData} type="email" name="email" className="form-control my-3" placeholder="Email" />
                            {
                                this.state.errorMessage === "success" ? <div className="d-none"></div> : <div className={this.state.statusEmailError}>{this.state.emailError}</div>
                            }

                            <input onChange={this.getFormData} type="password" name="password" className="form-control my-3" placeholder="Password" />
                            {
                                this.state.errorMessage === "success" ? <div className="d-none"></div> : <div className={this.state.statusPasswordError}>{this.state.passwordError}</div>
                            }

                            <div className={this.state.status}>{this.state.errorMessage}</div>

                            <button className="btn btn-info w-50 my-3">{this.state.waiting ? "Waiting ... " : "Register"}</button>

                        </form>
                    </div >
                </section>
            </>
        )
    }
}
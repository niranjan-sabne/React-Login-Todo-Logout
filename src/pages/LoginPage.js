// Importing required packages, components and libraries

import React, { Component } from 'react'
import { Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap'
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom'

// Regular Expressions for Validations

const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForUname = RegExp(/^[a-z0-9_.]+$/);
const regForPass = RegExp(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/);

// Class Component with Routing

export class LoginPage extends Component {

    // Class Constructor

    constructor(props) {
        super(props);

        // Checking token in local storage for login

        const token = localStorage.getItem("token")
        let loggedIn = true
        if (token == null) {
            loggedIn = false
        }

        // Assigning State Variables

        this.state = {
            empData: [],
            email: '',
            pass: '',
            loggedIn,
            errors: {
                email: '',
                pass: ''
            }
        }
    }

    // Loading the Users Details form Json Server with Axios

    componentDidMount() {
        const URL = "http://localhost:3001/users"
        axios.get(URL)
            .then(res => {

                this.setState({
                    empData: res.data
                })

            })
            .catch(err => {
                console.log(err)
            })
    }

    // Handling onChange Events with Validations

    onChangeUser = (e) => {
        const { name, value } = e.target;
        let errors = this.state.errors;
        switch (name) {
            case 'email':
                errors.email = (regForEmail.test(value) || regForUname.test(value)) ? '' : 'Email or Uname is not valid';
                break;
            case 'pass':
                errors.pass = regForPass.test(value) ? '' : 'Password must be 8 - 16 characters long and only have :  at least a symbol, upper and lower case letters and a numbers';
                break;
            default:
                alert('Some fields are not declared..');
        }
        this.setState({ [name]: value })
    }

    // Handling onSubmit Event with Validation Verification
    // and Generating Local Storage Token

    onSubmitButton = (e) => {
        e.preventDefault();
        e.target.reset();

        if (this.validate(this.state.errors)) {
            let getSearch = this.state.empData.filter(item => (this.state.email === item.email || this.state.email === item.uname) && this.state.pass === item.pass)
            const loggId = getSearch.map(item => item.id)
            if (getSearch.length > 0) {
                alert("Logged In Successfully!!");
                localStorage.setItem("token", loggId)
                //console.log(getSearch)
                this.setState({
                    empData: getSearch,
                    loggedIn: true,
                })
            }
            else {
                alert("Sorry! Credentials doesn't Match.. Try Again or Please SignUP! ");
            }
        }
        else {
            alert("Invalid Credentials, try again !!");
            let errors = { email: '', pass: '' }
            this.setState({
                errors: errors
            })
        }
    }

    // Validating Validations

    validate = (errors) => {
        let valid = true;
        Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
        return valid;
    }

    // Rendering Login Page with React Bootstrap

    render() {

        // If LoggedIn then Redirecting to the Dashboard

        if (this.state.loggedIn) {

            return <Redirect to="/home" />
        }

        // Returning Login Form 

        return (
            <>
                <section className="bg-image">
                    <Container fluid className="px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
                        <Card className="card0 border-0">
                            <Row className="d-flex">

                                <Col className="col-lg-6">
                                    <div className="card1 pb-5">
                                        <Row>
                                            <Image src=".././images/inf.png" className="logo" />
                                        </Row>
                                        <Row className="px-3 justify-content-center mt-4 mb-5 border-line">
                                            <Image src=".././images/todo-list.png" className="image" />
                                        </Row>
                                    </div>
                                </Col>

                                <Col className="col-lg-6">
                                    <Card className="card2 border-0 px-4 py-5">

                                        <Row className="mb-4 px-3">
                                            <h6 className="mb-0 mr-4 mt-2">Sign in with</h6>
                                            <div className="facebook text-center mr-3">
                                                <div className="fa fa-facebook"></div>
                                            </div>
                                            <div className="twitter text-center mr-3">
                                                <div className="fa fa-twitter"></div>
                                            </div>
                                            <div className="linkedin text-center mr-3">
                                                <div className="fa fa-linkedin"></div>
                                            </div>
                                        </Row>

                                        <Row className="px-3 mb-4">
                                            <div className="line"></div>
                                            <small className="or text-center">Or</small>
                                            <div className="line"></div>
                                        </Row>

                                        <Form onSubmit={this.onSubmitButton}>
                                            <Row className="px-3">

                                                <Form.Label className="mb-1">
                                                    <h6 className="mb-1 text-sm">Email Id / Uname</h6>
                                                </Form.Label>
                                                <Form.Control className="mb-1" type="text" name="email" placeholder="Enter a valid email id or user name" onChange={this.onChangeUser} required />

                                                <Form.Text className="text-muted mb-3">
                                                    We'll never share your email with anyone else.
                                                </Form.Text>
                                                <Col>
                                                    <small className="form-text text-right text-danger font-italic mb-1">{this.state.errors.email}</small>
                                                </Col>
                                            </Row>
                                            <Row className="px-3">
                                                <Form.Label className="mb-1">
                                                    <h6 className="mb-1 text-sm">Password</h6>
                                                </Form.Label>
                                                <Form.Control className="mb-2" type="password" name="pass" placeholder="Enter password" onChange={this.onChangeUser} required />
                                                <small className="form-text text-danger font-italic mb-1">{this.state.errors.pass}</small>
                                            </Row>
                                            <Row className="px-3 mb-4">
                                                <div className="custom-control custom-checkbox custom-control-inline">
                                                    <input id="chk1" type="checkbox" name="chk" className="custom-control-input" required />
                                                    <label for="chk1" className="custom-control-label text-sm" >Remember me</label>
                                                </div>
                                                <a href="/#" className="ml-auto mb-0 text-sm">Forgot Password?</a>
                                            </Row>
                                            <Row className="mb-3 px-3">
                                                <Button variant="primary" type="submit" className="btn-blue">Login</Button> &nbsp;&nbsp;
                                                <Button variant="danger" type="reset" className="btn-blue">Reset</Button>
                                            </Row>
                                        </Form>

                                        <Row className="mb-4 px-3">
                                            <small className="font-weight-bold">Don't have an account? <Link to="/signup" className="text-warning">Register</Link></small>
                                        </Row>

                                    </Card>
                                </Col>

                            </Row>

                            <div className="bg-blue py-4">
                                <Row className="px-3">
                                    <small className="ml-4 ml-sm-5 mb-2">Copyright &copy; 2021. All rights reserved.</small>
                                    <div className="social-contact ml-4 ml-sm-auto">
                                        <span className="fa fa-facebook mr-4 text-sm"></span>
                                        <span className="fa fa-google-plus mr-4 text-sm"></span>
                                        <span className="fa fa-linkedin mr-4 text-sm"></span>
                                        <span className="fa fa-twitter mr-4 mr-sm-5 text-sm"></span>
                                    </div>
                                </Row>
                            </div>

                        </Card>
                    </Container>
                </section>
            </>
        )
    }
}

// Exporting Class Component

export default LoginPage
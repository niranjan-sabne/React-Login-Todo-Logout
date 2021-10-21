// Importing required packages, components and libraries

import React from 'react'
import { Component } from 'react';
import { Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap'
import axios from 'axios';
import { Link } from 'react-router-dom'

// Regular Expressions for Validations

const regForName = RegExp(/[A-Z][a-z]*.{3,}/);
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForUname = RegExp(/^[a-z0-9_.]+$/);
const regForPass = RegExp(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/);

// Class Component with Routing

export class SignupPage extends Component {

    // Class Constructor

    constructor(props) {
        super(props);

        // Assigning State Variables

        this.state = {
            fname: '',
            lname: '',
            email: '',
            uname: '',
            pass: '',
            cpass: '',
            errors: {
                fname: '',
                lname: '',
                email: '',
                uname: '',
                pass: '',
                cpass: ''
            }
        }
    }

    // Handling onChange Events with Validations

    onChangeUser = (event) => {
        const { name, value } = event.target;
        let errors = this.state.errors;
        switch (name) {
            case 'fname':
                errors.fname = regForName.test(value) ? '' : 'Name starts with capital letter and length must be > 3, it does not include any numbers and symbols.';
                break;
            case 'lname':
                errors.lname = regForName.test(value) ? '' : 'Name starts with capital letter and length must be > 3, it does not include any numbers and symbols.';
                break;
            case 'email':
                errors.email = regForEmail.test(value) ? '' : 'Email Id is not valid';
                break;
            case 'uname':
                errors.uname = regForUname.test(value) ? '' : 'Username can only have: lowercase letters, numbers, dots, underscores';
                break;
            case 'pass':
                errors.pass = regForPass.test(value) ? '' : 'Password must be 8 - 16 characters long and only have :  at least a symbol, upper and lower case letters and a numbers';
                break;
            case 'cpass':
                errors.cpass = (this.state.pass === value) ? '' : 'Password does not match, type same password';
                break;
            default:
                alert('Some fields are not declared..');
        }
        this.setState({ [name]: value })
    }

    // Handling onSubmit Event with Validation Verification
    // and posting data to Json Server with Axios

    onUserSubmit = (event) => {
        event.preventDefault();
        event.target.reset();
        if (this.validate(this.state.errors)) {
            alert("User is valid and Account is created Successfully! Go to the Login Page!");
            let empData = { fname: this.state.fname, lname: this.state.lname, email: this.state.email, uname: this.state.uname, pass: this.state.cpass };
            const URL = "http://localhost:3001/users";
            axios.post(URL, empData)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err)
                })
            this.setState({ signedIn: true })
        }
        else {
            alert("Invalid Credentials, try again !!");
            let errors = { fname: '', lname: '', email: '', uname: '', pass: '', cpass: '' }
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

    // Rendering Signup Page with React Bootstrap

    render() {

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
                                    <Card className="card2 border-0 px-3 py-5">

                                        <Form.Row>
                                            <h5>Register</h5>
                                        </Form.Row>
                                        <hr />
                                        <Form onSubmit={this.onUserSubmit}>
                                            <Row className=" mb-2">
                                                <Col>
                                                    <Form.Label className="mb-1">
                                                        <h6 className="mb-1 text-sm">First Name</h6>
                                                    </Form.Label>

                                                    <Form.Control type="text" className="" id="exampleInputFname" aria-describedby="emailHelp" placeholder="Enter your first name" name="fname" onChange={this.onChangeUser} required />

                                                    <small id="emailHelp" className="form-text text-danger font-italic mb-1">{this.state.errors.fname}</small>
                                                </Col>
                                                <Col>
                                                    <Form.Label className="mb-1">
                                                        <h6 className="mb-1 text-sm">Last Name</h6>
                                                    </Form.Label>

                                                    <Form.Control type="text" id="exampleInputLname" aria-describedby="emailHelp" placeholder="Enter your last name" name="lname" onChange={this.onChangeUser} required />

                                                    <small id="emailHelp" className="form-text text-danger font-italic">{this.state.errors.lname}</small>
                                                </Col>
                                            </Row>

                                            <Row className="mb-2">
                                                <Col>
                                                    <Form.Label className="mb-1">
                                                        <h6 className="mb-1 text-sm">Email Address</h6>
                                                    </Form.Label>

                                                    <Form.Control type="email" name="email" placeholder="Enter a valid email address" onChange={this.onChangeUser} required />

                                                    <small id="emailHelp" className="form-text text-danger font-italic">{this.state.errors.email}</small>
                                                </Col>
                                                <Col>
                                                    <Form.Label className="mb-1">
                                                        <h6 className="mb-1 text-sm">User Name</h6>
                                                    </Form.Label>

                                                    <Form.Control type="text" id="exampleInputUsername" aria-describedby="emailHelp" placeholder="Set User name" name="uname" onChange={this.onChangeUser} required />

                                                    <small id="emailHelp" className="form-text text-danger font-italic">{this.state.errors.uname}</small>
                                                </Col>
                                            </Row>

                                            <Row className="mb-1">
                                                <Col>
                                                    <Form.Label className="mb-1">
                                                        <h6 className="mb-1 text-sm">Password</h6>
                                                    </Form.Label>

                                                    <Form.Control type="password" name="pass" placeholder="Enter password" onChange={this.onChangeUser} required />

                                                    <small id="emailHelp" className="form-text text-danger font-italic">{this.state.errors.pass}</small>
                                                </Col>
                                                <Col>
                                                    <Form.Label className="mb-1">
                                                        <h6 className="mb-1 text-sm">Confirm Password</h6>
                                                    </Form.Label>

                                                    <Form.Control type="password" id="exampleInputCPassword1" placeholder="Confirm Password" name="cpass" onChange={this.onChangeUser} required />

                                                    <small id="emailHelp" className="form-text text-danger font-italic">{this.state.errors.cpass}</small>
                                                </Col>
                                            </Row>

                                            <Form.Row className="mb-3">
                                                <Col>
                                                    <div className="custom-control custom-checkbox custom-control-inline">
                                                        <input id="chk1" type="checkbox" name="chk" className="custom-control-input" required />
                                                        <label for="chk1" className="custom-control-label text-sm" >I accept the <a href="/#">Terms of Use</a> &amp; <a href="/#">Privacy Policy</a></label>
                                                    </div>

                                                </Col>
                                            </Form.Row>

                                            <Row className="mb-2">
                                                <Col>
                                                    <Button variant="primary" type="submit" className="btn-blue">Signup</Button> &nbsp;&nbsp;
                                                    <Button variant="danger" type="reset" className="btn-blue">Reset</Button>
                                                </Col>
                                            </Row>
                                        </Form>

                                        <Form.Row className="mb-4">
                                            <Col>
                                                <small className="font-weight-bold">Already have an account? <Link to="/" className="text-warning">Login</Link></small>
                                            </Col>
                                        </Form.Row>
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

export default SignupPage
// Importing required packages, components and libraries

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// Class Component with Routing

export class LogOut extends Component {

    // Class Constructor

    constructor(props) {
        super(props);

        // Checking token in local storage for login

        const token = localStorage.getItem("token")
        let loggedIn = true
        if (token == null) {
            loggedIn = false
        }
        else {
            loggedIn = true
            alert("Logged Out Successfully! Redirecting to Login Page..");
            localStorage.removeItem("token")

        }

        // Assigning State Variables

        this.state = {
            loggedIn
        }

    }

    // Rendering Log out Page

    render() {

        // If LoggedIn is false then Redirecting to the Login Page

        if (this.state.loggedIn === false) {

            return <Redirect to="/" />
        }

        return (
            <div>

            </div>
        )
    }
}

// Exporting Class Component

export default LogOut

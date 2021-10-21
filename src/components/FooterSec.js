// Importing required packages, components and libraries

import React, { Component } from 'react'

// Class Component

export class FooterSec extends Component {

    // Rendering Footer Section

    render() {
        return (
            <>
                <footer className="text-right" style={{ backgroundColor: '#343a40', height: '50px', padding: '10px', color: 'white' }}>
                    <small className="mr-5">Copyright &copy; 2021. All rights reserved.</small>
                </footer>
            </>
        )
    }
}

export default FooterSec

//Importing required packages, components and libraries

import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'

// Functional Component with Routing

function NavBar() {

    // Rendering Navigation Bar with React Bootstrap

    return (
        <>
            <Navbar sticky="top" bg="dark" variant="dark">
                <Navbar.Brand href="#home">ToDoLoop</Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link href="/home" className="text-primary">Home</Nav.Link>
                    <Nav.Link href="/logout" className="text-danger" >Logout</Nav.Link>
                </Nav>
            </Navbar>
        </>
    )
}

export default NavBar

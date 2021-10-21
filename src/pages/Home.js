// Importing required packages, components and libraries

import React, { Component } from 'react';
import { v1 as uuid } from "uuid";
import NavBar from '../components/NavBar';
import ToDoLayout from '../components/ToDoLayout';
import ToDoUpDel from '../components/ToDoUpDel';
import FooterSec from '../components/FooterSec';
import { Container, Jumbotron } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

// Class Component with Routing

export class Home extends Component {

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
            items: [{ id: 1, title: "Wake Up @ 5am", descript: "Do Exercise Daily", priority: "5 - Highest Priority" }],
            id: uuid(),
            item: "",
            desc: "",
            prio: "",
            srNo: 0,
            editItem: false,
            loggedIn
        };
    }

    // Handling onChange Events

    onChangeUser = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    // Handling onSubmit Event

    handleSubmit = (event) => {
        event.preventDefault();
        const newItem = {
            id: this.state.id,
            title: this.state.item,
            descript: this.state.desc,
            priority: this.state.prio
        }
        const updatedItems = [...this.state.items, newItem]
        this.setState({
            items: updatedItems,
            item: "",
            desc: "",
            prio: "",
            id: uuid(),
            editItem: false
        }, () => console.log(this.state))
        event.target.reset();
    }

    // Deleting Completed Tasks

    handleDelete = (id) => {
        const filteredItems = this.state.items.filter(item => item.id !== id)
        this.setState({
            items: filteredItems
        })
    }

    // Editing Tasks

    handleEdit = (id) => {
        const filteredItems = this.state.items.filter(item => item.id !== id)
        const selectedItem = this.state.items.find(item => item.id === id)
        this.setState({
            items: filteredItems,
            item: selectedItem.title,
            desc: selectedItem.descript,
            id: id,
            editItem: true
        })
    }

    // Rendering Dashboard and Components with Props

    render() {

        // If LoggedIn is false then Redirecting to the Login Page

        if (this.state.loggedIn === false) {
            return <Redirect to="/" />
        }

        // Returning Layout with React Bootstrap

        return (
            <>

                {/* Calling Navbar */}

                <NavBar />

                {/* Rendering todo List with different components */}

                <section style={{ backgroundColor: '#343a40' }}>
                    <Container fluid className="px-5">
                        <section className="p-3  bg-warning">
                            <div>
                                <center>
                                    <h1 className="mb-2">TO DO LIST!</h1>
                                </center>
                            </div>

                            <Jumbotron className="text-center" style={{ marginLeft: '20px', marginRight: '20px' }}>
                                <br />
                                <div>
                                    <ToDoLayout
                                        item={this.state.item}
                                        desc={this.state.desc}
                                        srNo={this.state.srNo}
                                        handleChange={this.onChangeUser}
                                        handleSubmit={this.handleSubmit}
                                        editItem={this.state.editItem}
                                    />
                                </div>
                                <hr /> <br />
                                <h3 style={{ textAlign: 'left' }}>RECENT TASKS</h3>
                                <div>
                                    <ToDoUpDel
                                        items={this.state.items}
                                        handleDelete={this.handleDelete}
                                        handleEdit={this.handleEdit}
                                    />
                                </div>
                            </Jumbotron>

                        </section>
                    </Container>
                </section>

                {/* Calling Footer Section */}

                <FooterSec />
            </>
        )
    }
}

// Exporting Class Component

export default Home

// Importing required packages, components and libraries

import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';

// Class Component with Props

export class ToDoUpDel extends Component {

    // Rendering Table of Todo List with React Bootstrap

    render() {
        const { items, handleDelete, handleEdit } = this.props;
        return (
            <>
                <Table striped hover variant="dark">
                    <thead className="text-center">
                        <tr>
                            <th>Sr. No.</th>
                            <th>ToDo Tasks</th>
                            <th>Description</th>
                            <th>Priority</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{item.title}</td>
                                    <td>{item.descript}</td>
                                    <td>{item.priority}</td>
                                    <td>
                                        <Button variant="warning" onClick={() =>
                                            handleEdit(item.id)}><i className="fa fa-edit"></i> Update
                                        </Button> &nbsp;
                                        <Button variant="danger" onClick={() =>
                                            handleDelete(item.id)}><i className="fa fa-trash"></i> Delete
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </Table>
            </>
        )
    }
}

export default ToDoUpDel

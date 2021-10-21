// Importing required packages, components and libraries

import React, { Component } from 'react'
import { Button, Col, Form } from 'react-bootstrap';

// Class Component with Props

export class ToDoLayout extends Component {

    // Rendering Layout of Todo List with React Bootstrap

    render() {
        const { item, desc, handleChange, handleSubmit, editItem } = this.props;
        return (
            <>
                <section>
                    <h6 className="display-4">What's in your mind ?</h6>
                    <br />
                    <Form onSubmit={handleSubmit}>
                        <Form.Row>
                            <Col md={4}>
                                <Form.Control type="text" className="form-control-lg" placeholder="What to do ?" name="item" value={item} onChange={handleChange} required />
                            </Col>
                            <Col md={5}>
                                <Form.Control as="textarea" className="form-control-lg" rows={1} placeholder="Explain it in short !" name="desc" value={desc} onChange={handleChange} required />
                            </Col>
                            <Col md={3}>
                                <Form.Control as="select" id="gen" size="lg" name="prio" defaultValue={""} onChange={handleChange} required>
                                    <option value="" disabled>Select your priority</option>
                                    <option value="5 - Highest Priority">5 - Highest Priority</option>
                                    <option value="4 - High Priority">4 - High Priority</option>
                                    <option value="3 - Average Priority">3 - Average Priority</option>
                                    <option value="2 - Low Priority">2 - Low Priority</option>
                                    <option value="1 - Lowest Priority">1 - Lowest Priority</option>
                                </Form.Control>
                            </Col>
                        </Form.Row>
                        <br />
                        <div>
                            <Button type="submit" disabled={item ? false : true} className={editItem ? "btn btn-success btn-lg btn-block" : "btn btn-primary btn-lg btn-block"}>
                                {editItem ? "UPDATE IT !" : "ADD IT !"}
                            </Button>
                        </div>
                    </Form>
                </section>
            </>
        )
    }
}

export default ToDoLayout

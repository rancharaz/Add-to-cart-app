import React, { useState, useEffect } from 'react'
import { CartState } from '../../Context/Context'
import { Button, Row, Col, ListGroup, Form, Image } from 'react-bootstrap'
import Rating from '../Rating'
import { AiFillDelete } from 'react-icons/ai'

const Card = () => {

    const { state: { cart }, dispatch } = CartState()
    const [total, setTotal] = useState();

    useEffect(() => {

        setTotal(cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0))

    }, [cart])



    return (
        <div className="home ">
            <div className="productContainer">
                <ListGroup>
                    {
                        cart.map(cart => {
                            return (
                                <ListGroup.Item key={cart.id}>
                                    <Row>
                                        <Col md={2} >
                                            <Image src={cart.image} alt={cart.name} fluid rounded />
                                        </Col>
                                        <Col md={2}>
                                            <span>{cart.name}</span>
                                        </Col>
                                        <Col md={2}>
                                            <span>₨ {cart.price}</span>
                                        </Col>
                                        <Col md={2}>
                                            <Rating>{cart.ratings}</Rating>
                                        </Col>
                                        <Col md={2}>
                                            <Form.Control
                                                as="select"
                                                value={cart.qty}
                                                onChange={(e) =>
                                                    dispatch({
                                                        type: "CHANGE_CART_QTY",
                                                        payload: {
                                                            id: cart.id,
                                                            qty: e.target.value,
                                                        },
                                                    })
                                                }
                                            >
                                                {[...Array(cart.inStock).keys()].map((x) => (
                                                    <option key={x + 1}>{x + 1}</option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                            <AiFillDelete
                                                fontSize="20px"
                                                style={{ cursor: "pointer" }}
                                                onClick={() =>
                                                    dispatch({
                                                        type: "REMOVE_FROM_CART",
                                                        payload: cart,
                                                    })
                                                }
                                            />
                                        </Col>

                                    </Row>

                                </ListGroup.Item>

                            )
                        })
                    }
                </ListGroup>
                <div className="filters summary">
                    <span className='title'>Subtotal ({cart.length}) items</span>
                    <span style={{ fontWeight: 700, fontSize: 20 }}> Total: ₨ {total} </span>
                    <Button type="button" disabled={cart.length === 0}>
                        Proceed to checkout
                    </Button>
                </div>

            </div>
        </div>
    )
}

export default Card
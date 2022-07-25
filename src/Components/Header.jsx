import React from 'react'
import { Navbar, Container, FormControl, Dropdown, Nav, Badge, Button } from 'react-bootstrap'
import { FaShoppingCart } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { CartState } from '../Context/Context'



const Header = () => {

    const { state: { cart }, dispatch, productDispatch, } = CartState()

    return (
        <Navbar bg='dark' varant='dark' style={{ height: 80 }}>
            <Container>
                <Navbar.Brand>
                    <Link to="">Shopping Card</Link>
                </Navbar.Brand>
                <Navbar.Text className='search'>
                    <FormControl style={{ width: 500 }} placeholder="Search a product" className="m-auto"
                        onChange={(e) => {
                            productDispatch({
                                type: "FILTER_BY_SEARCH",
                                payload: e.target.value,
                            });
                        }}

                    />
                </Navbar.Text>

                <Nav>
                    <Dropdown  >
                        <Dropdown.Toggle variant="success">
                            <FaShoppingCart color="white" fontSize="25px" />

                            <Badge className='bg-transparent'> {cart.length}</Badge>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='dropDown' style={{ minWidth: 260 }}>

                            {
                                cart.length > 0 ? (
                                    <>
                                        {cart.map((product) => (
                                            <span className="cartitem" key={product.id}>
                                                <img
                                                    src={product.image}
                                                    className="cartItemImg"
                                                    alt={product.name}
                                                />
                                                <div className="cartItemDetail">
                                                    <span>{product.name}</span>
                                                    <span>₨ {product.price.split(".")[0]}</span>
                                                </div>
                                                <AiFillDelete
                                                    fontSize="20px"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() =>
                                                        dispatch({
                                                            type: "REMOVE_FROM_CART",
                                                            payload: product,
                                                        })
                                                    }
                                                />
                                            </span>
                                        ))}
                                        <Link to="/card">
                                            <Button style={{ width: "95%", margin: "0 10px" }}>
                                                Go To Cart
                                            </Button>
                                        </Link>
                                    </>
                                ) : (<span style={{ padding: 10 }}>The card is empty</span>)
                            }

                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Container>
        </Navbar >
    )
}

export default Header
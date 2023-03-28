import React from 'react'
import { Nav, Container, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <NavLink to='/'>
                        <Navbar.Brand className='fs-4 fw-semibold'><img src="shopping.png" className='me-1' height='35px' alt="" /> RDShop</Navbar.Brand>
                    </NavLink>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default Header
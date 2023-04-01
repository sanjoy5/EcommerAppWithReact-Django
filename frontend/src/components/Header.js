import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Nav, Container, Navbar, NavDropdown } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import { domain } from '../env'

const Header = () => {
    const [categories, setCategories] = useState(null)

    useEffect(() => {
        const getCategories = async () => {
            await axios({
                method: 'get',
                url: `${domain}/api/category/`
            }).then(res => setCategories(res.data))
        }
        getCategories()
    }, [])

    return (
        <>
            <Navbar bg="primary" variant="dark" className='py-3'>
                <Container>
                    <NavLink to='/'>
                        <Navbar.Brand className='fs-4 fw-semibold'><img src="shopping.png" className='me-1' height='35px' alt="" /> RDShop</Navbar.Brand>
                    </NavLink>
                    <Nav className="me-auto menu">
                        <NavDropdown title="ALL CATEGORIES" id="basic-nav-dropdown">
                            {
                                categories !== null &&
                                categories?.map((category, i) => <Link className='dropdown-item' to={`/category/${category.id}`} key={i}>{category.title}</Link>)
                            }

                        </NavDropdown>
                    </Nav>


                    <Link to="">
                        <img src="user.png" className='me-2' height="45px" width="45px" style={{ borderRadius: "50%" }} alt="" />
                    </Link>

                    <Link to="/login" className="text-white me-3">Login</Link>
                    <Link to="/logout" className="text-white me-3">Logout</Link>
                    <Link to="/register" className="text-white me-3">Register</Link>
                    <Link to="/profile" className="text-white me-3">Profile</Link>

                </Container>
            </Navbar>

        </>
    )
}

export default Header
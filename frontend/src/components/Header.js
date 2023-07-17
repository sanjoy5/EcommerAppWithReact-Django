import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { domain } from '../env'
import { useGlobalState } from '../state/provider'

const Header = () => {


    const [{ profile, cart_uncomplete }, dispatch] = useGlobalState()
    // console.log('Profile ', profile);
    // console.log('cart_uncomplete ', cart_uncomplete);



    let cart_product_length = 0;
    if (cart_uncomplete) {
        if (cart_uncomplete !== null) {
            cart_product_length = cart_uncomplete?.cartproducts?.length
        } else {
            cart_product_length = 0
        }
    }



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


    const logout = () => {
        localStorage.removeItem('token')
        dispatch({
            type: "ADD_PROFILE",
            profile: null
        })
        window.location.href = "/login"
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-primary">
                <div className="container">
                    <Link to='/' className='navbar-brand fs-4 fw-semibold text-white'><img src="https://i.ibb.co/c1sRkdN/shopping.png" className='me-1' height='35px' alt="" /> RDShop</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle text-white" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    ALL CATEGORIES
                                </Link>
                                <ul className="dropdown-menu">
                                    {
                                        categories !== null &&
                                        categories?.map((category, i) =>
                                            <li key={i}><Link className="dropdown-item" to={`/category/${category.id}`}>{category.title}</Link></li>
                                        )}
                                </ul>
                            </li>
                        </ul>
                        <ul className="navbar-nav mb-2 mb-lg-0 d-flex align-items-start align-items-md-center">

                            {
                                profile !== null ?
                                    <>
                                        {/* <li className="nav-item">
                                            <Link to="/profile">
                                                <img src={`${domain}${profile?.image}`} className='me-1' height="45px" width="45px" style={{ borderRadius: "50%" }} alt="" />
                                            </Link>
                                        </li> */}
                                        <li className="nav-item dropdown">
                                            <Link className="nav-link dropdown-toggle text-white" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {
                                                    profile?.prouser?.first_name && profile?.prouser?.last_name !== '' ? `${profile?.prouser?.first_name} ${profile?.prouser?.last_name}` : `${profile?.prouser?.username}`
                                                }

                                            </Link>


                                            <ul className="dropdown-menu">

                                                <li className="nav-item">
                                                    <Link className="nav-link" to="/profile">Profile</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link onClick={logout} className="nav-link">Logout</Link>
                                                </li>

                                            </ul>
                                        </li>

                                        <li className="nav-item  position-relative">
                                            <Link className="nav-link text-white" to="/cart">
                                                <FiShoppingCart className="fs-4" /> <span className='position-absolute top-0 px-2 py-1 bg-danger rounded-circle
                                                 lh-1'>
                                                    {cart_product_length}
                                                </span>
                                            </Link>
                                        </li>

                                    </> :
                                    <>
                                        <li className="nav-item">
                                            <Link to="/login">
                                                <img src="https://i.ibb.co/mHGwW1K/userprofile.png" className='me-2' height="45px" width="45px" style={{ borderRadius: "50%" }} alt="" />
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link text-white" to="/login">Login</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link text-white" to="/register">Register</Link>
                                        </li>

                                    </>
                            }



                        </ul>

                    </div>
                </div>
            </nav>

        </>
    )
}

export default Header
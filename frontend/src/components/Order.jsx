import React, { useState } from 'react'
import { useGlobalState } from '../state/provider'
import { domain, header } from '../env'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Order = () => {
    const [{ cart_uncomplete, profile }, dispatch] = useGlobalState()

    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')

    const navigate = useNavigate()

    const handleOrder = async () => {
        await axios({
            method: 'post',
            url: `${domain}/api/oldorders/`,
            headers: header,
            data: {
                "cartid": cart_uncomplete?.id,
                "address": address,
                "phone": phone,
                "email": email
            }
        }).then(res => {
            dispatch({
                type: 'PAGE_RELOAD',
                pagereload: res.data

            })
            dispatch({
                type: 'CARTPRODUCT_UNCOMPLETE',
                cart_uncomplete: null

            })
            alert('Your Order is Completed Successfully')
            navigate('/oldorders')
        })
    }

    return (
        <div className='container my-5'>

            <Link to="/cart" className="btn btn-primary mb-4">Back to Cart</Link>
            <div className="row">
                <div className="col-md-7">
                    <div className="myshadow bg-white p-5">

                        <div className="my-table">
                            <table className="table table-borderless">
                                <thead>
                                    <tr>

                                        <th scope="col">SN</th>
                                        <th scope="col">Product</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cart_uncomplete?.cartproducts?.map((item, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td className='align-middle'>{i + 1}</td>
                                                    <td>
                                                        <Link to={`/product/${item.product[0].id}`}>
                                                            <img height={60} width={60} src={`${domain}${item.product[0].image}`} alt="" />
                                                        </Link>
                                                    </td>
                                                    <td className='align-middle'>৳{item.price}</td>
                                                    <td className='align-middle'>x{item.quantity}</td>
                                                    <td className='align-middle'>{item.subtotal}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>

                        </div>
                        <hr />
                        <div className="pt-3 d-flex gap-0 gap-md-4 flex-wrap align-items-center justify-content-between">
                            <p className='fs-5 fw-bolder m-0'>Total : ${cart_uncomplete?.total}</p>
                            <p className='fs-5 fw-bolder m-0'>Shipping : Free</p>
                            <p className='fs-5 fw-bolder m-0'>Grand Total : ${cart_uncomplete?.total}</p>

                        </div>
                    </div>

                </div>
                <div className="col-md-5">


                    <div className='p-5 border rounded'>
                        <h2 className="fs-4 mb-3">Place Order</h2>
                        <div className="form-group my-3">
                            <label htmlFor="address">Address</label>
                            <input onChange={(e) => setAddress(e.target.value)} type="text" className="form-control" id="address" placeholder="Enter Address" />
                        </div>
                        <div className="form-group my-3">
                            <label htmlFor="phone">Phone</label>
                            <input onChange={(e) => setPhone(e.target.value)} type="text" className="form-control" id="phone" placeholder="Enter Number" />
                        </div>
                        <div className="form-group my-3">
                            <label htmlFor="email">Email</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="email" placeholder="Enter Email" />
                        </div>

                        <button onClick={handleOrder} className="btn btn-primary btn-lg w-100 mt-3">Order Now</button>
                    </div>


                </div>
            </div>


        </div>

    )
}

export default Order
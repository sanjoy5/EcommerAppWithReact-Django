import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { domain, header } from '../env'

const OrderDetails = () => {

    const { id } = useParams()
    const [orderDetails, setOrderDetails] = useState(null)

    useEffect(() => {
        const getOrderDetails = async () => {
            await axios({
                method: 'get',
                url: `${domain}/api/oldorders/${id}/`,
                headers: header
            }).then(res => {
                setOrderDetails(res.data['data'][0]);
                console.log(res.data['data'][0]);
            })
        }
        getOrderDetails()
    }, [])

    return (
        <div className='container my-5'>
            <div className="myshadow bg-white p-5">

                <table className="table table-borderless">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Total</th>
                            <th>Quantity</th>
                            <th>Discount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {
                                orderDetails !== null &&
                                <>
                                    <td>{orderDetails.date}</td>
                                    <td>{orderDetails.email}</td>
                                    <td>{orderDetails.phone}</td>
                                    <td>{orderDetails.total}</td>
                                    <td>{orderDetails.cartproducts.length}</td>
                                    <td>{orderDetails.discount}%</td>
                                </>
                            }
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="myshadow bg-white p-5 my-5">
                <table className="table table-borderless">
                    <thead>
                        <tr>
                            <th>SN</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orderDetails !== null &&
                            orderDetails.cartproducts?.map((pd, i) => {
                                return (
                                    <tr key={i} className=''>
                                        <td>{i + 1}</td>
                                        <td className=''>
                                            <Link to={`/product/${pd.product[0].id}`} className='d-flex cursor-pointer'>
                                                <img src={`${domain}${pd.product[0].image}`} height={60} alt="" /> <p className='ms-2 fw-medium fs-5 text-dark'>{pd.product[0].title}</p>
                                            </Link>
                                        </td>
                                        <td className=''>{pd.price}</td>
                                        <td>{pd.quantity}</td>
                                        <td>{pd.subtotal}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OrderDetails
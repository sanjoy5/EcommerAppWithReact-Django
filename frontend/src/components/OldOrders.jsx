import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { domain, header } from '../env'
import { Link } from 'react-router-dom'

const OldOrders = () => {

    const [orders, setOrders] = useState(null)

    useEffect(() => {
        const getOrders = async () => {
            await axios({
                method: 'get',
                url: `${domain}/api/oldorders/`,
                headers: header
            }).then(res => {
                setOrders(res.data)
                // console.log('Old Orders : ', res.data);

            })
        }
        getOrders()
    }, [])


    return (
        <div className='container my-5'>
            <div className="bg-white p-4 rounded myshadow">
                <h2 className="fs-3 fw-bolder text-center mb-4">Order History</h2>


                <div className="my-table">
                    <table className="table table-borderless">
                        <thead>
                            <tr>

                                <th scope="col">SN</th>
                                <th scope="col">Date</th>
                                <th scope="col">Total</th>

                                <th scope="col">Quantity</th>
                                <th scope="col">Order Status</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders?.length !== 0 ?
                                    orders?.map((order, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{order.date}</td>
                                                <td>${order.total}</td>
                                                <td>{order?.cartproducts.length}</td>
                                                <td>{order?.order_status}</td>
                                                <td><Link className='btn btn-primary' to={`/orderdetails/${order?.id}`}>Order Details</Link></td>
                                                <td><Link className='btn btn-danger' to=''>Delete Order</Link></td>
                                            </tr>
                                        )
                                    }) :
                                    <div>
                                        <h2 className="fs-4 fw-bolder">There is no old Orders.</h2>
                                        <Link to="/" className='btn btn-primary'>Coutinue Shopping</Link>
                                    </div>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default OldOrders
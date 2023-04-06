import React from 'react'
import { useGlobalState } from '../state/provider'
import { domain } from '../env';
import { FaTrashAlt } from 'react-icons/fa'
import { BiUpArrow, BiDownArrow } from 'react-icons/bi'
import { Link } from 'react-router-dom';

const Cart = () => {
    const [{ cart_uncomplete }, { }] = useGlobalState()
    console.log('cart Uncomplete : ', cart_uncomplete);

    let cart_product_length;
    if (cart_uncomplete !== null) {
        cart_product_length = cart_uncomplete?.cartproducts?.length
    } else {
        cart_product_length = 0
    }

    return (
        <div className='container my-5'>

            <div className="my-4 d-flex align-items-center justify-content-between">
                <div>
                    <Link to="/" className='btn btn-info ms-2 text-white'>Continue Shopping</Link>
                    <Link to="/oldorders" className='btn btn-success ms-2 text-white'>Old Orders</Link>
                </div>

                {
                    cart_product_length !== 0 &&
                    <Link to="" className='btn btn-danger ms-2 text-white'>Delete Cart</Link>
                }
            </div>


            {
                cart_product_length !== 0 ? (

                    <div className="row">
                        <div className="col-md-8">
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
                                                <th scope="col">Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                cart_uncomplete?.cartproducts.map((item, i) => {
                                                    return (
                                                        <tr className=''>
                                                            <td>{i + 1}</td>
                                                            <td>
                                                                <Link to={`/product/${item.product[0].id}`}>
                                                                    <img height={60} width={60} src={`${domain}${item.product[0].image}`} alt="" />
                                                                </Link>

                                                            </td>
                                                            <td className='align-middle'>{item.price}</td>
                                                            <td className='align-middle'>
                                                                <div className="flex flex-row align-items-center justify-content-center">
                                                                    <BiUpArrow className='text-success cursor-pointer' />
                                                                    <span className="mx-2 fw-bolder">{item.quantity}</span>
                                                                    <BiDownArrow className='text-warning cursor-pointer' />
                                                                </div>

                                                            </td>
                                                            <td className='align-middle'>{item.subtotal}</td>
                                                            <td className='align-middle'>

                                                                <FaTrashAlt className='text-danger cursor-pointer' />

                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }

                                        </tbody>

                                    </table>
                                </div>


                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="myshadow bg-white p-5">
                                <p className='fs-5 fw-bolder'>Total : ${cart_uncomplete?.total}</p>
                                <p className='fs-5 fw-bolder'>Shipping : Free</p>
                                <p className='fs-5 fw-bolder'>Grand Total : ${cart_uncomplete?.total}</p>
                                <Link to="/order" className='btn btn-primary'>Order now</Link>

                            </div>
                        </div>
                    </div>

                ) : (
                    <div className="myshadow bg-white p-5">
                        <h2 text-dark fs-3 fw-bolder text-center>There is no porduct in your cart...</h2>
                    </div>
                )
            }


        </div>
    )
}

export default Cart
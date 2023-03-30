import React from 'react'
import { NavLink } from 'react-router-dom';
import { domain } from '../env';

const ProductWithDomain = ({ product }) => {
    const { id, image, title, price, old_price, description } = product;
    return (
        <>
            <div className="card">
                <NavLink to={`/product/${id}`}>
                    <img src={`${domain}${image}`} alt="" className="card-img-top" />
                </NavLink>
                <div className="card-body">
                    <NavLink to={`/product/${id}`}><h5 className="card-title product_title">{title}</h5></NavLink>
                    <p className="fs-5 mb-2 fw-semibold">৳{price} <del className='text-danger'>৳{old_price}</del></p>
                    <p className="card-title">{description.slice(0, 50)}...</p>
                    <a href="" className="btn btn-primary mt-2">Add to Cart</a>
                </div>
            </div>
        </>
    )
}
export default ProductWithDomain
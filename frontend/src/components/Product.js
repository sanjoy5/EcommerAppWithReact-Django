import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { domain, header } from '../env'
import { useGlobalState } from '../state/provider';

const Product = ({ product }) => {
    const [{ profile }, dispatch] = useGlobalState()
    const navigate = useNavigate()
    const { id, image, title, price, old_price, description } = product;


    const addtocart = async (id) => {
        profile !== null ?
            await axios({
                method: 'post',
                url: `${domain}/api/addtocart/`,
                headers: header,
                data: { "id": id }
            }).then(response => {
                console.log(response.data, '$$$ add to Cart $$$');
                dispatch({
                    type: "PAGE_RELOAD",
                    pagereload: response.data
                })
            })
            :
            navigate('/login')

    }

    return (
        <>
            <div className="card">
                <NavLink to={`/product/${id}`}>
                    <img src={image} alt="" className="card-img-top" />
                </NavLink>
                <div className="card-body">
                    <NavLink to={`/product/${id}`}><h5 className="card-title product_title">{title}</h5></NavLink>
                    <p className="fs-5 mb-2 fw-semibold">৳{price} <del className='text-danger'>৳{old_price}</del></p>
                    <p className="card-title">{description.slice(0, 50)}...</p>
                    <button onClick={() => addtocart(id)} className="btn btn-primary mt-2">Add to Cart</button>
                </div>
            </div>
        </>
    )
}

export default Product
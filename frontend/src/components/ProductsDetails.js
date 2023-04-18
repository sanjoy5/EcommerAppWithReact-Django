import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { domain, header } from '../env'
import ProductWithDomain from './ProductWithDomain'
import { useGlobalState } from '../state/provider'

const ProductsDetails = () => {

    const [{ profile }, dispatch] = useGlobalState()
    const navigate = useNavigate()

    const { id } = useParams()
    const [product, setProdcut] = useState(null)
    const [categoryProducts, setCategoryProducts] = useState(null)
    useEffect(() => {
        const getData = async () => {
            await axios({
                method: 'get',
                url: `${domain}/api/product/${id}/`
            }).then(res => {
                setProdcut(res.data)
                getCategroy(res.data?.category['id'])
            })
        }
        getData()
    }, [id])




    const getCategroy = async (cat_id) => {
        await axios({
            method: 'get',
            url: `${domain}/api/category/${cat_id}/`
        })
            .then(res => setCategoryProducts(res.data))
    }




    const addtocart = async (id) => {
        profile !== null ?
            await axios({
                method: 'post',
                url: `${domain}/api/addtocart/`,
                headers: header,
                data: { "id": id }
            }).then(response => {
                // console.log(response.data, '$$$ add to Cart $$$');
                dispatch({
                    type: "PAGE_RELOAD",
                    pagereload: response.data
                })
            })
            :
            navigate('/login')

    }


    return (
        <div className='container my-5'>
            <div className="row">
                {
                    product !== null && (
                        <>
                            <div className="col-md-6 text-center">
                                <img className='image_dtls' src={product.image} width="100%" alt="" />
                            </div>
                            <div className="col-md-6">
                                <p className="fs-5 text-dark"><Link to="/">Home</Link> / {product.category.title}</p>
                                <h2 className="fs-2">{product.title}</h2>
                                <p className="fs-4 fw-semibold">৳{product.price} <del className='text-danger'>৳{product.old_price}</del></p>

                                <select className='outline-none py-2 px-3 rounded mb-2' style={{ width: '150px' }}>
                                    <option value="select size">Select Size</option>
                                    <option value="s">S</option>
                                    <option value="m">M</option>
                                    <option value="l">L</option>
                                </select>

                                <div className="my-2">
                                    <button onClick={() => addtocart(product.id)} className="btn btn-primary btn-lg ms-2">Add to Cart</button>
                                </div>

                                <h2 className="fs-4 fw-semibold mt-3 mb-2">Product Details</h2>
                                <p className="">{product.description}</p>
                            </div>
                        </>
                    )
                }

            </div>

            <div className="my-5 row">
                <h2 className="fs-4 fw-semibold mb-4 mt-3">Related Products</h2>
                {
                    categoryProducts !== null &&
                    categoryProducts[0]?.category_products?.map((product, i) => {
                        return (

                            <div key={i} className="col-md-3">
                                <ProductWithDomain product={product} />
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default ProductsDetails
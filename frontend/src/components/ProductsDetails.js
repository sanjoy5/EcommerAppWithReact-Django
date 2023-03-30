import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { domain } from '../env'
import ProductWithDomain from './ProductWithDomain'

const ProductsDetails = () => {
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

                                <div className="d-flex align-items-center my-2">
                                    <input type="number" style={{ width: '80px' }} min="1" className="py-2 outline-none px-3" />
                                    <button className="btn btn-primary btn-lg ms-2">Add to Cart</button>
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
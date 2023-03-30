import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { domain } from '../env'
import ProductWithDomain from './ProductWithDomain'

const CategoryProducts = () => {

    const { id } = useParams()
    const [categoryProducts, setCategoryProducts] = useState([])
    console.log('cat : ', categoryProducts);

    useEffect(() => {
        const getCategroyProducts = async () => {
            await axios({
                method: 'get',
                url: `${domain}/api/category/${id}/`
            }).then(res => setCategoryProducts(res.data[0]))
        }
        getCategroyProducts()
    }, [id])

    return (
        <>

            <div className="container">
                <div className="my-5 row">
                    <h2 className="fs-4 fw-semibold mb-4 mt-3">Category : {categoryProducts?.title}</h2>
                    {
                        categoryProducts?.category_products?.map((product, i) => {
                            return (

                                <div key={i} className="col-md-3">
                                    <ProductWithDomain product={product} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </>
    )
}

export default CategoryProducts
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { domain } from '../env'
import Product from './Product'
import HeroSection from './HeroSection'


const HomePage = () => {

    const [products, setProducts] = useState(null)

    useEffect(() => {
        const getData = async () => {
            axios({
                method: 'get',
                url: `${domain}/api/products/`
            }).then(res => setProducts(res.data))
        }
        getData()
    }, [])

    return (
        <>

            <HeroSection />


            <div className='container my-4'>

                <div className="row">
                    {
                        products?.results.map((product, i) => {
                            return (
                                <div className="col-sm-6 col-md-4 col-lg-3 g-4">
                                    <Product product={product} />
                                </div>
                            )
                        })
                    }

                </div>

            </div>


        </>
    )
}

export default HomePage
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

    const nextProducts = async () => {
        await axios({
            method: 'get',
            url: products?.next
        }).then(res => setProducts(res.data))
    }

    const prevProducts = async () => {
        await axios({
            method: 'get',
            url: products?.previous
        }).then(res => setProducts(res.data))
    }

    return (
        <>

            <HeroSection />


            <div className='container my-4'>

                <div className="row">
                    {
                        products?.results.map((product, i) => {
                            return (
                                <div key={i} className="col-sm-6 col-md-4 col-lg-3 g-4">
                                    <Product product={product} />
                                </div>
                            )
                        })
                    }

                </div>

                <div className="homepage__pagination d-flex justify-content-center my-4">
                    <div className="me-2">
                        {
                            products?.previous !== null ? (<button onClick={prevProducts} className="btn btn-danger">Previous</button>) : (<button className="btn btn-danger" disabled>Previous</button>)
                        }

                    </div>
                    <div className="">
                        {
                            products?.next !== null ? (<button onClick={nextProducts} className="btn btn-success">Next</button>) : (<button className="btn btn-success" disabled>Next</button>)
                        }

                    </div>
                </div>

            </div>


        </>
    )
}

export default HomePage
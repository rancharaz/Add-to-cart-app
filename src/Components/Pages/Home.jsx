import React from 'react'
import { CartState } from '../../Context/Context'
import Filters from '../Filters';
import SingleProduct from '../SingleProduct';
import './style.css'
const Home = () => {

    const { state: { products } } = CartState();

    /*   console.log(products) */


    return (
        <div className='home'>
            <Filters />
            <div className="productContainer">
                {
                    products.map(product => {
                        return (
                            <div key={product.id}>
                                <SingleProduct product={product} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home
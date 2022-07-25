import React from 'react'
import { CartState } from '../../Context/Context'
import Filters from '../Filters';
import SingleProduct from '../SingleProduct';
import './style.css'
const Home = () => {

    const { state: { products },
        productState: { byStock, byFastDelivery, sort, byRating, searchQuery } } = CartState();

    const transformProducts = () => {

        let sortedProducts = products;

        if (sort) {
            sortedProducts = sortedProducts.sort((a, b) =>
                sort === "lowToHigh" ? a.price - b.price : b.price - a.price
            );
        }

        if (!byStock) {
            sortedProducts = sortedProducts.filter((prod) => prod.inStock);
        }

        if (byFastDelivery) {
            sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
        }

        if (byRating) {
            sortedProducts = sortedProducts.filter(
                (prod) => prod.ratings >= byRating
            );
        }

        if (searchQuery) {
            sortedProducts = sortedProducts.filter((prod) =>
                prod.name.toLowerCase().includes(searchQuery)
            );
        }

        return sortedProducts
    }
    /*   console.log(products) */


    return (
        <div className='home'>
            <Filters />
            <div className="productContainer">
                {
                    transformProducts().map(product => {
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
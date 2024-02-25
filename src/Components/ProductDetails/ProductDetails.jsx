import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import $ from 'jquery'
import imgLoading from '../../assets/images/freshcart-logo.svg'
import { BallTriangle } from 'react-loader-spinner'
import { CartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';



export default function ProductDetails() {
    let { AddCart, setCartCount } = useContext(CartContext)

    async function addToCart(id) {

        let { data } = await AddCart(id)
        if (data.status === 'success') {
            toast.success(data.message)
            setCartCount(data.numOfCartItems)
        }
        console.log(data.data);
    }

    let { id } = useParams()
    let [product, setProductDetails] = useState(null)


    useEffect(() => {
        getProductDetails();
    }, [])


    async function getProductDetails() {
        $('.loading').fadeIn(0)
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        setProductDetails(data.data)
        $('.loading').fadeOut(1000)

    }

    return (
        <>

            <div className="loading position-fixed top-0 end-0 start-0 bottom-0">

                <img className='w-25' src={imgLoading} alt="" />
                <BallTriangle
                    height={150}
                    width={150}
                    radius={5}
                    color="black"
                    ariaLabel="ball-triangle-loading"
                    wrapperClass={{}}
                    wrapperStyle=""
                    visible={true}
                />
            </div>

            <Helmet>
                <title>ProductDetails</title>
                <meta name="description" content="ProductDetails page" />
            </Helmet>
            {product != null ? <div className='row align-items-center my-5'>
                <div className="col-md-3">
                    <OwlCarousel className='owl-theme' loop items={1} >
                        {product.images.map((image) => {
                            return <div key={image._id} className="item">
                                <img className='w-100' src={image} alt="" />
                            </div>
                        })}
                    </OwlCarousel>

                </div>
                <div className="col-md-9">
                    <h2>{product.title}</h2>
                    <p className='text-muted font-sm'>{product.description}</p>
                    <p className='text-main'>{product.category.name}</p>
                    <div className="d-flex justify-content-between my-5">
                        <span>{product.price}EGP</span>
                        <span><i className='fas fa-star rating-color mx-1'></i>{product.ratingsAverage}</span>
                    </div>
                    <button onClick={() => addToCart(product._id)} className='btn bg-main text-white btn-sm mt-2 w-100'>Add Cart</button>
                </div>
            </div> : ''}

        </>
    )
}

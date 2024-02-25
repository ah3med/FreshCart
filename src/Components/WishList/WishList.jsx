import React, { useContext, useEffect, useState } from 'react'
import { WishListContext } from '../Context/WishListContext'
import toast from 'react-hot-toast';
import { CartContext } from './../Context/CartContext';
import $ from 'jquery'
import { BallTriangle } from 'react-loader-spinner'
import { Link } from 'react-router-dom';
import imgLoading from '../../assets/images/freshcart-logo.svg'
import { Helmet } from 'react-helmet';


export default function WishList() {
  let { getAllWishList, removeWishList, wishListCount } = useContext(WishListContext)
  let { AddCart, setCartCount } = useContext(CartContext)
  let [wishlistDetails, setWishlistDetails] = useState(null);

  useEffect(() => {
    getAllWishListData()
  }, [])

  async function addToCart(id) {

    let { data } = await AddCart(id)
    if (data.status === 'success') {
      setCartCount(data.numOfCartItems)
      toast.success(data.message)
    }
    console.log(data.data);
  }

  async function deleteOneWishList(id) {
    let result = await removeWishList(id)
    let { data } = result.data
    getAllWishListData(data)
    toast.success(result.data.message)
    console.log(result.data);
  }

  async function getAllWishListData() {
    $('.loading').fadeIn(0)
    let response = await getAllWishList()
    console.log(response);
    if (response?.data.status === 'success') {
      setWishlistDetails(response?.data.data)
      $('.loading').fadeOut(1000)
    }
    return wishlistDetails;
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
        <title>Wishlist</title>
        <meta name="description" content="Wishlist Page" />
      </Helmet>
      {wishlistDetails != null ? <div className="bg-light p-4">
        <h2 className='text-main'>My WishList</h2>
        <p className='text-muted pb-4'>You Have <span className='fw-bolder text-dark'>{wishListCount}</span> items in Shopping Cart</p>
        <div className="row g-4">
          {wishlistDetails.map((product) => {
            return (
              <div className="col-md-3" key={product._id}>
                <div className="product cursor-pointer py-3 px-2">
                  <img className='w-100' src={product.imageCover} alt={product.title} />
                  <div className='d-flex justify-content-between p-2'>
                    <h3 className='h6'>{product.title}</h3>
                    <span>
                      <i onClick={() => deleteOneWishList(product._id)} className="unheart-wishlist heartIcon fa-solid fa-xl fa-heart-crack"></i>
                    </span>
                  </div>


                  <div className="d-flex justify-content-between ">
                    <span>{product.price}EGP</span>
                    <span><i className='fas fa-star rating-color mx-1'></i>{product.ratingsAverage}</span>
                  </div>

                  <button onClick={() => addToCart(product._id)} className='btn bg-main text-white btn-sm mt-2 w-100'>Add Cart</button>
                </div>

              </div>
            )
          })}
        </div>
      </div>
        :
        (<div className='d-flex align-items-center flex-column p-3'>
          <h3>Shopping Cart</h3><br />
          <div className='d-flex justify-content-start flex-column align-items-center'>
            <h6 className='text-muted'>Your cart is currently empty</h6>
            <Link className='pt-3  back-shopping' to="/products">
              <i className="pe-2 fa-solid fa-arrow-left-long"></i>
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>)
      }
    </>
  )
}

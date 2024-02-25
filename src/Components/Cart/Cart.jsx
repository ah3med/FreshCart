import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../Context/CartContext'
import $ from 'jquery'
import { BallTriangle } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import imgLoading from '../../assets/images/freshcart-logo.svg'
import { Helmet } from 'react-helmet'




export default function Cart() {
  let { getAllCartData, deleteProduct, updateProductQuantitiy, deleteAllProducts, setCartCount, cartCount } = useContext(CartContext)
  let [cartData, setCartData] = useState([])
  let [errorMsg, setErrorMsg] = useState('')


  useEffect(() => {
    getAllData()
  }, [])

  async function DeleteProduct(id) {
    let { data } = await deleteProduct(id)
    setCartData(data.data)
    setCartCount(data.numOfCartItems)
    console.log(data);
  }
  async function getAllData() {
    $('.loading').fadeIn(0)
    let result = await getAllCartData()
    if (result.status === 'success') {
      let { data } = result.response
      setCartData(data.data)
      setCartCount(data.numOfCartItems);
      setErrorMsg('')
    } else {
      setCartData([])
      setErrorMsg(<div className='d-flex align-items-center flex-column p-3'>
        <h3>Shopping Cart</h3><br />
        <div className='d-flex justify-content-start flex-column align-items-center'>
          <h6 className='text-muted'>Your cart is currently empty</h6>
          <Link className='pt-3  back-shopping' to="/products">
            <i className="pe-2 fa-solid fa-arrow-left-long"></i>
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>)
      setCartCount(0)
    }

    $('.loading').fadeOut(1000);


  }

  async function updateProduct(id, count) {
    let { data } = await updateProductQuantitiy(id, count)
    console.log(data);
    setCartData(data.data);
  }

  async function clearProducts() {
    let { data } = await deleteAllProducts()
    console.log(data);
    setCartData([])
    setCartCount(0)
    setErrorMsg(<div className='d-flex align-items-center flex-column p-3'>
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
        <title>Cart</title>
        <meta name="description" content="Cart Page" />
      </Helmet>

      {errorMsg.length === 0 ? <div className='position-relative bg-light p-4'>
        <Link className='back-shopping position-absolute pe-4 pt-4 top-0 end-0 d-flex align-items-center' to="/products">
          <i className="pe-2 fa-solid fa-arrow-left-long"></i>
          <span>Continue Shopping</span>
        </Link>
        <h2 className='text-main mb-1 mt-0'>Shopping Cart</h2>
        <p className='text-muted pb-2'>You Have <span className='fw-bolder text-dark'>{cartCount}</span> items in Shopping Cart</p>
        {cartData?.products?.map((el) => {
          return <div key={el._id} className='row p-2 border-bottom justify-content-between align-items-center'>

            <div className="col-md-6">
              <div className="row align-items-center">
                <div className="col-md-3">
                  <img className='w-100' src={el.product.imageCover} alt="" />
                </div>
                <div className="col-md-9 py-3 ps-4">
                  <h6>{el.product.title}</h6>
                  <h6 className='text-main'>{el.price} EGP</h6>
                  <span onClick={() => DeleteProduct(el.product._id)} className='cursor-pointer'><i className='fa-solid fa-trash-can text-danger py-3'></i>Remove</span>
                </div>
              </div>
            </div>
            <div className="col-md-2 ">
              <span onClick={() => updateProduct(el.product._id, el.count + 1)} className='btn btn-success btn-sm'>+</span>
              <span className='px-2'>{el.count}</span>
              <span onClick={() => updateProduct(el.product._id, el.count - 1)} className='btn btn-danger btn-sm'>-</span>
            </div>
          </div>
        })}
        <div className="row  justify-content-between">
          <div className="col-md-4">
            <button onClick={() => clearProducts()} className='btn btn-outline-danger btn-sm my-2'>Clear Cart</button>
          </div>
          <div className="col-md-3">
            <div className="row align-items-center pt-3">
              <div className="col-6">
                <h6>Sub total</h6>
              </div>
              <div className="col-6">
                <h6 className='fw-bolder ps-4'>{cartData?.totalCartPrice} EGP</h6>
              </div>
            </div>
            <p className='taxes'>Taxes and shipping calculated at checkout</p>
            <Link to={'/CheckOut/' + cartData?._id} className='btn btn-success btn-sm my-2 w-100'>CheckOut</Link>
            <Link className='back-shopping d-flex align-items-center' to="/products">
              <i className="pe-2 fa-solid fa-arrow-left-long"></i>
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

      </div>
        :
        <h1>{errorMsg}</h1>
      }



    </>

  )
}

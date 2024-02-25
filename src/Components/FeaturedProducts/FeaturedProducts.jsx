import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import $ from 'jquery'
import { BallTriangle } from 'react-loader-spinner'
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import { WishListContext } from '../Context/WishListContext';
import toast from 'react-hot-toast';
import imgLoading from '../../assets/images/freshcart-logo.svg'
import { useQuery } from 'react-query';




export default function FeaturedProducts() {
    let [page, setPage] = useState(1);
    const { AddCart, setCartCount } = useContext(CartContext)
    const { addWishList, wishlistItem, removeWishList, getAllWishList } = useContext(WishListContext)

    // useEffect(() => {
    //     getAllWishList()
    // }, [])

    let { data, isPreviousData, isLoading } = useQuery({
        queryKey: ["/products", page],
        queryFn: () => getFeaturedProducts(page),
        keepPreviousData: true,
    });



    async function addToWishList(id) {

        let { data } = await addWishList(id)
        if (data.status === 'success') {
            toast.success("Product added successfully to your wishlist", {
                duration: 3500,
            });
        } else {
            toast.error("error in adding the product to your wishlist", {
                duration: 3500,
            });
        }

    }

    async function deleteOneWishList(id) {
        let response = await removeWishList(id)
        if (response?.data.status === "success") {
            toast.success("Product removed successfully from your wishlist", {
                duration: 3000,
            });
        } else {
            toast.error("error in removing the product from your wishlist", {
                duration: 3000,
            });
        };
    }


    async function addToCart(id) {

        let { data } = await AddCart(id)
        if (data.status === 'success') {
            setCartCount(data.numOfCartItems)
            toast.success(data.message)
        }
        console.log(data.data);
    }


    async function getFeaturedProducts(page = 1) {
        $('.loading').fadeIn(0)
        let response = axios.get(
            `https://ecommerce.routemisr.com/api/v1/products?page=${page}`
        );
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        $('.loading').fadeOut(1000)
        return response;

    }

    return (
        <>
            {
                isLoading ? (
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
                ) :
                    <div className='row my-5 g-4'>
                        {data?.data.data.map((product) => <div key={product._id} className="col-md-3">
                            <div className="product cursor-pointer py-3 px-2 position-relative">
                                <i
                                    className={`fa-${wishlistItem.includes(product.id) ? "solid" : "regular"
                                        } text-danger fa-heart opacity-75 cursor-pointer p-3 fs-3 position-absolute heartIcon`}
                                    onClick={() => {
                                        if (!wishlistItem.includes(product.id)) {
                                            addToWishList(product.id);
                                        } else {
                                            deleteOneWishList(product.id);
                                        }
                                    }}
                                ></i>

                                <Link to={'/ProductDetails/' + product._id}>
                                    <img className='w-100' src={product.imageCover} alt={product.title} />
                                    <p className='text-main font-sm fw-bolder'>{product.category.name}</p>
                                    <h3 className='h6'>{product.title.split(" ").slice(0, 2).join(" ")}</h3>
                                    <div className="d-flex justify-content-between ">
                                        <span>{product.price}EGP</span>
                                        <span><i className='fas fa-star rating-color mx-1'></i>{product.ratingsAverage}</span>
                                    </div>
                                </Link>
                                <button onClick={() => addToCart(product._id)} className='btn bg-main text-white btn-sm mt-2 w-100'>Add Cart</button>
                            </div>

                        </div>)}
                        <nav aria-label="Page navigation example" className="my-5">
                            <ul className="pagination justify-content-center">
                                <li className="page-item ">
                                    <button
                                        className="page-link cursor-pointer text-main fw-semibold"
                                        aria-label="Previous"
                                        onClick={() => {
                                            setPage((old) => Math.max(old - 1, 1));
                                        }}
                                        disabled={page === 1}
                                    >
                                        <span aria-hidden="true">&laquo;</span>
                                    </button>
                                </li>
                                <li className="page-item">
                                    <button
                                        className="page-link cursor-pointer text-main fw-semibold"
                                        aria-label="Next"
                                        onClick={() => {
                                            if (!isPreviousData || data.next) {
                                                setPage((old) => old + 1);
                                            }
                                        }}
                                        disabled={page === 2}
                                    >
                                        <span aria-hidden="true">&raquo;</span>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>

            }

            <>
            </>



        </>
    )
}

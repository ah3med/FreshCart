import React, { useEffect, useState } from 'react'
import axios from 'axios';
import $ from 'jquery'
import { BallTriangle } from 'react-loader-spinner'
import imgLoading from '../../assets/images/freshcart-logo.svg'
import { Helmet } from 'react-helmet';


export default function AllBrands() {
    let [getAllBrands, setAllBrands] = useState([])
    let [brandItem, setBrandItem] = useState([])
    useEffect(() => {
        getBrands()
    }, [])


    function getBrandsDetails(brand) {
        setBrandItem(brand)
    }


    async function getBrands() {
        $('.loading').fadeIn(0)
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
        setAllBrands(data.data)
        $('.loading').fadeOut(1000)
    }



    return (
        <>
            <div className="loading position-fixed top-0 end-0 start-0 bottom-0">
                <Helmet>
                    <title>Brands</title>
                    <meta name="description" content="Brands Page" />
                </Helmet>
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



            <div>
                <div className="row g-4">
                    {getAllBrands.map((el) => <div onClick={() => getBrandsDetails(el)} key={el._id} className="col-md-3">
                        <div className="card" data-bs-toggle="modal" data-bs-target="#exampleModal">

                            <div className="card-img">
                                < img className='img-fluid' src={el.image} alt='' ></img>
                            </div>
                            <div className="card-body">
                                <h3 className='text-center'>{el.name}</h3>
                            </div>

                        </div>

                    </div>)}
                    <div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h1 className='text-main'>{brandItem.name}</h1>
                                                <p>{brandItem.slug}</p>

                                            </div>
                                            <div className="col-md-6">
                                                <img className='img-fluid' src={brandItem.image} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Modal --> */}

            </div>
        </>
    )
}

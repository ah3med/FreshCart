import React, { useEffect, useState } from 'react'
import axios from 'axios';
import $ from 'jquery'
import imgLoading from '../../assets/images/freshcart-logo.svg'
import { BallTriangle } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';

export default function Categories() {

    let [categories, setCategories] = useState([])
    useEffect(() => {
        getAllCategories();

    }, [])
    async function getAllCategories() {
        $('.loading').fadeIn(0)
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
        setCategories(data.data)
        console.log(data.data);
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


            <div>

                <Helmet>
                    <title>Categories</title>
                    <meta name="description" content="Categories Page" />
                </Helmet>
                <div id='category' className="row align-items-center justo=ify-content-center g-4">
                    {categories.map((el) => <div key={el._id} className="col-md-3">

                        <div className="card cursor-pointer">
                            <div className="card-img">
                                <img className='img-fluid w-100' src={el.image} alt="category" />
                            </div>
                            <div className="card-body ">
                                <h3 className='text-main text-center'>{el.name}</h3>
                            </div>
                        </div>


                    </div>

                    )}
                </div>


            </div>

        </>
    )
}

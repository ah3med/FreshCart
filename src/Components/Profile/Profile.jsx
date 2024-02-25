import React from 'react'
import jwtDecode from 'jwt-decode';
import { Link, Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Profile() {
    const decoded = jwtDecode(localStorage.getItem('userToken'))
    return (
        <>
            <Helmet>
                <title>Profile</title>
                <meta name="description" content="Profile Page" />
            </Helmet>
            <h1 className="mt-5 mb-3 h4 fw-bold">
                Hi,{" "}
                <span className="text-success">{decoded.name.toUpperCase()}!</span>
            </h1>
            <div className="mb-4 row justify-content-center align-items-center g-2 flex-wrap">
                <div className="col-md-4 text-end">
                    <Link
                        to="wishlist"
                        className="px-3 py-2 btn bg-main text-light fw-bold rounded-2 w-100 "
                    >
                        Wishlist
                    </Link>
                </div>
                <div className="col-md-4 ">
                    <Link
                        to="userDetails"
                        className="px-3 btn py-2 bg-main text-light fw-bold rounded-2 w-100 "
                    >
                        Personal Information
                    </Link>
                </div>
            </div>
            <Outlet />

        </>
    )
}

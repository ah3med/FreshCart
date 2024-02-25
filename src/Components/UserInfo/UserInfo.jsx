import React, { useEffect, useContext } from 'react'
import jwtDecode from 'jwt-decode';
import { OrdersContext } from './../Context/OrdersContext';
import { BallTriangle } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';

export default function UserInfo() {
    let { id, name } = jwtDecode(localStorage.getItem("userToken"));
    let { getCheckoutOrders, ordersDetails } = useContext(OrdersContext);
    useEffect(() => {
        getCheckoutOrders(id)
    }, [])
    
    return (
        <main>
            <Helmet>
                <title>User Info</title>
                <meta name="description" content="User Info Page" />
            </Helmet>
            {ordersDetails.length !== 0 ? (
                <div className="row g-5 justify-content-between align-items-center">
                    <div className="col-md-6">
                        <p className="fw-bold fs-5 p-0 m-0">
                            Name: <span className="text-success text-capitalize">{name}</span>
                        </p>
                    </div>
                    <div className="col-md-6 ">
                        <p className="fw-bold fs-5 p-0 m-0">
                            Email:{" "}
                            <span className="text-success">{ordersDetails[0].user?.email}</span>
                        </p>
                    </div>
                    <div className="col-md-6">
                        <p className="fw-bold fs-5 p-0 m-0">
                            Phone Number:{" "}
                            <span className="text-success">{ordersDetails[0].user?.phone}</span>
                        </p>
                    </div>
                </div>
            ) : (
                <div className="loading position-fixed top-0 end-0 start-0 bottom-0">
                    <BallTriangle
                        height={200}
                        width={300}
                        radius={5}
                        color="black"
                        ariaLabel="ball-triangle-loading"
                        wrapperClass={{}}
                        wrapperStyle=""
                        visible={true}
                    />
                </div>
            )}

        </main>




    )
}

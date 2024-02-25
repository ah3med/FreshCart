import React, { useContext, useEffect, useState } from 'react'
import Navbar from './../Navbar/Navbar';
import Footer from './../Footer/Footer';
import { Outlet } from 'react-router-dom';
import { Offline } from 'react-detect-offline';
import { WishListContext } from '../Context/WishListContext';

export default function Layout({ userData, Logout }) {
  let [token, setToken] = useState(null)
  const { getAllWishList } = useContext(WishListContext)

  useEffect(() => {
    if (
      localStorage.getItem("userToken") !== null ||
      localStorage.getItem("userToken") !== "null"
    ) {
      setToken(localStorage.getItem("userToken"));
    }
    
    const arrowBtn = document.querySelector(".scrollUp");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        arrowBtn.classList.replace("d-none", "d-block");
      } else {
        arrowBtn.classList.replace("d-block", "d-none");
      }
    });
  }, []);


  return <>

    <div>
      <Navbar Logout={Logout} userData={userData} />
      <div className="container my-5 py-5">
        <Outlet />
        <div
          className=" position-fixed scrollUp d-none px-3 py-2 bg-main rounded-1 cursor-pointer"
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          <i className="fa-solid fa-arrow-up text-light fw-bold fs-5"></i>
        </div>
        <Offline>
          <div className="text-center network bg-light shadow p-3">
            <i className="fa fa-wifi text-main me-3"></i>
            <span className="text-main fw-semibold fs-5">
              You are offline now, Check your internet connection
            </span>
          </div>
        </Offline>
      </div>
        <Footer />


    </div>

  </>
}

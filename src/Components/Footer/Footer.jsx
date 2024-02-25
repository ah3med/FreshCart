import React from "react";
import amazon from "../../assets/images/amazon-logo.png";
import express from "../../assets/images/american-express-logo.png";
import mastercard from "../../assets/images/mastercard-logo.png";
import paypal from "../../assets/images/paypal logo.png";
import appStore from "../../assets/images/app-store.png";
import googlePlay from "../../assets/images/google-play.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-main-light py-5 mt-auto">
      <div className="container-sm">
        <h3 className="h5 fw-semibold mb-2">Get the FreshCart App</h3>
        <p>We will sent you a link, open it on your phone to download it</p>
        <div className="row g-4 justify-content-between align-items-center pb-3 border-bottom border-opacity-25 border-dark">
          <div className="col-md-9">
            <input
              type="text"
              className="form-control w-100"
              placeholder="Your Email"
            />
          </div>
          <div className="col-md-3 text-end">
            <button className="btn bg-main text-light w-100">
              Share App Link
            </button>
          </div>
        </div>
        <div className="row py-3 border-bottom border-opacity-25 border-dark justify-content-between align-items-center">
          <div className="col-md-7 partners">
            <span className="me-3 fw-semibold">Payment Partners</span>
            <img src={amazon} alt="amazon logo" />
            <img src={express} alt="americal express logo" />
            <img src={mastercard} alt="mastercard logo" />
            <img src={paypal} alt="paypal logo" />
          </div>
          <div className="col-md-5 store text-lg-end">
            <span className="me-3 fw-semibold">
              Get Deliveries with FreshCart
            </span>
            <Link to="/">
              <img src={appStore} alt="app store logo" className="app" />
            </Link>
            <Link to="/">
              <img src={googlePlay} alt="google play logo" className="google" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
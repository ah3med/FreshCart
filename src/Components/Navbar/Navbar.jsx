import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from '../../assets/images/freshcart-logo.svg'
import { CartContext } from '../Context/CartContext'
import { WishListContext } from './../Context/WishListContext';



export default function Navbar({ userData, Logout }) {
  let { cartCount } = useContext(CartContext)
  let { wishListCount } = useContext(WishListContext)

  return (
    <nav className="navbar pb-2 fixed-top navbar-expand-lg bg-body-secondary">
      <div className="container">
        <Link className="navbar-brand" to="/">

          <img src={Logo} alt='....' />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {userData != null ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <NavLink  className={(x)=>x.isActive?'nav-link active' : 'nav-link'} to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={(x)=>x.isActive?'nav-link active' : 'nav-link'} to="products">Products</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={(x)=>x.isActive?'nav-link active' : 'nav-link'} to="categories">Categories</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={(x)=>x.isActive?'nav-link active' : 'nav-link'} to="brands">Brands</NavLink>
            </li>
          </ul> : ""}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">

            {userData == null ?
              <>
                <li className="nav-item">
                  <NavLink className={(x)=>x.isActive?'nav-link active text-danger' : 'nav-link'} to="login">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={(x)=>x.isActive?'nav-link active text-danger' : 'nav-link'} to="register">Register</NavLink>
                </li>


              </> :
              <>
                <li className="nav-item me-3">
                  <Link className="nav-link" to="wishlist">
                    <i className="fa-regular fa-heart text-danger fs-5 position-relative">
                      <span className="cartItem badge rounded-2 bg-success">
                        {wishListCount}
                      </span>
                    </i>{" "}
                  </Link>
                </li>
                <li className="nav-item me-5">
                  <Link className="nav-link" to="cart">
                    <i className='position-relative fa-solid fa-cart-shopping fs-5 '>
                      <span class="cartItem badge rounded-2 bg-success">
                        {cartCount}
                      </span>
                    </i>
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to="/profile">
                    <i className="fa-regular fa-circle-user fs-4 text-success"></i>
                  </Link>
                </li>
                <li className="nav-item">
                  <span onClick={Logout} className="nav-link cursor-pointer" >Sign Out<i class="ms-2 fa-solid fa-arrow-right-from-bracket"></i></span>
                  
                </li>
              </>
            }




          </ul>

        </div>
      </div>
    </nav>
  )
}

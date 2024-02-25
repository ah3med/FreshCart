import React, { useContext, useEffect } from 'react'
import FeaturedProducts from './../FeaturedProducts/FeaturedProducts';
import MainSlider from '../MainSlider/MainSlider';
import { Helmet } from "react-helmet";
import CategorySlider from '../CategorySlider/CategorySlider';
import { CartContext } from '../Context/CartContext';
import { WishListContext } from '../Context/WishListContext';

export default function Home() {
let {getAllCartData , setCartCount}=useContext(CartContext)
let {getAllWishList ,setwishListCount} = useContext(WishListContext)

async function reloadHome(){
  setCartCount(0)
  setwishListCount(0)
  const resultCart = await getAllCartData();
  const resultWishList = await getAllWishList();
  // console.log(resultWishList?.data.count);
  setwishListCount(resultWishList.data?.count)
  console.log(resultWishList); 
  const {data} = resultCart.response
  setCartCount(data.numOfCartItems)
}
  useEffect(()=>{
   reloadHome()
  },[])
  return (
    <>
      <div>
      <Helmet>
        <title>FreshCart</title>
        <meta name="description" content="User FreshCart Website" />
      </Helmet>
        <MainSlider />
        <CategorySlider/>
        <FeaturedProducts />
      </div>
    </>
  )
}

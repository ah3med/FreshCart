import { createContext, useEffect, useState } from "react";
import axios from "axios";
export let WishListContext = createContext();
let headers = localStorage.getItem("userToken");

export default function WishListContextProvider(props) {
  const [wishlistItem, setWishlist] = useState([]);
  let [wishListCount, setwishListCount] = useState(0);

  useEffect(() => {
    getAllWishList();
  }, []);

  function getAllWishList() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((response) => {
        setwishListCount(response?.data.count);

        setWishlist(
          response?.data.data.map((item) => {
            return item._id;
          })
        );

        return response;
      })
      .catch((error) => error);
  }

  function removeWishList(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((response) => {
        setWishlist(response?.data.data);
        setwishListCount(response?.data.data.length);
        return response;
      })
      .catch((error) => error);
  }

  function addWishList(id) {
    let body = {
      productId: id,
    };
    return axios
      .post(`https://ecommerce.routemisr.com/api/v1/wishlist`, body, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((response) => {
        setWishlist(response?.data.data);
        setwishListCount(response?.data.data.length);
        return response;
      })
      .catch((error) => error);
  }

  return (
    <WishListContext.Provider
      value={{
        addWishList,
        getAllWishList,
        removeWishList,
        wishlistItem,
        setWishlist,
        setwishListCount,
        wishListCount,
      }}
    >
      {props.children}
    </WishListContext.Provider>
  );
}

import axios from "axios";
const { createContext, useState, useEffect } = require("react");
export let CartContext = createContext();

export default function CartContextProvider(props) {
  let [cartCount, setCartCount] = useState(0);
  let headers = localStorage.getItem("userToken");
 

  useEffect(()=>{
   getAllCartData()
  },[])



  function getAllCartData() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: {
          token: headers,
        },
      })
      .then((response) => {
        setCartCount(response.data.numOfCartItems);
        return { response: response, status: "success" };
      })
      .catch((error) => {
        return { error: error, status: "fail" };
      });
  }
  function deleteProduct(id) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
      headers: {
        token: headers,
      },
    });
  }

  function AddCart(id) {
    let body = {
      productId: id,
    };
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, body, {
      headers: {
        token: headers,
      },
    });
  }
  function updateProductQuantitiy(id, count) {
    let body = {
      count: count,
    };
    return axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      body,
      {
        headers: {
          token: headers,
        },
      }
    );
  }

  function deleteAllProducts() {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers: {
        token: headers,
      },
    });
  }

  function checkPayment(id, shippingData) {
    let body = { shippingAddress: shippingData };
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,
      body,
      {
        headers: {
          token: headers,
        },
      }
    );
  }

  return (
    <CartContext.Provider
      value={{
        AddCart,
        getAllCartData,
        deleteProduct,
        updateProductQuantitiy,
        deleteAllProducts,
        checkPayment,
        cartCount,
        setCartCount,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

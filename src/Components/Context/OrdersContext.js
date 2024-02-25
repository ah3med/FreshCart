import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export let OrdersContext = createContext();

export default function OrdersContextProvider(props) {
  let [ordersDetails, setOrderDetails] = useState([]);
  let [lastOrder, setLastOrder] = useState(null);
  function getCheckoutOrders(userId) {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
      .then((response) => {
        setOrderDetails(response?.data);
        return response;
      })
      .catch((err) => err);
  }

  useEffect(() => {
    setLastOrder(ordersDetails[ordersDetails.length - 1]);
  });

  return (
    <OrdersContext.Provider
      value={{ getCheckoutOrders, ordersDetails, lastOrder }}
    >
      {props.children}
    </OrdersContext.Provider>
  );
}

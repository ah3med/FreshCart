import "./App.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Login/Login";
import Cart from "./Components/Cart/Cart";
import Register from "./Components/Register/Register";
import Notfound from "./Components/Notfound/Notfound";
import Home from "./Components/Home/Home";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import Products from "./Components/Products/Products";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import CartContextProvider from "./Components/Context/CartContext";
import CheckOut from "./Components/CheckOut/CheckOut";
import AllBrands from "./Components/AllBrands/AllBrands";
import Categories from "./Components/Categories/Categories";
import WishList from "./Components/WishList/WishList";
import WishListContextProvider from "./Components/Context/WishListContext";
import AllOrders from "./Components/AllOrders/AllOrders";
import Footer from "./Components/Footer/Footer";
import Profile from "./Components/Profile/Profile";
import UserInfo from "./Components/UserInfo/UserInfo";
import OrdersContextProvider from "./Components/Context/OrdersContext";
import { Toaster } from "react-hot-toast";

function App() {
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      let token = localStorage.getItem("userToken");
      let data = jwtDecode(token);
      console.log(data);
      saveUserData(data);
    }
  }, []);

  let [userData, setUserData] = useState(null);
  function saveUserData(data) {
    setUserData(data);
    
  }

  //! =================== Protected Route (Guard) ==================
  function ProtectedRouter(props) {
    if (localStorage.getItem("userToken")) {
      return props.children;
    } else {
      return <Navigate to="/login" />;
    }
  }

  // ! ======================= Logout ===================
  function Logout() {
    saveUserData(null);
    localStorage.removeItem("userToken");
    return <Navigate to="/login" />;
  }

  let Routes = createBrowserRouter([
    {
      path: "",
      element: <Layout Logout={Logout} userData={userData} />,
      children: [
        {
          index:true,
          element: (
            <ProtectedRouter>
              <Home userData={userData} />
            </ProtectedRouter>
          ),
        },
        { path: "login", element: <Login saveUserData={saveUserData} /> },
        {
          path: "products",
          element: (
            <ProtectedRouter>
              <Products />
            </ProtectedRouter>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRouter>
              <AllBrands />
            </ProtectedRouter>
          ),
        },
        {
          path: "AllOrders",
          element: (
            <ProtectedRouter>
              <AllOrders />
            </ProtectedRouter>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRouter>
              <Categories />
            </ProtectedRouter>
          ),
        },
        {
          path: "Footer",
          element: (
            <ProtectedRouter>
              <Footer />
            </ProtectedRouter>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRouter>
              <WishList />
            </ProtectedRouter>
          ),
        },
        {
          path: "register",
          element: (
              <Register />
          ),
        },
        {
          path: "CheckOut/:id",
          element: (
            <ProtectedRouter>
              <CheckOut />
            </ProtectedRouter>
          ),
        },
        { path: "ForgetPassword", element: <ForgetPassword /> },
        { path: "ResetPassword", element: <ResetPassword /> },
        {
          path: "ProductDetails/:id",
          element: (
            <ProtectedRouter>
              <ProductDetails />
            </ProtectedRouter>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRouter>
              <Cart />
            </ProtectedRouter>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRouter>
              <Profile />
            </ProtectedRouter>
          ),
          children: [
            {
              path: "wishlist",
              element: <WishList />,
            },

            {
              path: "",
              element: <WishList />,
            },
            {
              path: "userDetails",
              element: <UserInfo />,
            },
          ],
        },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);
  return (
    <>
  
      
      <OrdersContextProvider>
        <WishListContextProvider>
          <CartContextProvider>
            <RouterProvider router={Routes} />
          </CartContextProvider>
        </WishListContextProvider>
      </OrdersContextProvider>
      <Toaster/>
      

    </>
  );
}

export default App;

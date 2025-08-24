import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import OtpVerification from "../pages/OtpVerification";
import ResetPassword from "../pages/ResetPassword";
import UserMenuMobile from "../pages/UserMenuMobile";
import Dashboard from "../layout/Dashboard";
import Profile from "../pages/Profile";
import MyOrders from "../pages/MyOrders";
import Address from "../pages/Address";
import CategoryPage from "../pages/CategoryPage";
import SubCategoryPage from "../pages/SubCategoryPage";
import UploadProductPage from "../pages/UploadProductPage";
import AdminPermission from "../layout/AdminPermission";
import ProductPage from "../pages/ProductPage";
import ProductListPage from "../pages/ProductListPage";
import ProducDisplayPage from "../pages/ProducDisplayPage";
import CartMobile from "../pages/CartMobile";
import CheckOutPage from "../pages/CheckOutPage";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "search",
                element: <SearchPage />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />
            },
            {
                path: "verification-otp",
                element: <OtpVerification />
            }, {
                path: "reset-password",
                element: <ResetPassword />
            }, {
                path: "user",
                element: <UserMenuMobile />
            }, 
            {
                path: "dashboard",
                element: <Dashboard />,
                children: [
                    {
                        path: "profile",
                        element:<Profile/>
                    },
                    {
                        path: "myorder",
                        element:<MyOrders/>
                    },
                    {
                        path: "address",
                        element:<Address/>
                    },{
                        path:"category",
                        element:<AdminPermission><CategoryPage/></AdminPermission> 
                    },{
                        path:"sub-category",
                        element:<AdminPermission><SubCategoryPage/></AdminPermission>
                    },{
                        path:"upload-product",
                        element:<AdminPermission><UploadProductPage/></AdminPermission>
                    },{
                        path:"product",
                        element:<AdminPermission><ProductPage/></AdminPermission>
                    }
                ]
            },
            {
                path :":category",
                children :[
                    {
                        path : ":subcategory",
                        element : <ProductListPage/>
                    }
                ]
            },
            {
                path : "product/:product",
                element : <ProducDisplayPage/>
            },{
                path: "cart",
                element:<CartMobile/>
            },
            {
                path:"checkout",
                element: <CheckOutPage/>
            },
            {
                path:"success",
                element: <Success/>
            },
            {
                path:"cancel",
                element: <Cancel/>
            }

        ]
    }
])

export default router;
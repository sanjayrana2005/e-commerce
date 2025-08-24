export const baseURL = import.meta.env.VITE_API_URL

const SummaryApi = {
    register: {
        url: "api/user/register",
        method: "POST"
    },
    login: {
        url: "api/user/login",
        method: "POST"
    },
    forgot_password: {
        url: "api/user/forgot-password",
        method: "PUT"
    },
    forgot_password_otp_verification: {
        url: "api/user/verify-forgot-password-otp",
        method: "PUT"
    },
    resertPassword: {
        url: "api/user/reset-password",
        method: "PUT"
    },
    refreshToken: {
        url: "api/user/refresh-token",
        method: "POST"
    },
    userDetails: {
        url: "/api/user/user-details",
        method: "GET"
    },
    logout: {
        url: "/api/user/logout",
        method: "GET"
    },
    uploadAvatar: {
        url: "/api/user/upload-avatar",
        method: "PUT"
    },
    updateUserDetails: {
        url: "/api/user/update-user",
        method: "PUT"
    },
    addCategory: {
        url: "/api/category/add-category",
        method: "POST"
    },
    uploadImage: {
        url: "/api/file/upload",
        method: "POST"
    },
    getCategory: {
        url: "/api/category/get",
        method: "GET"
    },
    updateCategory: {
        url: "/api/category/update",
        method: "PUT"
    },
    deleteCategory: (_id) => ({
        url: `/api/category/delete/${_id}`,
        method: "DELETE"
    }),
    createSubcategory :{
        url :"/api/subcategory/create",
        method:"POST"
    },
    getSubCategory : {
        url:"/api/subcategory/get",
        method:"POST"
    },
    updateSubCategory:{
        url:"/api/subcategory/update",
        method:"PUT"
    },
    deleteSubCategory : {
        url:"/api/subcategory/delete",
        method:"DELETE"
    },
    createProduct : {
        url:"/api/product/create",
        method:"POST"
    },
    getProduct :{
        url :"/api/product/get",
        method:"POST"
    },
    getProductByCategory:{
        url :"/api/product/get-product-by-category",
        method:"POST"
    },
    getProductByCategoryAndSubCategory:{
        url :"/api/product/get-product-by-category-and-subcategory",
        method:"POST"
    },
    getProductDetails :{
        url : "/api/product/get-product-details",
        method:"POST"
    },
    updateProductDetails : {
        url: "/api/product/update-product-details",
        method:"PUT"
    },
    deleteProduct : {
        url: "/api/product/delete-product",
        method:"DELETE"
    },
    searchProducts :{
        url:"/api/product/search-product",
        method:"POST"
    },
    addToCart:{
        url:"/api/cart/create",
        method:"POST"
    },
    getCartItem:{
        url:"/api/cart/get",
        method:"GET"
    },
    updateCartItemQuantity:{
        url:"/api/cart/update-quantity",
        method:"PUT"
    },
    deleteCartItem : {
        url:"/api/cart/delete-cart-item",
        method:"DELETE"
    },
    createAddress : {
        url:"/api/address/create",
        method:"POST"
    },
    getAddress:{
        url:"/api/address/get",
        method:"GET"
    },
    updateAddress:{
        url:"/api/address/update",
        method:"PUT"
    },
    disableAddress:{
        url:"/api/address/disable",
        method:"DELETE"
    },
    cashOnDelivery:{
        url:"/api/order/cash-on-delivery",
        method:"POST"
    },
    payment_url : {
        url:"/api/order/checkout",
        method:"POST"
    },
    getOrderItems: {
        url:"/api/order/order-list",
        method:"GET"
    }
    
    


}

export default SummaryApi
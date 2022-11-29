import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice/authSlice";
import cartSlice from "./cart/cartSlice";
import prodictsData from "./dataSlice/prodictsSlice";

const store = configureStore({
    reducer: {
        auth,prodictsData,cartSlice
    }
})
export default store
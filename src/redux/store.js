import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "./slices/client/clientSlice";
import productReducer from "./slices/productSlice";
import storeReducer from "./slices/storeSlice";
import saleReducer from "./slices/saleSlice";
// import authReducer from "./slices/auth/authSlice";

const store = configureStore({
  reducer: {
    Client: clientReducer,
    Product: productReducer,
    Store: storeReducer,
    Sale: saleReducer,
  },
});

export default store;

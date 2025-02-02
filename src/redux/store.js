import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import storeReducer from "./slices/storeSlice";
import clientReducer from "./slices/clientSlice";
// import authReducer from "./slices/auth/authSlice";

const store = configureStore({
  reducer: {
    Product: productReducer,
    Store: storeReducer,
    Client: clientReducer,
    // Auth: authReducer,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "./slices/clientSlice";
import productReducer from "./slices/productSlice";
import storeReducer from "./slices/storeSlice";
import ticketReducer from "./slices/ticketSlice";
// import authReducer from "./slices/auth/authSlice";

const store = configureStore({
  reducer: {
    Client: clientReducer,
    Product: productReducer,
    Store: storeReducer,
    Ticket: ticketReducer,
  },
});

export default store;

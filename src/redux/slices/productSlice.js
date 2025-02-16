import { createSlice } from "@reduxjs/toolkit";
import { columns, rows } from "./dataRandom/data-products";

const initState = {
  products: rows,
  header: columns,
};

const productSlice = createSlice({
  name: "Product",
  initialState: initState,
  reducers: {
    getAllProducts: (state, action) => {
      return {
        ...state,
      };
    },
    getProducts: (state, action) => {
      return {
        ...state,
      };
    },
    saveProduct: (state, action) => {
      return { ...state };
    },
    updateProduct: (state, action) => {
      return { ...state };
    },
    deleteProduct: (state, action) => {
      return { ...state };
    },
  },
});

export const {
  getAllProducts,
  getProducts,
  saveProduct,
  updateProduct,
  deleteProduct,
} = productSlice.actions;

export default productSlice.reducer;

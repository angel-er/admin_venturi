import { createSlice } from "@reduxjs/toolkit";
import { columns } from "./headers/data-products";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "#services/product.js";

const initState = {
  products: [],
  header: columns,
  error: null,
  status: "uninitialized",
};

const productSlice = createSlice({
  name: "Product",
  initialState: initState,
  reducers: {
    getAllProducts: (state, action) => {
      return {
        ...state,
        products: !action.payload ? [] : action.payload.reverse(),
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state, action) => {
        state.status = "ĺoading";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        if (action.payload.status === "registered") {
          state.products.unshift(action.payload);
        }
        state.status = action.payload.status;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.message;
      })
      .addCase(updateProduct.pending, (state, action) => {
        state.status = "ĺoading";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        if (action.payload.status === "updated") {
          state.products = state.products.map((c, idx) =>
            c.id === action.payload.id ? action.payload : c
          );
        }
        state.status = action.payload.status;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.message;
      })
      .addCase(deleteProduct.pending, (state, action) => {
        state.status = "ĺoading";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        if (action.payload.status === "deleted") {
          state.products = state.products.filter(
            (c, idx) => c.id !== action.payload.id_product
          );
        }
        state.status = action.payload.status;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.message;
      });
  },
});

export const { getAllProducts } = productSlice.actions;

export default productSlice.reducer;

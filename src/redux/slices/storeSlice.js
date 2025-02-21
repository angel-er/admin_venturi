import { createSlice } from "@reduxjs/toolkit";
import { columns } from "./headers/data-store";
import { createStore } from "#services/store.js";

const initState = {
  stores: [],
  header: columns,
  error: null,
  status: "uninitialized",
};

const storeSlice = createSlice({
  name: "Store",
  initialState: initState,
  reducers: {
    getAllStores: (state, action) => {
      return { ...state, stores: action.payload.reverse() };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createStore.pending, (state, action) => {
        state.status = "ĺoading";
      })
      .addCase(createStore.fulfilled, (state, action) => {
        state.status = `${
          action.payload.status === 404 ? "error" : "registered"
        }`;
        action?.payload && state.stores.unshift(action.payload);
      })
      .addCase(createStore.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.message;
      });
  },
});

export const { getAllStores, getStore, saveStore } = storeSlice.actions;

export default storeSlice.reducer;

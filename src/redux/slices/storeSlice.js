import { createSlice } from "@reduxjs/toolkit";
import { columns } from "./dataRandom/data-store";

const initState = {
  stores: [],
  header: columns,
};

const storeSlice = createSlice({
  name: "Store",
  initialState: initState,
  reducers: {
    getAllStores: (state, action) => {
      return { ...state, stores: action.payload.reverse() };
    },
    getStore: (state, action) => {
      return {
        ...state,
      };
    },
    saveStore: (state, action) => {
      return { ...state };
    },
  },
});

export const { getAllStores, getStore, saveStore } = storeSlice.actions;

export default storeSlice.reducer;

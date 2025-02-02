import { createSlice } from "@reduxjs/toolkit";
import { columns, rows } from "./dataRandom/data-store";

const initState = {
  stores: rows,
  header: columns,
};

const storeSlicer = createSlice({
  name: "Store",
  initialState: initState,
  reducers: {
    getAllStores: (state, action) => {
      return {
        ...state,
      };
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

export const { getAllStores, getStore, saveStore } = storeSlicer.actions;

export default storeSlicer.reducer;

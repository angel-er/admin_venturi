import { createSlice } from "@reduxjs/toolkit";

const initState = {
  payment_type: [
    { id: 1, type: "Efectivo" },
    { id: 2, type: "QR" },
    { id: 3, type: "Tarjeta" },
  ],
};

const saleSlicer = createSlice({
  name: "Sale",
  initialState: initState,
  reducers: {
    getAllSale: (state, action) => {
      return {
        ...state,
      };
    },
    getSale: (state, action) => {
      return {
        ...state,
      };
    },
    saveSale: (state, action) => {
      return { ...state };
    },
  },
});

export const { getAllSale, getSale, saveSale } = saleSlicer.actions;

export default saleSlicer.reducer;

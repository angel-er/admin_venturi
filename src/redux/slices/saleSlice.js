import { createSlice } from "@reduxjs/toolkit";

const initState = {
  payment_type: [
    { id: 1, type: "Efectivo" },
    { id: 2, type: "QR" },
    { id: 3, type: "Tarjeta" },
  ],
};

const saleSlice = createSlice({
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

export const { getAllSale, getSale, saveSale } = saleSlice.actions;

export default saleSlice.reducer;

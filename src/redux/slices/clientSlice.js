import { createSlice } from "@reduxjs/toolkit";
import { columns, rows } from "./dataRandom/data-clients";

// import config, { getCurrentTheme } from "./config";

const initState = {
  clients: rows,
  header: columns,
};

const clientSlicer = createSlice({
  name: "Product",
  initialState: initState,
  reducers: {
    getAllClients: (state, action) => {
      return {
        ...state,
      };
    },
    getClient: (state, action) => {
      return {
        ...state,
      };
    },
    saveClient: (state, action) => {
      return { ...state };
    },
    updateClient: (state, action) => {
      return { ...state };
    },
    deleteClient: (state, action) => {
      return { ...state };
    },
  },
});

export const {
  getAllClients,
  getClient,
  saveClient,
  updateClient,
  deleteClient,
} = clientSlicer.actions;

export default clientSlicer.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { columns } from "./headers/data-clients";
import { createClient, updateClient, deleteClient } from "#services/client.js";

const initState = {
  clients: [],
  header: columns,
  error: null,
  status: "uninitialized",
};

const clientSlice = createSlice({
  name: "Client",
  initialState: initState,
  reducers: {
    getAllClients: (state, action) => {
      return { ...state, clients: action?.payload?.reverse() };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createClient.pending, (state, action) => {
        state.status = "ĺoading";
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.status = `${
          action.payload.status === 404 ? "error" : "registered"
        }`;
        action?.payload && state.clients.unshift(action.payload);
      })
      .addCase(createClient.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.message;
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        state.status = `${action.payload.status === 404 ? "error" : "updated"}`;
        action.payload &&
          state.clients.filter((c, idx) =>
            c.id === action.payload.id ? action.payload : c
          );
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.message;
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.status = `${action.payload.status === 404 ? "error" : "deleted"}`;
        action.payload &&
          state.clients.filter((c, idx) => c.id !== action.payload.id);
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.message;
      });
  },
});

export const { getAllClients } = clientSlice.actions;

export default clientSlice.reducer;

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
      if (action.payload.status === 200) {
        state.clients = action.payload.data.reverse();
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createClient.pending, (state, action) => {
        state.status = "ĺoading";
      })
      .addCase(createClient.fulfilled, (state, action) => {
        if (action.payload.status === "registered") {
          state.clients.unshift(action.payload);
        }
        state.status = action.payload.status;
      })
      .addCase(createClient.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.message;
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        if (action.payload.status === "updated") {
          state.clients = state.clients.map((c, idx) =>
            c.id === action.payload.id ? action.payload : c
          );
        }
        state.status = action.payload.status;
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.message;
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        if (action.payload.status === "deleted") {
          state.clients = state.clients.filter(
            (c, idx) => c.id !== action.payload.id_client
          );
        }
        state.status = action.payload.status;
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.message;
      });
  },
});

export const { getAllClients } = clientSlice.actions;

export default clientSlice.reducer;

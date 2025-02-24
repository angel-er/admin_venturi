import { createTicket } from "#services/ticket.js";
import { createSlice } from "@reduxjs/toolkit";
import { columns } from "./headers/data-ticket";

const initState = {
  tickets: [],
  header: columns,
  monthlyTickets: 0,
  payment_type: [
    { id: 1, type: "Efectivo" },
    { id: 2, type: "QR" },
    { id: 3, type: "Tarjeta" },
  ],
  error: null,
  status: "uninitialized",
};

const ticketSlice = createSlice({
  name: "Ticket",
  initialState: initState,
  reducers: {
    getAllTickets: (state, action) => {
      return {
        ...state,
        monthlyTickets: !action.payload.length
          ? 0
          : action.payload[action.payload.length - 1].id,
        tickets: !action.payload.length ? [] : action.payload.reverse(),
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state, action) => {
        state.status = "ĺoading";
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.status = `${
          action.payload.status === 404 ? "error" : "registered"
        }`;
        action?.payload && state.tickets.unshift(action.payload);
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.message;
      });
  },
});

export const { getAllTickets } = ticketSlice.actions;

export default ticketSlice.reducer;

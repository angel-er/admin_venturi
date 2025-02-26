import { createAsyncThunk } from "@reduxjs/toolkit";
import apiUrl from "#services/config.js";

const parseData = (data) => {
  const canceled =
    +data.payments.cash + +data.payments.qr + +data.payments.card;
  const setItems = data.items.map((i, idx) => {
    return {
      product_id: i.id,
      price: i.price,
      quantity: i.quantity,
      subtotal: +i.price * +i.quantity,
    };
  });

  return {
    client_id: data.idClient,
    total_amount: data.amountPaid,
    service_type: data.serviceType,
    items: setItems,
    payment_cash: data.payments.cash,
    payment_qr: data.payments.qr,
    payment_card: data.payments.card,
    total_canceled: canceled,
    change: canceled > data.amountPaid ? canceled - data.amountPaid : 0,
  };
};

export const getListTickets = async () => {
  try {
    const resp = await apiUrl.get(`/api/ticket/`);
    if (resp.status === 200) {
      return resp.data;
    }
  } catch (error) {
    console.log("ERROR LIST STORES: ", error);
  }
};

export const getTicket = async (id) => {
  try {
    const resp = await apiUrl.get(`/api/ticket/${id}/`, id);
    if (resp.status === 200) {
      return { ...resp.data };
    }
  } catch (error) {
    console.log("RESPONSE ERROR TICKET: ", error);
    if (error.status === 404) {
      return { status: 404 };
    }
  }
};

export const createTicket = createAsyncThunk(
  "ticket/createTicket",
  async (data, thunkAPI) => {
    const parse = parseData(data);
    console.log(parse);
    try {
      const resp = await apiUrl.post(`/api/ticket/`, parse);
      if (resp.status === 201) {
        console.log("RESPONSE SUCCESS TICKET: ", resp.data);
        return { ...resp.data };
      }
    } catch (error) {
      console.log("RESPONSE ERROR TICKET: ", error);
      if (error.status === 404) {
        return { status: 404 };
      }
    }
  }
);

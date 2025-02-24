import { createAsyncThunk } from "@reduxjs/toolkit";
import apiUrl from "#services/config.js";

const parseData = (data) => {
  const setItems = data.items.map((i, idx) => {
    return {
      product: i.id,
      // name: i.name,
      // description: i.description,
      price: i.price,
      quantity: i.quantity,
      subtotal: +i.price * +i.quantity,
      // i["ticket"] = `THV-00000${data.monthlyTickets + 1}`;}
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
    // total_canceled:
    //   +data.payments.cash + +data.payments.qr + +data.payments.card,
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

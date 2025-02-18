import { createAsyncThunk } from "@reduxjs/toolkit";
import apiUrl from "#services/config.js";

const parseData = (data) => {
  return {
    code: !data?.code && null,
    name_store: data.name,
    unit_store: data.unit,
    price_store: data.price,
    quantity_store: data.quantity,
  };
};

export const getListStores = async () => {
  try {
    const resp = await apiUrl.get(`/api/store/`);
    if (resp.status === 200) {
      return resp.data?.stores;
    }
  } catch (error) {
    console.log("ERROR LIST STORES: ", error);
  }
};

export const createStore = createAsyncThunk(
  "store/createStore",
  async (data, thunkAPI) => {
    const parse = parseData(data);
    try {
      const resp = await apiUrl.post(`/api/store/`, parse);
      if (resp.status === 200) {
        return { ...resp.data };
      }
    } catch (error) {
      if (error.status === 404) {
        return { status: 404 };
      }
    }
  }
);

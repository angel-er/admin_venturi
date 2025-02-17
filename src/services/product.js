import { createAsyncThunk } from "@reduxjs/toolkit";
import apiUrl from "#services/config.js";

const parseData = (data) => {
  return {
    ...data,
    name_product: data.name,
    price_product: Number(data.price),
  };
};

export const getListProducts = async () => {
  try {
    const resp = await apiUrl.get(`/api/product/`);
    if (resp.status === 200) {
      return resp.data?.products;
    }
  } catch (error) {
    console.log("ERROR LIST PRODUCTS: ", error);
  }
};

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (data, thunkAPI) => {
    const parse = parseData(data);
    try {
      const resp = await apiUrl.post(`/api/product/`, parse);
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

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (data, thunkAPI) => {
    const parse = parseData(data);
    try {
      const resp = await apiUrl.patch(
        `/api/product/detail/${parse.id}/`,
        parse
      );
      if (resp.status === 200) {
        return { ...resp.data };
      }
    } catch (error) {
      return { status: 404 };
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/productClient",
  async (id, thunkAPI) => {
    try {
      const resp = await apiUrl.delete(`/api/product/detail/${id}/`);
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

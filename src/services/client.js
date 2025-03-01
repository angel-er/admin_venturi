import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1000,
  headers: {
    Accept: "application/json",
    //'Authorization': 'token <your-token-here> -- https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
  },
});

export const getListClients = async () => {
  try {
    const resp = await apiClient.get(`/api/client/`);
    if (resp.status === 200) {
      return { data: resp.data.clients, status: resp.status };
    }
  } catch (error) {}
};

export const createClient = createAsyncThunk(
  "client/createClient",
  async (data, thunkAPI) => {
    const parseData = {
      ...data,
      last_name: data.lastName,
      telephone: !data.telephone ? null : Number(data.telephone),
      email: !data.email ? null : data.email,
    };
    try {
      const resp = await apiClient.post(`/api/client/`, parseData);
      if (resp.status === 200) {
        return { ...resp.data, status: "registered" };
      }
    } catch (error) {
      if (error.status === 404) {
        return { status: "exists" };
      }
    }
  }
);

export const updateClient = createAsyncThunk(
  "client/updateClient",
  async (data, thunkAPI) => {
    const parseData = {
      ...data,
      last_name: data.lastName,
      telephone: !data.telephone ? null : Number(data.telephone),
      email: !data.email ? null : data.email,
    };
    try {
      const resp = await apiClient.patch(
        `/api/client/detail/${data.id}/`,
        parseData
      );
      if (resp.status === 200) {
        return { ...resp.data, status: "updated" };
      }
    } catch (error) {
      if (error.status === 404) {
        return { status: "exists" };
      }
    }
  }
);

export const deleteClient = createAsyncThunk(
  "client/deleteClient",
  async (id, thunkAPI) => {
    try {
      const resp = await apiClient.delete(`/api/client/detail/${id}/`);
      if (resp.status === 200) {
        return { ...resp.data, status: "deleted", id_client: id };
      }
    } catch (error) {
      if (error.status === 404) {
        return { status: "error" };
      }
    }
  }
);

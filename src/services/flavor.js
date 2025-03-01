import apiUrl from "#services/config.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

const parseData = (data) => {
  return {
    ...data,
  };
};
export const getListFlavors = async () => {
  try {
    const resp = await apiUrl.get(`/api/flavor/`);
    if (resp.status === 200) {
      return { data: resp.data?.flavors, status: resp.status };
    }
  } catch (error) {
    console.log("ERROR LIST FLAVORS: ", error);
    return { status: "error" };
  }
};

export const createFlavor = createAsyncThunk(
  "flavor/createFlavor",
  async (data, thunkAPI) => {
    const parse = parseData(data);
    try {
      const resp = await apiUrl.post(`/api/flavor/`, parse);
      if (resp.status === 200) {
        return { ...resp.data, status: "registered" };
      }
    } catch (error) {
      console.log(error);
      if (error.status === 400) {
        return { status: "exists" };
      }
    }
  }
);

export const updateFlavor = createAsyncThunk(
  "flavor/updateFlavor",
  async (data, thunkAPI) => {
    const parse = parseData(data);
    try {
      const resp = await apiUrl.put(`/api/flavor/${parse.id}/`, parse);
      if (resp.status === 200) {
        return { ...resp.data, status: "updated" };
      }
    } catch (error) {
      if (error.status === 400) {
        return { status: "exists" };
      }
    }
  }
);

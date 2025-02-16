import { getListClients } from "#services/client.js";
import { getAllClients } from "./clientSlice";

export const getClients = (list) => {
  return async (dispatch, getState) => {
    const listClients = await getListClients(list);
    dispatch(getAllClients(listClients));
  };
};

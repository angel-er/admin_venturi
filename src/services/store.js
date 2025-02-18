import apiUrl from "#services/config.js";

export const getListStores = async () => {
  try {
    const resp = await apiUrl.get(`/api/store/`);
    if (resp.status === 200) {
      return resp.data?.stores;
    }
  } catch (error) {
    console.log("ERROR LIST PRODUCTS: ", error);
  }
};

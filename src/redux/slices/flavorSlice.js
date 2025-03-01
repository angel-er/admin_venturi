import { createFlavor, updateFlavor } from "#services/flavor.js";
import { createSlice } from "@reduxjs/toolkit";

const initState = {
  flavors: [],
  error: null,
  status: "uninitialized",
  header: [
    {
      field: "id",
      type: "id",
      headerName: "ID",
      cellClassName: "id",
    },
    {
      field: "flavor",
      headerName: "Sabor",
      // width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "available",
      headerName: "Activo",
      // width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "crated",
      headerName: "Fecha",
      // width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      cellClassName: "actions",
    },
  ],
};

const flavorSlice = createSlice({
  name: "Flavor",
  initialState: initState,
  reducers: {
    getAllFlavors: (state, action) => {
      if (action.payload.status === 200) {
        console.log(action);
        state.flavors = action.payload.data.reverse();
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createFlavor.pending, (state, action) => {
        state.status = "ĺoading";
      })
      .addCase(createFlavor.fulfilled, (state, action) => {
        if (action.payload.status === "registered") {
          state.flavors.unshift(action.payload);
        }
        state.status = action.payload.status;
      })
      .addCase(createFlavor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.message;
      })
      .addCase(updateFlavor.pending, (state, action) => {
        state.status = "ĺoading";
      })
      .addCase(updateFlavor.fulfilled, (state, action) => {
        if (action.payload.status === "updated") {
          state.flavors = state.flavors.map((c, idx) =>
            c.id === action.payload.id ? action.payload : c
          );
        }
        state.status = action.payload.status;
      })
      .addCase(updateFlavor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.message;
      });
  },
});

export const { getAllFlavors } = flavorSlice.actions;

export default flavorSlice.reducer;

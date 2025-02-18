import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Divider, Typography } from "@mui/material";
import AddTaskIcon from "@mui/icons-material/AddTask";

import CustomizedDialogs from "./Form.js";
import ListStore from "./Table.js";
import theme from "#config/theme.js";
import { createStore, getListStores } from "#services/store.js";
import { getAllStores } from "#redux/slices/storeSlice.js";

function StoreContainer(params) {
  const dispatch = useDispatch();

  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [store, setStore] = useState({});
  const [titleModal, setTitleModal] = useState("");

  const { stores, header, status, error } = useSelector((state) => state.Store);

  const handleClick = (id, action) => {
    setTitleModal("AGREGAR PRODUCTO COMPRADO");
    setOpen(!open);
  };
  const handleClickEdit = (row) => {
    setTitleModal("ACTUALIZAR/CAMBIAR DATOS");
    setStore(row);
    setOpen(!open);
  };

  const handleSaveData = (data) => {
    dispatch(createStore(data));
  };
  const handleClickDelete = (id) => {
    console.log("Delete Producto: ", id);
    setTitleModal("ELIMINAR");
    setOpen(!open);
  };

  useEffect(() => {
    const resp = getListStores();
    resp.then((store) => dispatch(getAllStores(store)));
  }, []);

  return (
    <Box>
      <Typography sx={styles.pageTitle} variant="h5">
        PRODUCTOS EN ALMACEN
      </Typography>
      <Divider style={styles.divider} />
      <Box sx={styles.columnContainer}>
        <ListStore
          rows={stores}
          columns={header}
          valueButton="Agregar compra"
          iconButton={<AddTaskIcon />}
          handleClick={handleClick}
          handleClickEdit={handleClickEdit}
          handleClickDelete={handleClickDelete}
        />
      </Box>
      <CustomizedDialogs
        open={open}
        handleClick={handleClick}
        onSubmit={handleSaveData}
        title={titleModal}
        data={store}
        messageDelete="Está seguro que desea eliminar el producto?"
      />
    </Box>
  );
}

/** @type {import("@mui/material").SxProps} */
const styles = {
  divider: { mb: 3, borderColor: theme.palette.grey.main, marginBottom: 10 },
  pageTitle: {
    mb: 5,
  },
  columnContainer: {
    // columns: "280px 3",
    // maxWidth: 1400,
  },
};

export default StoreContainer;

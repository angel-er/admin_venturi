import { Box, Typography } from "@mui/material";
import AddTaskIcon from "@mui/icons-material/AddTask";
import CustomizedDialogs from "./Form.js";
import { useEffect, useState } from "react";
import ListStore from "./Table.js";
import { colStore, rowStore } from "./data-random.js";

function StoreContainer(params) {
  const [columns, setColumns] = useState([]);
  const [store, setStore] = useState([]);
  const [open, setOpen] = useState(false);
  const [client, setClient] = useState({});
  const [titleModal, setTitleModal] = useState("");

  const handleClick = (id, action) => {
    setTitleModal("AGREGAR PRODUCTO AL ALMACEN");
    setOpen(!open);
  };
  const handleClickEdit = (row) => {
    setTitleModal("ACTUALIZAR/CAMBIAR DATOS");
    setClient(row);
    setOpen(!open);
  };

  const handleSaveData = (data) => {
    console.log(data);
  };
  const handleClickDelete = (id) => {
    console.log("Delete Producto: ", id);
    setTitleModal("ELIMINAR");
    setOpen(!open);
  };

  useEffect(() => {
    // fetch("https://fakestoreapi.com/products/1")
    //   .then((res) => res.json())
    //   .then((json) => {
    //     console.log(json);

    setColumns(colStore);
    console.log("rowStore: ", rowStore);
    setStore(rowStore);
    // });
  }, []);

  return (
    <Box>
      <Typography sx={styles.pageTitle} variant="h5">
        PRODUCTOS EN ALMACEN
      </Typography>
      <Box sx={styles.columnContainer}>
        <ListStore
          rows={store}
          columns={columns}
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
        data={client}
        messageDelete="Está seguro que desea eliminar el producto?"
      />
    </Box>
  );
}

/** @type {import("@mui/material").SxProps} */
const styles = {
  pageTitle: {
    mb: 5,
  },
  columnContainer: {
    // columns: "280px 3",
    // maxWidth: 1400,
  },
};

export default StoreContainer;

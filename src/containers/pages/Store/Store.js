import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Divider, Typography } from "@mui/material";
import AddTaskIcon from "@mui/icons-material/AddTask";

import CustomizedDialogs from "./Form.js";
import ListStore from "./Table.js";
import theme from "#config/theme.js";

function StoreContainer(params) {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [client, setClient] = useState({});
  const [titleModal, setTitleModal] = useState("");

  const { stores, header } = useSelector((state) => state.Store);

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

    setColumns(header);
    console.log("rowStore: ", stores);
    setRows(stores);
    // });
  }, [stores, header]);

  return (
    <Box>
      <Typography sx={styles.pageTitle} variant="h5">
        PRODUCTOS EN ALMACEN
      </Typography>
      <Divider style={styles.divider} />
      <Box sx={styles.columnContainer}>
        <ListStore
          rows={rows}
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

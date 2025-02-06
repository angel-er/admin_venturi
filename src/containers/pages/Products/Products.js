import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Typography, Box, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import CustomizedDialogs from "./Form.js";
import ListProducts from "./Table";
import theme from "#config/theme.js";

function ProductsContainer(params) {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [client, setClient] = useState({});
  const [titleModal, setTitleModal] = useState("");

  const { products, header } = useSelector((state) => state.Product);

  const handleClick = (id, action) => {
    setTitleModal("AGREGAR NUEVO PRODUCTO");
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

    setColumns(
      header.concat([
        {
          field: "actions",
          type: "actions",
          headerName: "Acciones",
          cellClassName: "actions",
        },
      ])
    );
    setRows(products);
    // });
  }, [header, products]);

  console.log(products);
  return (
    <Box>
      <Typography sx={styles.pageTitle} variant="h5">
        PRODUCTOS EN VENTA
      </Typography>
      <Divider style={styles.divider} />
      <Box>
        <ListProducts
          rows={rows}
          columns={columns}
          valueButton="Agregar producto"
          iconButton={<AddIcon />}
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
    columns: "280px 3",
    maxWidth: 1400,
  },
};
export default ProductsContainer;

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import CustomizedDialogs from "./Form.js";
import ListProducts from "./Table";
import theme from "#config/theme.js";
import {
  createProduct,
  deleteProduct,
  getListProducts,
  updateProduct,
} from "#services/product.js";
import { getAllProducts } from "#redux/slices/productSlice.js";
import { message } from "antd";

function ProductsContainer(params) {
  const dispatch = useDispatch();
  let refMessage = useRef("");
  const [messageApi, contextHolder] = message.useMessage();

  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState({});
  const [titleModal, setTitleModal] = useState("");

  const { products, header, status, error } = useSelector(
    (state) => state.Product
  );

  const handleClick = (id, action) => {
    setTitleModal("AGREGAR NUEVO PRODUCTO");
    setProduct({});
    setOpen(!open);
  };
  const handleClickEdit = (row) => {
    setTitleModal("ACTUALIZAR/CAMBIAR DATOS");
    setProduct(row);
    setOpen(!open);
  };

  const handleClickDelete = (row) => {
    setTitleModal("ELIMINAR");
    setProduct(row);
    setOpen(!open);
  };

  const handleSaveData = (data) => {
    if (!titleModal.search("AGREGAR")) {
      dispatch(createProduct(data));
    }

    if (!titleModal.search("ACTUALIZAR")) {
      dispatch(updateProduct(data));
    }

    if (!titleModal.search("ELIMINAR")) {
      dispatch(deleteProduct(data.id));
    }
  };

  useEffect(() => {
    // const resp = getListProducts();
    // resp.then((p) => dispatch(getAllProducts(p)));

    if (status === "registered") {
      refMessage.current = `registrados`;
      messageApi.open({
        type: "success",
        content: `Los datos fueron ${refMessage.current}.`,
        duration: 5,
      });
      setProduct({});
      setOpen(false);
    }

    if (status === "error") {
      refMessage.current = `error`;
      messageApi.open({
        type: "error",
        content: `Hubo un ${refMessage.current}, el producto ya existe`,
      });
    }

    if (status === "updated") {
      refMessage.current = `actualizados`;
      messageApi.open({
        type: "success",
        content: `Los datos fueron ${refMessage.current}.`,
        duration: 5,
      });
      setProduct({});
      setOpen(false);
    }
    if (status === "deleted") {
      refMessage.current = `eliminados`;
      messageApi.open({
        type: "success",
        content: `Los datos fueron ${refMessage.current}.`,
        duration: 5,
      });
      setProduct({});
      setOpen(false);
    }
  }, [dispatch, messageApi, status]);

  return (
    <Box>
      {contextHolder}
      <Typography sx={styles.pageTitle} variant="h5">
        PRODUCTOS EN VENTA
      </Typography>
      <Divider style={styles.divider} />
      <Box>
        <ListProducts
          rows={products}
          columns={header}
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
        data={product}
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

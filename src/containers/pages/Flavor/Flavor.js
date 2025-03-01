import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import ListFlavors from "./Table";
import theme from "#config/theme.js";
import {
  createFlavor,
  updateFlavor,
  //   deleteFlavor,
} from "#services/flavor.js";
import { message } from "antd";
import CustomizedDialogs from "./Form.js";

function FlavorContainer(params) {
  const dispatch = useDispatch();
  let refMessage = useRef("");
  const [messageApi, contextHolder] = message.useMessage();

  const [open, setOpen] = useState(false);
  const [flavor, setProduct] = useState({});
  const [titleModal, setTitleModal] = useState("");

  const { flavors, header, status } = useSelector((state) => state.Flavor);

  const handleClick = (id, action) => {
    setTitleModal("AGREGAR NUEVO SABOR");
    setProduct({});
    setOpen(!open);
  };
  const handleClickEdit = (row) => {
    setTitleModal("CORREGIR SABOR");
    setProduct(row);
    setOpen(!open);
  };

  const handleCheckbox = (e, row) => {
    const { checked } = e.target;
    dispatch(updateFlavor({ ...row, available: checked }));
  };

  const handleClickDelete = (row) => {
    setTitleModal("ELIMINAR");
    setProduct(row);
    setOpen(!open);
  };

  const handleSaveData = (data) => {
    if (!titleModal.search("AGREGAR")) {
      dispatch(createFlavor(data));
    }

    if (!titleModal.search("CORREGIR")) {
      dispatch(updateFlavor(data));
    }

    if (!titleModal.search("ELIMINAR")) {
      //   dispatch(deleteProduct(data.id));
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

    if (status === "exists") {
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
        SABORES DE HELADOS
      </Typography>
      <Divider style={styles.divider} />
      <Box>
        <ListFlavors
          rows={flavors}
          columns={header}
          valueButton="Agregar sabor"
          iconButton={<AddIcon />}
          handleClick={handleClick}
          handleClickEdit={handleClickEdit}
          handleClickDelete={handleClickDelete}
          handleCheckbox={handleCheckbox}
        />
      </Box>
      <CustomizedDialogs
        open={open}
        handleClick={handleClick}
        onSubmit={handleSaveData}
        title={titleModal}
        data={flavor}
        messageDelete="Está seguro que desea eliminarlo?"
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
export default FlavorContainer;

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Divider, Typography } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { message } from "antd";
import CustomizedDialogs from "./Form.js";
import Table from "#containers/pages/Client/Table.js";
import theme from "#config/theme.js";
import { getAllClients } from "#redux/slices/clientSlice.js";
import {
  createClient,
  getListClients,
  updateClient,
  deleteClient,
} from "#services/client.js";

function ClientsContainer(params) {
  let refMessage = useRef("");
  const [messageApi, contextHolder] = message.useMessage();

  const [open, setOpen] = useState(false);
  const [columns, setColumns] = useState([]);
  const [client, setClient] = useState({});
  const [titleModal, setTitleModal] = useState("");

  const { clients, header, status } = useSelector((state) => state.Client);
  const dispatch = useDispatch();

  const handleClick = () => {
    setTitleModal("AGREGAR NUEVO CLIENTE");
    setClient({});
    setOpen(!open);
  };
  const handleClickEdit = (row) => {
    setTitleModal("ACTUALIZAR/CAMBIAR DATOS");
    setClient(row);
    setOpen(!open);
  };

  const handleClickDelete = (row) => {
    setTitleModal("ELIMINAR");
    setClient(row);
    setOpen(!open);
  };

  const handleSaveData = (data) => {
    if (!titleModal.search("AGREGAR")) {
      dispatch(createClient(data));
    }

    if (!titleModal.search("ACTUALIZAR")) {
      dispatch(updateClient(data));
    }

    if (!titleModal.search("ELIMINAR")) {
      dispatch(deleteClient(data.id));
    }
  };

  useEffect(() => {
    const loadColumns = async () => {
      const columns = await header.concat([
        {
          field: "actions",
          type: "actions",
          headerName: "Acciones",
          cellClassName: "actions",
        },
      ]);
      setColumns(columns);
    };
    loadColumns();
    const data = getListClients();
    data.then((da) => dispatch(getAllClients(da)));

    if (status === "registered") {
      refMessage.current = `registrado`;
      messageApi.open({
        type: "success",
        content: `Los datos fueron ${refMessage.current}`,
        duration: 5,
      });
      setClient({});
      setOpen(false);
    }

    if (status === "error") {
      refMessage.current = `error`;
      messageApi.open({
        type: "error",
        content: `Hubo un ${refMessage.current}, el teléfono o mail ya estan registrados`,
      });
    }

    if (status === "updated") {
      refMessage.current = `actualizados`;
      messageApi.open({
        type: "success",
        content: `Los datos fueron ${refMessage.current}.`,
        duration: 5,
      });
      setClient({});
      setOpen(false);
    }
    if (status === "deleted") {
      refMessage.current = `eliminados`;
      messageApi.open({
        type: "success",
        content: `Los datos fueron ${refMessage.current}.`,
        duration: 5,
      });
      setClient({});
      setOpen(false);
    }
  }, [dispatch, header, status, messageApi]);

  return (
    <Box style={styles.container}>
      {contextHolder}
      <Typography sx={styles.pageTitle} variant="h5">
        LISTA DE CLIENTES
      </Typography>
      <Divider style={styles.divider} />
      <Table
        valueButton="Agregar Cliente"
        iconButton={<PersonAddIcon />}
        handleClick={handleClick}
        handleClickEdit={handleClickEdit}
        handleClickDelete={handleClickDelete}
        columns={columns}
        rows={clients}
      />
      <CustomizedDialogs
        open={open}
        handleClick={handleClick}
        onSubmit={handleSaveData}
        title={titleModal}
        data={client}
        messageDelete="Está seguro que desea eliminar los datos del cliente?"
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
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
  container: {
    // columns: "280px 3",
    height: "100%",
  },
};

export default ClientsContainer;

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import CustomizedDialogs from "./Form.js";
import Table from "#containers/pages/Client/Table.js";

function ClientsContainer(params) {
  const [open, setOpen] = useState(false);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [client, setClient] = useState({});
  const [titleModal, setTitleModal] = useState("");

  const { clients, header } = useSelector((state) => state.Client);

  const handleClick = (id, action) => {
    setTitleModal("AGREGAR NUEVO CLIENTE");
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
    console.log("Delete Client: ", id);
    setTitleModal("ELIMINAR");
    setOpen(!open);
  };

  useEffect(() => {
    const loadData = async () => {
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
    loadData();
    setRows(clients);
  }, [clients, header]);

  return (
    <Box style={styles.container}>
      <Typography sx={styles.pageTitle} variant="h5">
        LISTA DE CLIENTES
      </Typography>
      <Table
        valueButton="Agregar Cliente"
        iconButton={<PersonAddIcon />}
        handleClick={handleClick}
        handleClickEdit={handleClickEdit}
        handleClickDelete={handleClickDelete}
        columns={columns}
        rows={rows}
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

import { Box, Typography } from "@mui/material";
import { Divider } from "antd";
import ListInvoices from "./Table";
import { useSelector } from "react-redux";
import theme from "#config/theme.js";

function InvoicesContainer() {
  const { tickets, header } = useSelector((state) => state.Ticket);

  const handleViewClick = (data) => {
    console.log("VIEW MORE DATA: ", data);
  };
  return (
    <Box>
      <Typography sx={styles.pageTitle} variant="h5">
        LISTA DE FACTURAS DIARIAS
      </Typography>

      <Divider style={styles.divider} />
      <Box>
        <ListInvoices
          rows={tickets}
          columns={header}
          // valueButton="Agregar producto"
          // iconButton={<AddIcon />}
          handleClick={handleViewClick}
          // handleClickEdit={handleClickEdit}
          // handleClickDelete={handleClickDelete}
        />
      </Box>
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

export default InvoicesContainer;

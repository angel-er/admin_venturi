import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { Divider } from "antd";
import ListInvoices from "./Table";
import { useSelector } from "react-redux";
import theme from "#config/theme.js";
import TicketDetail from "./Detail";

function InvoicesContainer() {
  const { tickets, header } = useSelector((state) => state.Ticket);

  const [openDetail, setOpenDetail] = useState(false);
  const [detail, setDetail] = useState({});

  const handleViewClick = (data) => {
    console.log("VIEW MORE DATA: ", data);
    setDetail(data);
    setOpenDetail(!openDetail);
  };
  const handleDetailClick = (data) => {
    setOpenDetail(!openDetail);
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
          handleClick={handleViewClick}
        />
      </Box>
      <TicketDetail
        handleClick={handleDetailClick}
        open={openDetail}
        title="Detalle del Ticket"
        data={detail}
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

export default InvoicesContainer;

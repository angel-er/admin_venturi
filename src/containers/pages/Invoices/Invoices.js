import { Box, Typography } from "@mui/material";

function InvoicesContainer() {
  return (
    <Box>
      <Typography sx={styles.pageTitle} variant="h5">
        LISTA DE FACTURAS
      </Typography>
      <Box sx={styles.columnContainer}></Box>
    </Box>
  );
}

/** @type {import("@mui/material").SxProps} */
const styles = {
  pageTitle: {
    mb: 5,
  },
  columnContainer: {
    columns: "280px 3",
    maxWidth: 1400,
  },
};

export default InvoicesContainer;

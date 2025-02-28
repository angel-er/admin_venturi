import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Box, Divider, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";

import PrintButton from "#utils/ButtonPrintPDF.js";
import CustomizedDialogs from "#components/Modal.js";
import { formatDate } from "#helpers/formatDate.js";
import theme from "#config/theme.js";
import { Table } from "antd";

const columns = [
  {
    title: "Producto",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Cant.",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Precio Bs.",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Subtotal Bs.",
    dataIndex: "subtotal",
    key: "subtotal",
  },
];

export default function TicketDetail({ handleClick, open, title, data = {} }) {
  const cancelModal = () => {
    handleClick();
  };

  const clickPrint = () => {};

  return (
    <CustomizedDialogs open={open} handleClick={handleClick} title={title}>
      <DialogContent dividers>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1} sx={{ flexGrow: 1 }}>
            <Grid
              offset={{ xs: 6, md: 8 }}
              sx={{ textAlign: "right", marginBottom: 5 }}
            >
              <Typography variant="h4">TICKET</Typography>
              <Typography variant="h7" style={styles.typography}>
                Fecha: {formatDate(new Date(data?.date))}
              </Typography>
              <Typography style={styles.typography} variant="h7">
                Nº ticket: THV-0000{data.id}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={6}>
            <Grid size={{ md: 7 }}>
              <Typography variant="h6">HELADERIA VENTURI</Typography>
              <Typography variant="h7" style={styles.typography}>
                NIT: 6258103014
              </Typography>
              <Typography variant="h7" style={styles.typography}>
                C/ Obispo Santi Esteban, Mairana, Santa Cruz de la Sierra
              </Typography>
              <Typography variant="h7" style={styles.typography}>
                Telefono: 64499559
              </Typography>
              <Typography variant="h7" style={styles.typography}>
                e-Mail: venturihelados@gmail.com
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Typography variant="h6">CLIENTE </Typography>
              <Divider style={styles.divider} />
              <Box>
                <Typography variant="h7" style={styles.typography}>
                  {data.client?.name} {data.client?.last_name}
                </Typography>
                <Typography variant="h7" style={styles.typography}>
                  C.I.: 000000000
                </Typography>
                <Typography variant="h7" style={styles.typography}>
                  MAIRANA, S/N
                </Typography>
                <Typography variant="h7" style={styles.typography}>
                  SANTA CRUZ
                </Typography>
                <Typography variant="h7" style={styles.typography}>
                  BOLIVIA
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Table
            columns={columns}
            dataSource={
              data?.items?.length > 0
                ? data.items.map((item) => {
                    return { ...item, name: item.product.name_product };
                  })
                : []
            }
            pagination={false}
            loading={!data ? true : false}
          />
        </Box>
        <Divider sx={{ marginTop: 4 }} style={styles.divider} />
        <Grid container spacing={1}>
          <Grid size={{ xs: 8, md: 9 }}>
            <Typography
              variant="h7"
              style={{
                ...styles.typography,
                textAlign: "right",
                fontWeight: "bold",
              }}
            >
              Total:
            </Typography>
            <Divider />
            <Typography
              variant="h7"
              style={{ ...styles.typography, textAlign: "right" }}
            >
              Pago Efectivo:
            </Typography>
            <Typography
              variant="h7"
              style={{ ...styles.typography, textAlign: "right" }}
            >
              Pago QR:
            </Typography>
            <Typography
              variant="h7"
              style={{ ...styles.typography, textAlign: "right" }}
            >
              IVA (21%):
            </Typography>
            <Typography
              variant="h7"
              style={{ ...styles.typography, textAlign: "right" }}
            >
              Cancelado:
            </Typography>
            <Typography
              variant="h7"
              style={{ ...styles.typography, textAlign: "right" }}
            >
              Cambio:
            </Typography>
          </Grid>
          <Grid size={{ xs: 4, md: 3 }}>
            <Typography
              variant="h7"
              style={{
                ...styles.typography,
                textAlign: "right",
                fontWeight: "bold",
              }}
            >
              {data.total_amount} Bs.
            </Typography>
            <Divider />
            <Typography
              variant="h7"
              style={{ ...styles.typography, textAlign: "right" }}
            >
              {data.payment_cash} Bs.
            </Typography>
            <Typography
              variant="h7"
              style={{ ...styles.typography, textAlign: "right" }}
            >
              {data.payment_qr} Bs.
            </Typography>
            <Typography
              variant="h7"
              style={{ ...styles.typography, textAlign: "right" }}
            >
              0.00 Bs.
            </Typography>
            <Typography
              variant="h7"
              style={{ ...styles.typography, textAlign: "right" }}
            >
              {data.total_canceled} Bs.
            </Typography>
            <Typography
              variant="h7"
              style={{ ...styles.typography, textAlign: "right" }}
            >
              {data.change} Bs.
            </Typography>
          </Grid>
        </Grid>

        {/* <Divider style={styles.divider} /> */}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={cancelModal}>
          CERRAR
        </Button>
        <PrintButton clickPrint={clickPrint} data={data} />
      </DialogActions>
    </CustomizedDialogs>
  );
}

/** @type {import("@mui/material").SxProps} */
const styles = {
  divider: { borderColor: theme.palette.grey.main, marginBottom: 5 },
  typography: { display: "block", borderColor: theme.palette.grey },
  pageTitle: {
    mb: 5,
  },
  columnContainer: {
    columns: "280px 3",
    maxWidth: 1400,
  },
};

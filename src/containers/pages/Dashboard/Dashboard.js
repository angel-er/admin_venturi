import { Box, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

import { LineGraph } from "#components/ChartLine.js";
import { barChartData, lineChartData } from "./FAKE_DATA";
import { BarGraph } from "#components/ChartBar.js";
import theme from "#config/theme.js";

function DashboardContainer() {
  const options = {};
  return (
    <Box>
      <Typography sx={styles.pageTitle} variant="h5">
        ESTADISTICA
      </Typography>

      <Divider style={styles.divider} />
      <Grid container spacing={10}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography sx={{ textAlign: "center" }}>VENTAS DIARIAS</Typography>
          <LineGraph options={options} data={lineChartData} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography sx={{ textAlign: "center" }}>
            VENTAS POR SEMANA
          </Typography>
          <BarGraph options={options} data={barChartData} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography sx={{ textAlign: "center" }}>
            PRODUCTO MAS VENDIDO
          </Typography>
          <BarGraph options={options} data={barChartData} />
        </Grid>
      </Grid>
    </Box>
  );
}

const styles = {
  divider: { mb: 3, borderColor: theme.palette.grey.main, marginBottom: 20 },
  pageTitle: {
    mb: 5,
  },
};

export default DashboardContainer;

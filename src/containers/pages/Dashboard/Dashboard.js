import { Box, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

function DashboardContainer() {
  return (
    <Box>
      <Typography sx={styles.pageTitle} variant="h5">
        ESTADISTICA
      </Typography>

      <Divider style={styles.divider} />
      <Grid container spacing={1}>
        <Grid size={6}></Grid>
        <Grid size={6}></Grid>
      </Grid>
    </Box>
  );
}

const styles = {};

export default DashboardContainer;

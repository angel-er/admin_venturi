import "./App.css";
import { Box } from "@mui/material";
import AppProvider from "./AppProvider.js";
import NavHeader from "#components/AppHeader.js";
import { BrowserRouter } from "react-router-dom";
import SideNav from "#components/SideNav.js";
import AppRoutes from "#router/AppRouter.js";

function App() {
  return (
    <AppProvider>
      <NavHeader />
      <Box sx={styles.container}>
        <BrowserRouter>
          <SideNav />
          <Box component={"main"} sx={styles.mainSection}>
            <AppRoutes />
          </Box>
        </BrowserRouter>
      </Box>
    </AppProvider>
  );
}

/** @type {import("@mui/material").SxProps} */
const styles = {
  container: {
    display: "flex",
    bgcolor: "neutral.light",
    height: "calc(100% - 64px)",
  },
  mainSection: {
    p: 4,
    width: "100%",
    height: "100%",
  },
};

export default App;

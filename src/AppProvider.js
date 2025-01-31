import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import React, { Suspense } from "react";
import FallbackLoader from "#components/loader/Loader";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import theme from "#config/theme.js";
import SideNav from "#components/SideNav.js";
import NavHeader from "#components/AppHeader.js";
import { ProSidebarProvider } from "react-pro-sidebar";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "#router/AppRouter.js";

function AppProvider() {
  return (
    <ThemeProvider theme={theme}>
      <ProSidebarProvider>
        <Suspense fallback={<FallbackLoader />}>
          <CssBaseline />
          <NavHeader />
          <Box sx={styles.container}>
            <BrowserRouter>
              <SideNav />
              <Box component={"main"} sx={styles.mainSection}>
                <AppRoutes />
              </Box>
            </BrowserRouter>
          </Box>
        </Suspense>
      </ProSidebarProvider>
    </ThemeProvider>
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
export default AppProvider;

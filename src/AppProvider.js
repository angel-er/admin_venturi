import { CssBaseline, ThemeProvider } from "@mui/material";
import React, { Suspense } from "react";
import FallbackLoader from "#components/loader/Loader";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import theme from "#config/theme.js";
import { ProSidebarProvider } from "react-pro-sidebar";

function AppProvider({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <ProSidebarProvider>
        <Suspense fallback={<FallbackLoader />}>
          <CssBaseline />
          {children}
        </Suspense>
      </ProSidebarProvider>
    </ThemeProvider>
  );
}

export default AppProvider;

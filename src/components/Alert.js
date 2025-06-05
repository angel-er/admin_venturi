import { Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

function AlertCustom({ message, openAlert }) {
  return (
    <Alert
      severity="error"
      style={{ backgroundColor: "rgb(82 0 124 / 23%)" }}
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => openAlert}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
      sx={{ mb: 2 }}
    >
      {message}
    </Alert>
  );
}
export default AlertCustom;

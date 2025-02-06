import React, { useState } from "react";
import "./style.css";
import ticket from "./ticket.js";
import { Box, Button } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";

export default function PrintButton({ clickPrint, data = {} }) {
  const [base64, setBase64] = useState("");
  const [, setMessage] = useState("");

  const onGenerateTicket = async (output) => {
    setBase64("");
    setMessage("");

    const response = await ticket(output, data);

    if (!response?.success) {
      alert(response?.message);
      return;
    }

    if (output === "b64") {
      setBase64(response?.content ?? "");
    }

    setMessage(response?.message);

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  const onClickPrint = () => {
    clickPrint();
    onGenerateTicket("print");
  };

  return (
    <Box>
      <Button
        // className="mx-btn-secondary"
        onClick={onClickPrint}
        variant="outlined"
        startIcon={<PrintIcon />}
      >
        IMPRIMIR TICKET
      </Button>
      {base64 && (
        /** jsx-a11y/iframe-has-title **/
        <iframe
          src={`data:application/pdf;base64,${base64}`}
          className="mx-iframe"
        />
      )}
      <div id="yourContainerId" />
    </Box>
  );
}

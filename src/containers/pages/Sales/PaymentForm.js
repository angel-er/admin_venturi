import { Fragment, useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import WarningIcon from "@mui/icons-material/Warning";
import VerifiedIcon from "@mui/icons-material/Verified";
import DangerousIcon from "@mui/icons-material/Dangerous";
import Grid from "@mui/material/Grid2";
import { useForm } from "react-hook-form";

import CustomizedDialogs from "#components/Modal.js";
import imageCard from "../../../assets/image/card.jpeg";
import { useSelector } from "react-redux";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const convertMethod = {
  Efectivo: "cash",
  QR: "qr",
  Tarjeta: "card",
};
export default function PaymentForm({
  handleClick,
  open,
  title,
  onSubmit,
  data,
  clients,
  paymentType,
  total,
}) {
  const {
    // handleSubmit,
    setValue,
    // reset,
    formState: { errors },
  } = useForm({ defaultValues: {} });

  const { serviceType } = useSelector((state) => state.Ticket);

  const [idClient, setIdClient] = useState();
  const [methodPaymentSelect, setMethodPaymentSelect] = useState([]);
  const [payments, setPayments] = useState({ cash: 0, qr: 0, card: 0 });
  const [change, setChange] = useState(0);
  const [nameServiceType, setNameServiceType] = useState("dine_in");

  const handleSelectClient = (event) => {
    const {
      target: { value },
    } = event;
    setIdClient(value);
    setValue("id_client", value);
  };

  const handleSelectServiceType = (event) => {
    const {
      target: { value },
    } = event;
    setNameServiceType(value);
  };

  const handleSelectMethodPayment = (event) => {
    const { target } = event;
    if (target.checked) {
      setMethodPaymentSelect(methodPaymentSelect.concat([target.name]));
    } else {
      setMethodPaymentSelect(
        methodPaymentSelect.filter((t) => t !== target.name)
      );
      setPayments({ ...payments, [convertMethod[target.name]]: 0 });
    }
  };

  const handleChangeText = (data) => {
    const { target } = data;
    setPayments({ ...payments, [target.name]: target.value });
  };

  useEffect(() => {
    setValue("list_products", data);
    let sum = 0;
    for (let key in payments) {
      sum += Number(payments[key]);
    }
    setChange(sum - total);
  }, [data, setValue, payments, total]);

  const cancelModal = () => {
    // reset();
    setIdClient(null);
    setMethodPaymentSelect([]);
    setChange(0);
    setPayments({ cash: 0, qr: 0, card: 0 });
    handleClick();
  };

  const handleSubmit = () => {
    const formData = {
      idClient,
      methodPaymentSelect,
      payments,
      items: data,
      change,
      amountPaid: total,
      serviceType: nameServiceType,
    };

    if (
      methodPaymentSelect.length > 0 &&
      (payments.cash || payments.qr || payments.card)
    ) {
      setMethodPaymentSelect([]);
      setPayments({ cash: 0, qr: 0, card: 0 });
      setChange(0);
      onSubmit(formData);
      setNameServiceType("dine_in");
      handleClick();
    }
  };

  return (
    <Fragment>
      <CustomizedDialogs
        open={open}
        handleClick={cancelModal}
        title={
          <Box
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            <MonetizationOnOutlinedIcon color="green" size="large" /> {title}
          </Box>
        }
      >
        <form
          // onSubmit={() => handleSubmit}
          style={{ paddingLeft: 10, paddingRight: 10 }}
        >
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 7 }}>
                <FormControl sx={{ m: 1, width: "100%" }}>
                  <InputLabel id="demo-customized-select-label">
                    Cliente
                  </InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={idClient}
                    onChange={handleSelectClient}
                    input={<OutlinedInput label="Cliente" />}
                    MenuProps={MenuProps}
                  >
                    {clients.map((cl, idx) => (
                      <MenuItem key={`${cl.name}-${idx}`} value={cl.id}>
                        {`${cl.name} ${cl.last_name}`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 5 }}>
                <FormControl sx={{ m: 1, minWidth: "100%" }}>
                  <InputLabel id="demo-customized-select-label">
                    Tipo de servicio
                  </InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={nameServiceType}
                    onChange={handleSelectServiceType}
                    input={<OutlinedInput label="Tipo de servicio" />}
                    MenuProps={MenuProps}
                  >
                    {serviceType.map((cl, idx) => (
                      <MenuItem
                        key={`${cl.type}-${idx}`}
                        value={cl.id}
                        //   style={getStyles(cl.name, personName, theme)}
                      >
                        {`${cl.type}`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Divider style={styles.divider} />
            <Box>
              <Box sx={{ display: "flex" }}>
                <Typography sx={{ marginRight: 2 }}>
                  Seleccione el tipo de pago:{" "}
                </Typography>
                <Box component="img" sx={styles.appLogo} src={imageCard} />
              </Box>
              <FormGroup
                sx={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                {paymentType.map((type, idx) => {
                  return (
                    <FormControlLabel
                      key={idx}
                      control={
                        <Checkbox
                          disabled={type.type === "Tarjeta"}
                          helperText={errors?.methodPaymentSelect?.message}
                          name={type.type}
                          onChange={handleSelectMethodPayment}
                        />
                      }
                      label={type.type}
                    />
                  );
                })}
              </FormGroup>
            </Box>
            <Divider style={styles.divider} />
            <Typography>Total a pagar: Bs. {total}</Typography>
            <Divider style={styles.divider} />
            <Box sx={{ display: "flex", gap: 3 }}>
              <TextField
                disabled={!methodPaymentSelect.find((m) => m === "Efectivo")}
                name="cash"
                type="number"
                label="Pago efectivo"
                value={payments.cash}
                onChange={handleChangeText}
                helperText={
                  methodPaymentSelect.find((m) => m === "Efectivo") &&
                  payments.cash <= 0 &&
                  "Por favor ingresa una cantidad"
                }
                sx={{ mb: 2 }}
              />

              <TextField
                disabled={!methodPaymentSelect.find((m) => m === "QR")}
                type="number"
                name="qr"
                label="Pago con QR"
                value={payments.qr}
                onChange={handleChangeText}
                helperText={
                  methodPaymentSelect.find((m) => m === "QR") &&
                  payments.qr <= 0 &&
                  "Por favor ingresa una cantidad"
                }
                sx={{ mb: 2 }}
              />

              <TextField
                disabled
                type="number"
                name="card"
                label="Pago con Tarjeta"
                onChange={handleChangeText}
                helperText={
                  methodPaymentSelect.find((m) => m === "Tarjeta") &&
                  "Porfavor ingrese una cantidad"
                }
                sx={{ mb: 2 }}
              />
            </Box>
            {methodPaymentSelect.length > 0 && (
              <Fragment>
                <Divider style={styles.divider} />
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {change > 0 && <WarningIcon color="warning" />}
                  {change < 0 && <DangerousIcon color="error" />}
                  {change === 0 && <VerifiedIcon color="success" />}
                  <Typography>
                    {change > 0 ? `Cambio: Bs.` : `Falta: Bs.`}
                    {change}
                  </Typography>
                </Box>
              </Fragment>
            )}
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={cancelModal}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit} autoFocus>
              Pagar
            </Button>
          </DialogActions>
        </form>
      </CustomizedDialogs>
    </Fragment>
  );
}

/** @type {import("@mui/material").SxProps} */
const styles = {
  divider: { marginBottom: 10, marginTop: 10 },
  appLogo: {
    width: 100,
  },
};

import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useEffect } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import CustomizedDialogs from "#components/Modal.js";

export default function FormAddPurchase({
  handleClick,
  open,
  title,
  onSubmit,
  data,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    // reset,
    formState: { errors },
  } = useForm({ defaultValues: {} });

  useEffect(() => {
    setValue("name", data?.name);
    setValue("description", data?.description);
    setValue("id", data?.id);
    setValue("price", data?.price);
  }, [data, setValue]);

  const cancelModal = () => {
    // reset();
    handleClick();
  };

  return (
    <CustomizedDialogs open={open} handleClick={handleClick} title={title}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <Box>
            <Typography variant="h4">{data?.name}</Typography>
          </Box>
          <Box sx={{ mt: 3, mb: 3 }}>
            <Typography variant="h6">Descripción: </Typography>
            <Typography variant="span">{data.description}</Typography>
          </Box>
          <TextField
            type="number"
            label="Cantidad"
            {...register("quantity", {
              required: "Es necesario ingresar la cantidad",
            })}
            error={!!errors.quantity}
            helperText={errors.quantity?.message}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={cancelModal}>
            Cancelar
          </Button>
          <Button type="submit" autoFocus>
            Agregar al carrito
          </Button>
        </DialogActions>
      </form>
    </CustomizedDialogs>
  );
}

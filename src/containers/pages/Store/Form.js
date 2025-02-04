import { useEffect } from "react";
import { useForm } from "react-hook-form";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";

import CustomizedDialogs from "#components/Modal.js";

export default function Form({
  handleClick,
  open,
  title,
  onSubmit,
  data,
  messageDelete,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: {} });

  useEffect(() => {
    setValue("name", data.name);
    setValue("price", data.price);
    setValue("quantity", data.quantity);
  }, [data, setValue]);

  const cancelModal = () => {
    reset();
    handleClick();
  };

  return (
    <CustomizedDialogs open={open} handleClick={handleClick} title={title}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          {title !== "ELIMINAR" ? (
            <>
              <TextField
                label="Nombre"
                fullWidth
                {...register("name", { required: "El nombre es necesario" })}
                error={!!errors.name}
                helperText={errors.name?.message}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Cantidad"
                fullWidth
                {...register("quantity", {
                  required: "La cantidad es necesaria",
                })}
                error={!!errors.quantity}
                helperText={errors.quantity?.message}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Precio BS."
                fullWidth
                {...register("price", {
                  required: "El precio es necesario",
                })}
                error={!!errors.price}
                helperText={errors.price?.message}
                sx={{ mb: 2 }}
              />
            </>
          ) : (
            <Typography>{messageDelete}</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={cancelModal}>
            Cancelar
          </Button>
          <Button type="submit" autoFocus>
            {title !== "ELIMINAR" ? "Guardar" : "Eliminar"}
          </Button>
        </DialogActions>
      </form>
    </CustomizedDialogs>
  );
}

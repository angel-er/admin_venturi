import { useEffect } from "react";
import { useForm } from "react-hook-form";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";

import CustomizedDialogs from "#components/Modal.js";

export default function Modal({
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
    setValue("description", data.description);
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
                label="Precio"
                fullWidth
                {...register("price", {
                  required: "El precio es necesario",
                })}
                error={!!errors.price}
                helperText={errors.price?.message}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Descripción"
                fullWidth
                multiline
                rows={6}
                {...register("description")}
                error={!!errors.description}
                helperText={errors.description?.message}
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
            {`${title !== "ELIMINAR" ? "Guardar" : title}`}
          </Button>
        </DialogActions>
      </form>
    </CustomizedDialogs>
  );
}

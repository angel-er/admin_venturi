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
  data = {},
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
    setValue("flavor", data.flavor);
    setValue("available", data.available);
    setValue("id", data.id);
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
                label="Sabor"
                fullWidth
                {...register("flavor", {
                  required: "Este campo es obligatorio",
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
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
          <Button type="submit" autoFocus variant="outlined">
            {`${title !== "ELIMINAR" ? "Guardar" : title}`}
          </Button>
        </DialogActions>
      </form>
    </CustomizedDialogs>
  );
}

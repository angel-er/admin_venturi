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
  messageDelete = "",
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
    setValue("lastName", data.lastName);
    setValue("telephone", data.telephone);
    setValue("email", data.email);
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
                label="Apellido"
                fullWidth
                {...register("lastName", {
                  required: "El apellido es necesario",
                })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Numero de contacto"
                fullWidth
                {...register("telephone")}
                error={!!errors.telephone}
                helperText={errors.telephone?.message}
                sx={{ mb: 2 }}
              />
              <TextField
                type="mail"
                label="Correo electrónico"
                fullWidth
                {...register("email", {
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                    message: "El mail ingresado no es válido",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{ mb: 2 }}
              />{" "}
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

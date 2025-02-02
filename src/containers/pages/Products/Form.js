import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Fragment, useEffect } from "react";
import { TextareaAutosize, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs({
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
    <Fragment>
      <BootstrapDialog
        onClose={handleClick}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={cancelModal}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>

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
              Guardar
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </Fragment>
  );
}

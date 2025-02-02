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
    setValue("quantity", data.quantity);
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
      </BootstrapDialog>
    </Fragment>
  );
}

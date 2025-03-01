import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Fragment, useEffect, useState } from "react";
import { Box, Checkbox, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import CustomizedDialogs from "#components/Modal.js";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid2";

export default function FormAddPurchase({
  handleClick,
  open,
  title,
  onSubmit,
  data,
}) {
  const { flavors } = useSelector((state) => state.Flavor);
  const [checked, setChecked] = useState({});
  const [flavorSelected, setFlavorSelected] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    // reset,
    formState: { errors },
  } = useForm({ defaultValues: {} });

  useEffect(() => {
    setValue("name", data?.name_product);
    setValue("description", data?.description);
    setValue("id", data?.id);
    setValue("price", data?.price_product);
  }, [data, setValue, flavorSelected]);

  const cancelModal = () => {
    // reset();
    handleClick();
  };
  const handleCheckbox = (e) => {
    const { target } = e;
    setChecked({ ...checked, [target.name]: target.checked });
    target.checked
      ? setFlavorSelected(flavorSelected.concat([target.name]))
      : setFlavorSelected(flavorSelected.filter((s) => s !== target.name));
  };

  return (
    <CustomizedDialogs open={open} handleClick={handleClick} title={title}>
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit({ ...data, flavors: flavorSelected });
          setFlavorSelected([]);
          setChecked({});
        })}
      >
        <DialogContent dividers>
          <Box sx={{ marginBottom: 3 }}>
            <Typography variant="h4">{data?.name_product}</Typography>
            <Typography variant="span">{data.description}</Typography>
          </Box>
          {data?.name_product &&
            data?.name_product.toUpperCase().includes("HELADO") && (
              <Fragment>
                <Typography variant="h6">Selecciona los sabores:</Typography>
                <Grid container spacing={10}>
                  {flavors.length > 0 &&
                    flavors
                      .filter((f) => f.available)
                      .map((f) => (
                        <Grid key={f.id} size={4}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Checkbox
                              onChange={handleCheckbox}
                              checked={checked[f.flavor]?.checked}
                              name={f.flavor}
                            />
                            <Typography>{f.flavor}</Typography>
                          </Box>
                        </Grid>
                      ))}
                </Grid>
              </Fragment>
            )}
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

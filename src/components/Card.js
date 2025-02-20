import { Fragment } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";

function CardCustomer(
  {
    cardTitle,
    iconCardTitle,
    subheader,
    actions,
    titleHeader,
    totalSum,
    list = [],
    handleToggle,
    handleRemoveList,
    handOpenPaymentForm,
  },
  props
) {
  const theme = useTheme();

  return (
    <Card
      style={styles.card}
      sx={{
        background: theme.palette.grey.light,
        padding: "10px",
        // height: "50%",
        "&[data-active]": {
          backgroundColor: "action.selected",
          "&:hover": {
            backgroundColor: "action.selectedHover",
          },
        },
      }}
    >
      <CardHeader
        avatar={iconCardTitle}
        title={
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography color="primary">{cardTitle}</Typography>
            {actions && <Typography variant="h6">{totalSum}</Typography>}
          </Box>
        }
        subheader={subheader}
      />
      <Divider />
      <CardContent>
        <List
          sx={{
            height: window.innerHeight - 450,
            overflow: "auto",
          }}
          dense
          component="div"
          role="list"
        >
          {list.map((value, idx) => {
            const labelIdName = `transfer-list-all-item-${value.name_product}-label`;
            if (!actions) {
              return (
                <ListItemButton
                  key={value.name_product}
                  role="listitem"
                  onClick={() => handleToggle(value.id)}
                >
                  <ListItemText
                    sx={{ width: "50%" }}
                    id={labelIdName}
                    primary={value.name_product}
                  />
                  <ListItemText
                    id={labelIdName}
                    primary={`Bs. ${value.price_product}`}
                  />
                </ListItemButton>
              );
            } else {
              return (
                <Fragment key={`${value.name}-${idx}`}>
                  <Box>
                    <Box sx={{}}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>
                          <Typography variant="h7">
                            {value.quantity} Unid. X {value.price}
                          </Typography>
                          <Typography>{value.name}</Typography>
                        </Box>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 5 }}
                        >
                          <Typography>
                            {value.quantity * value.price}
                          </Typography>
                          <Tooltip title="Eliminar de la lista">
                            <IconButton
                              onClick={() => handleRemoveList(value.id)}
                              aria-label="delete"
                              size="large"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                    </Box>
                    <Typography variant="h8">{value.description}</Typography>
                  </Box>
                  <Divider sx={{ mt: 1, mb: 1 }} />
                </Fragment>
              );
            }
          })}
        </List>
      </CardContent>
      <Divider />
      <CardActions style={actions && styles.cardActions}>
        <Typography color="primary"> {titleHeader}</Typography>
        {actions && list.length > 0 && (
          <Button onClick={handOpenPaymentForm} size="large">
            Generar pago
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

/** @type {import("@mui/material").SxProps} */
const styles = {
  cardHeader: {
    display: "flex",
    justifySelf: "center",
    gap: 10,
  },
  card: {
    boxShadow: "0 0 15px 0.5px #888888",
    marginBottom: 20,
  },
  cardActions: { justifyContent: "space-between" },
};

export default CardCustomer;

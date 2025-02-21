import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Badge, Box, Divider, Typography } from "@mui/material";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import AddIcon from "@mui/icons-material/Add";

import CardCustomer from "#components/Card.js";
import theme from "#config/theme.js";
import FormAddPurchase from "./FormAddPurchase";
import PaymentForm from "./PaymentForm";
import PrintButton from "#utils/ButtonPrintPDF.js";
import CustomizedDialogs from "#containers/pages/Products/Form.js";
import { createProduct } from "#services/product.js";

function SalesContainer(params) {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.Product);
  const { clients } = useSelector((state) => state.Client);
  const { payment_type } = useSelector((state) => state.Sale);

  const [print, setPrint] = useState(false);
  const [openAdForm, setOpenAddForm] = useState(false);
  const [openPaymentForm, setOpenPaymentForm] = useState(false);
  const [productSelected, setProductSelected] = useState({});
  const [cartList, setCartList] = useState([]);
  const [totalSum, setTotalSum] = useState(0);
  const [ticketDetails, setTicketDetails] = useState({});
  const [openModalNewProduct, setOpenModalNewProduct] = useState(false);

  const handleToggle = (id) => {
    setOpenAddForm(!openAdForm);
    // eslint-disable-next-line
    const selected = products.filter((p) => {
      if (p.id === id) {
        return { ...p };
      }
      // return [];
    })[0];
    setProductSelected(selected);
  };

  const handleClickModal = (row) => {
    setOpenAddForm(!openAdForm);
  };

  const addToCartList = (product) => {
    const sumPrice = +totalSum + +product.quantity * product.price;
    setCartList(cartList.concat([product]));
    setTotalSum(sumPrice);
    setOpenAddForm(!openAdForm);
  };

  const handleRemoveList = async (id) => {
    const findNumber = await cartList.filter((p) => p?.id === id)[0];
    const updatedList = await cartList.filter((p) => p.id !== id);
    const sumTotalPrice = +totalSum - +findNumber?.price * findNumber?.quantity;
    setCartList(updatedList);
    setTotalSum(sumTotalPrice);
  };

  const handleClickPayment = () => {
    setOpenPaymentForm(!openPaymentForm);
  };

  const onSubmit = (formData) => {
    console.log(formData);
    setPrint(true);
    setTicketDetails(formData);
    console.log(formData);
  };

  const onOpenModalNewProduct = () => {
    setOpenModalNewProduct(!openModalNewProduct);
  };
  const handleNewProduct = (data) => {
    dispatch(createProduct(data));
    setOpenModalNewProduct(!openModalNewProduct);
  };

  const clickPrint = (data) => {
    console.log(data);
    // setCartList([]);
    // setTotalSum(0);
  };

  return (
    <Box>
      <Box style={styles.header}>
        <Typography sx={styles.pageTitle} variant="h5">
          CREAR VENTA
        </Typography>{" "}
        {print && <PrintButton clickPrint={clickPrint} data={ticketDetails} />}
      </Box>
      <Divider sx={styles.divider} />
      <Box sx={styles.columnContainer}>
        <CardCustomer
          iconCardTitle={
            <Badge badgeContent={products.length} color="primary">
              <PointOfSaleIcon />
            </Badge>
          }
          cardTitle="Seleccione un producto para agregar al carrito"
          titleHeader={`PRODUCTOS VENTURI`}
          list={products}
          handleToggle={handleToggle}
          iconButtonAdd={<AddIcon />}
          valueButtonAdd="AGREGAR PRODUCTO"
          onClickOpenModal={onOpenModalNewProduct}
        />
        <CardCustomer
          iconCardTitle={
            <Badge badgeContent={cartList.length} color="success">
              <LocalGroceryStoreIcon />
            </Badge>
          }
          cardTitle="Productos agregados"
          totalSum={`Total   Bs. ${totalSum}`}
          actions
          titleHeader={`Cantidad: ${cartList.length}`}
          list={cartList}
          handleRemoveList={handleRemoveList}
          handOpenPaymentForm={handleClickPayment}
        />
      </Box>
      <FormAddPurchase
        open={openAdForm}
        handleClick={handleClickModal}
        onSubmit={addToCartList}
        title="Producto seleccionado"
        productSelected={productSelected}
        data={productSelected}
      />
      <PaymentForm
        total={totalSum}
        open={openPaymentForm}
        data={cartList}
        handleClick={handleClickPayment}
        title="Generar pago"
        clients={clients}
        paymentType={payment_type}
        onSubmit={onSubmit}
      />
      <CustomizedDialogs
        open={openModalNewProduct}
        handleClick={onOpenModalNewProduct}
        onSubmit={handleNewProduct}
        title="NUEVO PRODUCTO"
      />
    </Box>
  );
}

/** @type {import("@mui/material").SxProps} */
const styles = {
  header: { display: "flex", justifyContent: "space-between" },
  pageTitle: {
    mb: 3,
  },
  divider: { mb: 3, borderColor: theme.palette.grey.main },
  columnContainer: {
    columns: "280px 2",
    gap: 8,
    borderRadius: 5,
    // maxHeight: window.innerHeight - 600,
    // maxWidth: 1400,
  },
  cardContainer: {
    paddingTop: 10,
    // borderRadius: 10,
  },
};

export default SalesContainer;

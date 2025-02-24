import { Route, Routes } from "react-router-dom";
// import { Dashboard } from "@mui/icons-material";
import DashboardContainer from "#containers/Dashboard.js";
import ClientsContainer from "#containers/pages/Client/Clients.js";
import ProductsContainer from "#containers/pages/Products/Products.js";
import SalesContainer from "#containers/pages/Sales/Sales.js";
import InvoicesContainer from "#containers/pages/Invoices/Invoices.js";
import StoreContainer from "#containers/pages/Store/Store.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getListProducts } from "#services/product.js";
import { getAllProducts } from "#redux/slices/productSlice.js";
import { getListClients } from "#services/client.js";
import { getAllClients } from "#redux/slices/clientSlice.js";
import { getListTickets } from "#services/ticket.js";
import { getAllTickets } from "#redux/slices/ticketSlice.js";

function AppRoutes() {
  const dispatch = useDispatch();

  useEffect(() => {
    const products = getListProducts();
    products.then((pds) => {
      dispatch(getAllProducts(pds));
    });

    const clients = getListClients();
    clients.then((cls) => dispatch(getAllClients(cls)));

    const tickets = getListTickets();
    tickets.then((t) => dispatch(getAllTickets(t)));
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<DashboardContainer />} />
      <Route path="/clients" element={<ClientsContainer />} />
      <Route path="/products" element={<ProductsContainer />} />
      <Route path="/store" element={<StoreContainer />} />
      <Route path="/invoices" element={<InvoicesContainer />} />
      <Route path="/sales" element={<SalesContainer />} />
    </Routes>
  );
}

export default AppRoutes;

import { Route, Routes } from "react-router-dom";
// import { Dashboard } from "@mui/icons-material";
import DashboardContainer from "#containers/Dashboard.js";
import ClientsContainer from "#containers/pages/Clients.js";
import ProductsContainer from "#containers/pages/Products.js";
import SalesContainer from "#containers/pages/Sales.js";
import InvoicesContainer from "#containers/pages/Invoices.js";
import StoreContainer from "#containers/pages/Store.js";

function AppRoutes() {
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

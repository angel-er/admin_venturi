import { Avatar, Box, Typography, useTheme } from "@mui/material";
import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ProductionQuantityLimitsOutlinedIcon from "@mui/icons-material/ProductionQuantityLimitsOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import { Link, useLocation } from "react-router-dom";

const links = [
  {
    icon: <DashboardOutlinedIcon />,
    label: "Dashboard",
    url: "/",
  },
  {
    icon: <PeopleAltOutlinedIcon />,
    label: "Clientes",
    url: "/clients",
  },
  {
    icon: <ProductionQuantityLimitsOutlinedIcon />,
    label: "Productos",
    url: "/products",
  },
  {
    icon: <StorefrontOutlinedIcon />,
    label: "Almacén",
    url: "/store",
  },
  {
    icon: <ReceiptLongOutlinedIcon />,
    label: "Facturas",
    url: "/invoices",
  },
  {
    icon: <MonetizationOnOutlinedIcon />,
    label: "Ventas",
    url: "/sales",
  },
];

function SideNav() {
  const theme = useTheme();
  const { collapsed } = useProSidebar();
  const location = useLocation();
  return (
    <Sidebar
      style={{
        // height: "100%",
        top: "auto",
        // color: "white",
      }}
      breakPoint="md"
      backgroundColor={theme.palette.neutral.medium}
      menuItemStyle={{
        button: ({ active }) => {
          console.log(active);
          return {
            backgroundColor: active ? theme.palette.neutral.main : undefined,
          };
        },
      }}
    >
      <Box sx={styles.avatarContainer}>
        <Avatar sx={styles.avatar} alt="Channel Name" src="" />
        {!collapsed && (
          <Typography variant="body2" sx={styles.yourChannel}>
            Sistema de facturación
          </Typography>
        )}
        {!collapsed && <Typography variant="overline">VENTURI</Typography>}
      </Box>
      <Menu>
        {links.map((link, key) => (
          <div key={key}>
            <MenuItem
              active={location.pathname === link.url}
              component={<Link to={link.url} />}
              icon={link.icon}
            >
              <Typography variant="body2">{link.label}</Typography>
            </MenuItem>
          </div>
        ))}
      </Menu>
    </Sidebar>
  );
}

/** @type {import("@mui/material").SxProps} */
const styles = {
  avatarContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    my: 5,
  },
  avatar: {
    width: "40%",
    height: "auto",
  },
  link: {
    "&:hover": {
      color: "black",
    },
  },
  yourChannel: {
    mt: 1,
  },
};

export default SideNav;

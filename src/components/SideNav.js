import { Avatar, Box, Typography, useTheme } from "@mui/material";
import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ProductionQuantityLimitsOutlinedIcon from "@mui/icons-material/ProductionQuantityLimitsOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";

const links = [
  {
    icon: <DashboardOutlinedIcon />,
    label: "Dashboard",
  },
  {
    icon: <PeopleAltOutlinedIcon />,
    label: "Clientes",
  },
  {
    icon: <ProductionQuantityLimitsOutlinedIcon />,
    label: "Productos",
  },
  {
    icon: <StorefrontOutlinedIcon />,
    label: "Almacén",
  },
  {
    icon: <ReceiptLongOutlinedIcon />,
    label: "Facturas",
  },
  {
    icon: <MonetizationOnOutlinedIcon />,
    label: "Ventas",
  },
];

function SideNav() {
  const theme = useTheme();
  const { collapsed } = useProSidebar();
  return (
    <Sidebar
      style={{
        height: "100%",
        top: "auto",
      }}
      breakPoint="md"
      backgroundColor={theme.palette.neutral.light}
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
            <MenuItem active icon={link.icon}>
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
  yourChannel: {
    mt: 1,
  },
};

export default SideNav;

import { AppBar, Box, IconButton, Toolbar, Badge } from "@mui/material";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import logoVenturi from "../assets/logo-venturi.png";
import { useProSidebar } from "react-pro-sidebar";

function NavHeader() {
  const { collapseSidebar, toggleSidebar, broken } = useProSidebar();
  return (
    <AppBar position="sticky" sx={styles.appBar}>
      <Toolbar>
        <IconButton
          onClick={() => (broken ? toggleSidebar() : collapseSidebar())}
          color="secondary"
        >
          <MenuTwoToneIcon />
        </IconButton>
        <Box component="img" sx={styles.appLogo} src={logoVenturi} />
        <Box sx={{ flexGrow: 1 }} />
        <IconButton tittle="Notificacions" color="secondary">
          <Badge badgeContent={14} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton tittle="Settings" color="secondary">
          <SettingsIcon />
        </IconButton>
        <IconButton tittle="Sign out" color="secondary">
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

/** @type {import("@mui/material").SxProps} */
const styles = {
  appBar: {
    bgcolor: "white",
  },
  appLogo: {
    borderRadius: 2,
    width: 90,
    ml: 2,
    cursor: "pointer",
  },
};
export default NavHeader;

import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { USER_ID } from "../config/localStorageKeys";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem(USER_ID);
    navigate("/login", { replace: true });
  };

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        backdropFilter: "blur(12px)",
        zIndex : 2
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              flexGrow: 1,
            }}
          >

            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                letterSpacing: 0.5,
              }}
            >
              Expense Tracker
            </Typography>
          </Box>

          <Button
            variant="outlined"
            color="error"
            startIcon={<LogoutRoundedIcon />}
            onClick={logout}
          >
            Logout
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
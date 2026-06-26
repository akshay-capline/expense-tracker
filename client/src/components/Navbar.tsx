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
import ColorModeSelect from "./mui/ColorModeSelect";
import { setUserdetails } from "../redux/authSlice";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem(USER_ID);
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem(USER_ID);
    dispatch(setUserdetails({
      name : "", 
      email : "", 
      user_id : ""
    }))  
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

         { userId && <Button
            variant="outlined"
            color="error"
            startIcon={<LogoutRoundedIcon />}
            sx={{
              marginRight : "10px"
            }}
            onClick={logout}
          >
            Logout
          </Button>}
          <ColorModeSelect  />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
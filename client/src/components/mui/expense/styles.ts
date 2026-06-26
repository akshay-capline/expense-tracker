import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import Container from "@mui/material/Container";

export const ExpenseContainer = styled(Stack)(({ theme }) => ({
  minHeight: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  padding: theme.spacing(3),
  position: "relative",

  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(5),
  },

  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    zIndex: -1,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",

    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210,100%,16%,0.5), hsl(220,30%,5%))",
    }),
  },
}));

export const ExpenseContent = styled(Container)(({ theme }) => ({
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
}));

export const ExpenseCard = styled(MuiCard)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(3),
  borderRadius : (theme.shape.borderRadius as number) * 2,

  boxShadow:
    "hsla(220,30%,5%,0.05) 0px 5px 15px 0px, hsla(220,25%,10%,0.05) 0px 15px 35px -5px",

  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220,30%,5%,0.5) 0px 5px 15px 0px, hsla(220,25%,10%,0.08) 0px 15px 35px -5px",
  }),
}));

export const SectionTitle = styled("h2")(({ theme }) => ({
  margin: 0,
  marginBottom: theme.spacing(2),
  fontSize: "1.4rem",
  fontWeight: 600,
  color: theme.palette.text.primary,
}));
import * as React from "react";
import PropTypes from "prop-types";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
// import Divider from "@mui/material/Divider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
// import SvgMaterialDesign from "docs/src/icons/SvgMaterialDesign";
// import Hero from "./components/Hero";
// import LogoCollection from "./components/LogoCollection";
// import Highlights from "./components/Highlights";
// import Pricing from "./components/Pricing";
// import Features from "./components/Features";
// import Testimonials from "./components/Testimonials";
// import FAQ from "./components/FAQ";
// import Footer from "./components/Footer";
import Navbar from "../components/Navbars/Navbar";

const defaultTheme = createTheme({});

function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100dvw",
        position: "fixed",
        bottom: 24,
      }}
    >
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={showCustomTheme}
        onChange={toggleCustomTheme}
        aria-label="Platform"
        sx={{
          backgroundColor: "background.default",
          "& .Mui-selected": {
            pointerEvents: "none",
          },
        }}
      >
        <ToggleButton value>
          <AutoAwesomeRoundedIcon sx={{ fontSize: "20px", mr: 1 }} />
          Custom theme
        </ToggleButton>
        <ToggleButton value={false}>
          {/* <SvgMaterialDesign sx={{ fontSize: "20px", mr: 1 }} /> */}
          Material Design
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

ToggleCustomTheme.propTypes = {
  showCustomTheme: PropTypes.shape({
    valueOf: PropTypes.func.isRequired,
  }).isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};

export default function LandingPage() {
  const [mode, setMode] = React.useState("light");

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {/* <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}> */}
      <CssBaseline />
      <Navbar mode={mode} toggleColorMode={toggleColorMode} />
      {/* <Hero /> */}
      {/* <Box sx={{ bgcolor: "background.default" }}> */}
      {/*   <LogoCollection /> */}
      {/*   <Features /> */}
      {/*   <Divider /> */}
      {/*   <Testimonials /> */}
      {/*   <Divider /> */}
      {/*   <Highlights /> */}
      {/*   <Divider /> */}
      {/*   <Pricing /> */}
      {/*   <Divider /> */}
      {/*   <FAQ /> */}
      {/*   <Divider /> */}
      {/*   <Footer /> */}
      {/* </Box> */}
    </ThemeProvider>
  );
}

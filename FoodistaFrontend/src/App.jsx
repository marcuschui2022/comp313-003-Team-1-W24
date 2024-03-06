import {BrowserRouter, Route, Routes} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import getLPTheme from "./pages/getLPTheme.js";
import Navbar from "./components/Navbars/Navbar.jsx";
import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp.jsx";


function App() {
    const [mode, setMode] = React.useState("light");
    const LPtheme = createTheme(getLPTheme(mode));

    const toggleColorMode = () => {
        setMode((prev) => (prev === "dark" ? "light" : "dark"));
    };


    return (
        <ThemeProvider theme={LPtheme}>
            <CssBaseline/>
            <BrowserRouter>
                <Navbar mode={mode} toggleColorMode={toggleColorMode}/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;

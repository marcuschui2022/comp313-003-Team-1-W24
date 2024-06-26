import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import getLPTheme from "./pages/getLPTheme.js";
import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import Navbar from "./components/Navbars/Navbar.jsx";
import MyBlog from "./pages/MyBlog.jsx";
import NewPost from "./pages/NewPost.jsx";
import ShowPost from "./pages/ShowPost.jsx";
import EditPost from "./pages/EditPost.jsx";

function AppRoutes({ mode, toggleColorMode }) {
  const location = useLocation();
  const [fullName, setFullName] = useState("");

  return (
    <>
      {location.pathname !== "/signup" && location.pathname !== "/signin" && (
        <Navbar
          mode={mode}
          toggleColorMode={toggleColorMode}
          setFullName={setFullName}
          fullName={fullName}
        />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/myblog" element={<MyBlog fullName={fullName} />} />
        <Route path="/newpost" element={<NewPost />} />
        <Route path="/post" element={<ShowPost />} />
        <Route path="/edit" element={<EditPost />} />
      </Routes>
    </>
  );
}

function App() {
  const [mode, setMode] = React.useState("light");
  const LPtheme = createTheme(getLPTheme(mode));

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeProvider theme={LPtheme}>
      <CssBaseline />
      <BrowserRouter basename="/">
        <AppRoutes mode={mode} toggleColorMode={toggleColorMode} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

import {useEffect, useState} from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import ToggleColorMode from "../ToggleColorMode";
import {useNavigate} from "react-router-dom";

const logoStyle = {
    width: "140px",
    height: "auto",
    cursor: "pointer",
};

function Navbar({mode, toggleColorMode, setFullName, fullName}) {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    const [open, setOpen] = useState(false);
    // const [fullName, setFullName] = useState("User");

    const navigate = useNavigate();

    const clearToken = () => {
        navigate("/")
        setFullName('')
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setIsUserLoggedIn(false);
    };

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const scrollToSection = (sectionId) => {
        const sectionElement = document.getElementById(sectionId);
        const offset = 128;
        if (sectionElement) {
            const targetScroll = sectionElement.offsetTop - offset;
            sectionElement.scrollIntoView({behavior: "smooth"});
            window.scrollTo({
                top: targetScroll,
                behavior: "smooth",
            });
            setOpen(false);
        }
    };

    useEffect(() => {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="));
        if (token) {
            const fullName = document.cookie
                .split("; ")
                .find((row) => row.startsWith("fullName="));
            if (fullName === undefined) {
                document.cookie =
                    "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            }

            setFullName(fullName.split("=")[1]);
            console.log("User is logged in");
            setIsUserLoggedIn(true);
        } else {
            console.log("User is not logged in");
            setIsUserLoggedIn(false);
        }
    }, []);

    return (
        <div>
            <AppBar
                position="fixed"
                sx={{
                    boxShadow: 0,
                    bgcolor: "transparent",
                    backgroundImage: "none",
                    mt: 2,
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar
                        variant="regular"
                        sx={(theme) => ({
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexShrink: 0,
                            borderRadius: "999px",
                            bgcolor:
                                theme.palette.mode === "light"
                                    ? "rgba(255, 255, 255, 0.4)"
                                    : "rgba(0, 0, 0, 0.4)",
                            backdropFilter: "blur(24px)",
                            maxHeight: 40,
                            border: "1px solid",
                            borderColor: "divider",
                            boxShadow:
                                theme.palette.mode === "light"
                                    ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                                    : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
                        })}
                    >
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: "flex",
                                alignItems: "center",
                                ml: "-18px",
                                px: 0,
                            }}
                        >
                            <img
                                src={
                                    "https://marcuschui2022.github.io/comp231-008_team_9_F23/static/media/logo.7d1bb593d8675f5a80e3.png"
                                }
                                style={logoStyle}
                                alt="logo of sitemark"
                                onClick={() => navigate("/")}
                            />
                            <Box sx={{display: {xs: "none", md: "flex"}}}>
                                <MenuItem
                                    // onClick={() => scrollToSection("features")}
                                    onClick={() => navigate("/")}
                                    sx={{py: "6px", px: "12px"}}
                                >
                                    <Typography variant="body2" color="text.primary">
                                        Articles
                                    </Typography>
                                </MenuItem>
                                {/*<MenuItem*/}
                                {/*    onClick={() => scrollToSection("articlesList")}*/}
                                {/*    sx={{py: "6px", px: "12px"}}*/}
                                {/*>*/}
                                {/*    <Typography variant="body2" color="text.primary">*/}
                                {/*        Articles*/}
                                {/*    </Typography>*/}
                                {/*</MenuItem>*/}
                                {/*<MenuItem*/}
                                {/*    onClick={() => scrollToSection("highlights")}*/}
                                {/*    sx={{py: "6px", px: "12px"}}*/}
                                {/*>*/}
                                {/*    <Typography variant="body2" color="text.primary">*/}
                                {/*        Bloggers*/}
                                {/*    </Typography>*/}
                                {/*</MenuItem>*/}
                                {/*<MenuItem*/}
                                {/*    onClick={() => scrollToSection("pricing")}*/}
                                {/*    sx={{py: "6px", px: "12px"}}*/}
                                {/*>*/}
                                {/*    <Typography variant="body2" color="text.primary">*/}
                                {/*        Videos*/}
                                {/*    </Typography>*/}
                                {/*</MenuItem>*/}
                                {/*<MenuItem*/}
                                {/*    onClick={() => scrollToSection("faq")}*/}
                                {/*    sx={{py: "6px", px: "12px"}}*/}
                                {/*>*/}
                                {/*    <Typography variant="body2" color="text.primary">*/}
                                {/*        Recipes*/}
                                {/*    </Typography>*/}
                                {/*</MenuItem>*/}
                                {/*<MenuItem*/}
                                {/*    onClick={() => scrollToSection("faq")}*/}
                                {/*    sx={{py: "6px", px: "12px"}}*/}
                                {/*>*/}
                                {/*    <Typography variant="body2" color="text.primary">*/}
                                {/*        Contact*/}
                                {/*    </Typography>*/}
                                {/*</MenuItem>*/}
                                {fullName && <MenuItem
                                    onClick={() => navigate("/myblog")}
                                    sx={{py: "6px", px: "12px"}}
                                >
                                    <Typography variant="body2" color="text.primary">
                                        My Blog
                                    </Typography>
                                </MenuItem>}

                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: {xs: "none", md: "flex"},
                                gap: 0.5,
                                alignItems: "center",
                            }}
                        >
                            <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode}/>
                            {!isUserLoggedIn ? (
                                <>
                                    <Button
                                        color="primary"
                                        variant="text"
                                        size="small"
                                        component="a"
                                        onClick={() => navigate("/signin")}
                                    >
                                        Sign in
                                    </Button>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        size="small"
                                        component="a"
                                        onClick={() => navigate("/signup")}
                                    >
                                        Sign up
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Typography sx={{color: "primary.main"}}>
                                        Welcome, {fullName}!
                                    </Typography>
                                    <Button
                                        color="primary"
                                        variant="outlined"
                                        size="small"
                                        component="a"
                                        onClick={clearToken}
                                    >
                                        Logout
                                    </Button>
                                </>
                            )}
                        </Box>
                        <Box sx={{display: {sm: "", md: "none"}}}>
                            <Button
                                variant="text"
                                color="primary"
                                aria-label="menu"
                                onClick={toggleDrawer(true)}
                                sx={{minWidth: "30px", p: "4px"}}
                            >
                                <MenuIcon/>
                            </Button>
                            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                                <Box
                                    sx={{
                                        minWidth: "60dvw",
                                        p: 2,
                                        backgroundColor: "background.paper",
                                        flexGrow: 1,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "end",
                                            flexGrow: 1,
                                        }}
                                    >
                                        <ToggleColorMode
                                            mode={mode}
                                            toggleColorMode={toggleColorMode}
                                        />
                                    </Box>
                                    <MenuItem onClick={() => scrollToSection("features")}>
                                        Features
                                    </MenuItem>
                                    <MenuItem onClick={() => scrollToSection("testimonials")}>
                                        Testimonials
                                    </MenuItem>
                                    <MenuItem onClick={() => scrollToSection("highlights")}>
                                        Highlights
                                    </MenuItem>
                                    <MenuItem onClick={() => scrollToSection("pricing")}>
                                        Pricing
                                    </MenuItem>
                                    <MenuItem onClick={() => scrollToSection("faq")}>
                                        FAQ
                                    </MenuItem>
                                    <Divider/>
                                    {!isUserLoggedIn ? (
                                        <>
                                            <MenuItem>
                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    component="a"
                                                    sx={{width: "100%"}}
                                                    onClick={() => navigate("/signup")}
                                                >
                                                    Sign up
                                                </Button>
                                            </MenuItem>
                                            <MenuItem>
                                                <Button
                                                    color="primary"
                                                    variant="outlined"
                                                    component="a"
                                                    onClick={() => navigate("/signin")}
                                                    sx={{width: "100%"}}
                                                >
                                                    Sign in
                                                </Button>
                                            </MenuItem>
                                        </>
                                    ) : (
                                        <>
                                            <MenuItem>
                                                <Typography sx={{color: "primary.main"}}>
                                                    Welcome, {fullName}!
                                                </Typography>
                                            </MenuItem>
                                            <MenuItem>
                                                <Button
                                                    color="primary"
                                                    variant="outlined"
                                                    component="a"
                                                    onClick={clearToken}
                                                    sx={{width: "100%"}}
                                                >
                                                    Logout
                                                </Button>
                                            </MenuItem>
                                        </>
                                    )}
                                </Box>
                            </Drawer>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}

Navbar.propTypes = {
    mode: PropTypes.oneOf(["dark", "light"]).isRequired,
    toggleColorMode: PropTypes.func.isRequired,
};

export default Navbar;

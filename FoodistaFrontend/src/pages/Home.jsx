import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Hero from "../components/Hero";
import FAQ from "../components/FAQ";
import Highlights from "../components/Highlights";
import Testimonials from "../components/Testimonials";
import ArticlesList from "../components/ArticlesList";
import HomeSection from "../components/HomeSection";
import Footer from "../components/Footer.jsx";


export default function Home() {
    // const [mode, setMode] = React.useState("light");
    // const LPtheme = createTheme(getLPTheme(mode));
    //
    // const toggleColorMode = () => {
    //     setMode((prev) => (prev === "dark" ? "light" : "dark"));
    // };
    //

    return (
        // <ThemeProvider theme={LPtheme}>
        //     <CssBaseline/>
        //     <Navbar mode={mode} toggleColorMode={toggleColorMode}/>
        <>
            <Hero/>
            <Box sx={{bgcolor: "background.default"}}>
                <HomeSection/>
                <ArticlesList/>
                <Divider/>
                <Testimonials/>
                <Divider/>
                <Highlights/>
                <Divider/>
                <FAQ/>
                <Divider/>
                <Footer/>
            </Box>
        </>
        // </ThemeProvider>
    );
}

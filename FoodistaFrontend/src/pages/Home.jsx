import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import FAQ from "../components/FAQ";
import Highlights from "../components/Highlights";
import Testimonials from "../components/Testimonials";
import ArticlesList from "../components/ArticlesList";
import HomeSection from "../components/HomeSection";
import Footer from "../components/Footer.jsx";
import {usePost} from "../hooks/usePost.js";
import * as React from "react";
import {useEffect} from "react";
import Hero from "../components/Hero.jsx";


export default function Home() {
    const apiUrl = "/api/v1/";
    const {
        handleAllPost, postData
    } = usePost(apiUrl);


    useEffect(() => {
        handleAllPost();
    }, []);

    return (
        <>
            <Box sx={{bgcolor: "background.default"}}>
                <Hero/>
                <HomeSection/>
                <ArticlesList postData={postData}/>
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
    );
}

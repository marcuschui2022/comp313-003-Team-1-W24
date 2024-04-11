import React, {useEffect} from "react";
import Container from "@mui/material/Container";
import {RichTextEditor} from '@mantine/rte';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {usePost} from "../hooks/usePost.js";
import {useLocation, useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {CardMedia} from "@mui/material";


export default function ShowPost() {
    const navigate = useNavigate();
    const location = useLocation();
    const apiUrl = "/api/v1/";


    const defaultTheme = createTheme();
    // const [postContent, setPostContent] = useState(initialValue);


    const {
        handleFetchPostById,
        singlePostData
    } = usePost(apiUrl);


    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const postId = params.get('postId');

        if (postId) {
            handleFetchPostById(postId);
        } else {
            navigate("/");
        }
    }, []);

    console.log(singlePostData)

    if (!singlePostData) {
        return null;
    }

    return (
        <>
            <Container sx={{mt: 0}}>
                <Divider sx={{mt: 5, mb: 5}}/>
                <Typography variant="h6" gutterBottom>Description:</Typography>
                <Typography variant="h6" gutterBottom>{singlePostData.post_description}</Typography>
                <CardMedia
                    component="img"
                    height="295"
                    image={singlePostData.post_profile_picture_url}
                    alt="green iguana"
                />
                <Typography variant="h5" gutterBottom>Author: {singlePostData.author}</Typography>
                <Typography variant="h5" gutterBottom>Publish Date: {singlePostData.publishDate}</Typography>
                <Typography variant="h5"
                            gutterBottom>Category: {singlePostData.category.categoryDescription}</Typography>
                <Typography variant="h5" gutterBottom sx={{mb: 10}}>Post
                    Type: {singlePostData.postType.postTypeDescription}</Typography>

                <ThemeProvider theme={defaultTheme}>


                    <RichTextEditor readOnly={true} value={singlePostData.post_content}
                                    id="rte"
                    />

                </ThemeProvider>

                <Divider sx={{mt: 20, mb: 20}}/>
            </Container>
        </>
    );
}
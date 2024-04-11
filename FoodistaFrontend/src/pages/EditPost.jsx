import Divider from "@mui/material/Divider";
import React, {useEffect, useState} from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {RichTextEditor} from '@mantine/rte';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {
    Button,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Radio,
    RadioGroup,
    Switch,
    TextField
} from "@mui/material";
import {useBlog} from "../hooks/useBlog.js";
import {usePost} from "../hooks/usePost.js";
import {useNavigate} from "react-router-dom";


function CategoryRadioButtonsGroup({data, setSelectedCategory}) {
    return (
        <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Category</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
            >
                {data.map(x => <FormControlLabel
                    sx={{"& .MuiFormControlLabel-label": {marginLeft: "-7px"}}} key={x.categoryId}
                    value={x.categoryId} control={<Radio/>} label={x.categoryName}
                    onChange={() => setSelectedCategory(x.categoryId)}/>)
                }

            </RadioGroup>
        </FormControl>
    );
}

function NewBlogsRadioButtonsGroup({options, setSelectedBlog, selectedBlog}) {
    return (
        <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Blog</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
            >


                {options.map(x => <FormControlLabel
                    sx={{"& .MuiFormControlLabel-label": {marginLeft: "-7px"}}} key={x.blog_id}
                    value={x.blog_id} control={<Radio/>} label={x.title}
                    onChange={() => setSelectedBlog(x.blog_id)}/>)}

            </RadioGroup>
        </FormControl>
    );
}

function PostTypeRadioButtonsGroup({data, setSelectedPostType}) {
    return (
        <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Post Type</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
            >
                {data.map(x => <FormControlLabel
                    sx={{"& .MuiFormControlLabel-label": {marginLeft: "-7px"}}} key={x.postTypeId}
                    value={x.postTypeId} control={<Radio/>} label={x.postTypeName}
                    onChange={() => setSelectedPostType(x.postTypeId)}/>)
                }

            </RadioGroup>
        </FormControl>
    );
}

function PreviewSwitchLabels({isPreview, setIsPreview}) {
    return (
        <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Preview</FormLabel>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch
                            value={isPreview}
                            onChange={() => setIsPreview(p => !p)}
                        />
                    }
                />
            </FormGroup>
        </FormControl>
    );
}

const initialValue =
    '<p>type something here...</p>';
export default function EditPost() {
    const navigate = useNavigate();
    const apiUrl = "/api/v1/";


    const defaultTheme = createTheme();
    const [postContent, setPostContent] = useState(initialValue);

    const {
        handleFetchBlogDataByCurrentUserId,
        handleFetchCategory,
        blogCategory,
        myBlogData
    } = useBlog(apiUrl);
    //
    const {
        handleSubmitNewPost,
        handleFetchPostType,
        postType,
    } = usePost(apiUrl);


    const [selectedCategory, setSelectedCategory] = useState(null)
    const [selectedPostType, setSelectedPostType] = useState(null)
    const [selectedBlog, setSelectedBlog] = useState('all')
    const [postDescription, setPostDescription] = useState('')
    const [postProfilePictureURL, setPostProfilePictureURL] = useState('')

    const [isPreview, setIsPreview] = useState(false)


    useEffect(() => {
        handleFetchBlogDataByCurrentUserId();
        handleFetchCategory();
        handleFetchPostType();
    }, []);

    return (
        <>
            <Container sx={{mt: 0}}>
                <Typography variant="h4" gutterBottom>New Post</Typography>
                <Divider sx={{mb: 3}}/>
                <ThemeProvider theme={defaultTheme}>
                    <NewBlogsRadioButtonsGroup options={myBlogData} selectedBlog={selectedBlog}
                                               setSelectedBlog={setSelectedBlog}/>
                    <br/>
                    <CategoryRadioButtonsGroup data={blogCategory} setSelectedCategory={setSelectedCategory}/>
                    <br/>
                    <PostTypeRadioButtonsGroup data={postType} setSelectedPostType={setSelectedPostType}/>
                    <br/>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Post Description"
                        name="post_description"
                        autoFocus
                        value={postDescription}
                        onChange={(event) => setPostDescription(event.target.value)}
                    />
                    <br/>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Post Profile Picture URL"
                        name="post_profile_picture"
                        autoFocus
                        value={postProfilePictureURL}
                        onChange={(event) => setPostProfilePictureURL(event.target.value)}
                    />
                    <br/>
                    <PreviewSwitchLabels isPreview={isPreview} setIsPreview={setIsPreview}/>
                    <RichTextEditor readOnly={isPreview} value={postContent} onChange={setPostContent} id="rte"
                        // initialHeight={"1000px"}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        onClick={(event) => {

                            return handleSubmitNewPost(event, {
                                blog_id: selectedBlog,
                                category_id: selectedCategory,
                                post_type_id: selectedPostType,
                                post_content: postContent,
                                post_description: postDescription,
                                post_profile_picture_url: postProfilePictureURL
                            }).then(() => {

                                navigate('/myblog')
                            })
                        }}
                        disabled={(selectedCategory === null || selectedPostType === null)}
                    >
                        Submit New Post
                    </Button>
                </ThemeProvider>
            </Container>
        </>
    );
}
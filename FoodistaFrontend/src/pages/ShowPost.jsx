import React, {useEffect} from "react";
import Container from "@mui/material/Container";
import {RichTextEditor} from '@mantine/rte';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {usePost} from "../hooks/usePost.js";
import {useLocation, useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {Avatar, CardMedia, TextField} from "@mui/material";
import Hero from "../components/Hero.jsx";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import CircularIndeterminate from "../components/CircularIndeterminate.jsx";

export default function ShowPost() {
  const navigate = useNavigate();
  const location = useLocation();
  const apiUrl = "/api/v1/";
  const cookiesUserId = document.cookie
    .split('; ')
    .find(row => row.startsWith("userId"))
    ?.split('=')[1]

  const defaultTheme = createTheme();
  // const [postContent, setPostContent] = useState(initialValue);


  const {
    handleFetchPostById,
    singlePostData,
    handleDeletePost,
    handleFetchCommentsByPostId,
    comments,
    handleSubmitNewComment, handleDeleteCommentsByCommentId, isLoading
  } = usePost(apiUrl);


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const postId = params.get('postId');

    if (postId) {
      handleFetchPostById(postId);
      handleFetchCommentsByPostId(postId)
    } else {
      navigate("/");
    }
  }, []);

  // console.log(singlePostData)


  if (isLoading) {
    return <Box>
      <Hero/>
      <Container sx={{mt: 0}}><CircularIndeterminate/></Container>
    </Box>
  }

  if (!singlePostData) {
    return null;
  }

  return (
    <>
      <Hero/>
      <Container sx={{mt: 0}}>
        <Divider sx={{mt: 5, mb: 5}}/>
        {cookiesUserId === singlePostData.user_Id.toString() && <>
          <Button variant="outlined" onClick={() => navigate(`/edit?postId=${singlePostData.post_Id}`)}>Edit
            Post</Button>
          <Button sx={{ml: 2}} variant="outlined" onClick={() => handleDeletePost(singlePostData.post_Id)}>Delete
            Post</Button></>}
        <Typography sx={{mt: 2, mb: 2}} variant="h6" gutterBottom>Description:</Typography>
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


          <Divider sx={{mt: 5, mb: 5}}/>
          <Typography variant="h5" gutterBottom>Comments:</Typography>
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              alignItems: 'flex-start'
            }}
            onSubmit={event => {
              const form = new FormData(event.currentTarget)
              const params = new URLSearchParams(location.search);
              const postId = params.get('postId');
              return handleSubmitNewComment(event, {
                commentContent: form.get('commentContent'),
              }, postId,)
            }}
          >
            <TextField
              id="commentContent"
              label="Leave your comment here"
              name="commentContent"
              multiline
              minRows={4}
              maxRows={20}
              defaultValue=""
              sx={{width: '100%'}}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                width: '100%'
              }}

            >
              <Button variant="outlined" type="submit" sx={{marginTop: 2}}>
                Enter
              </Button>
            </Box>
          </Box>

          {comments.map((comment, index) =>
            <Box key={index}>
              <Box
                sx={{
                  mt: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  alignItems: 'flex-start'
                }}>
                <Box sx={{display: 'flex', alignItems: "center", mb: 1}}>
                  <Avatar
                    src={`https://i.pravatar.cc/150?u=${comment.full_name}`}>{comment.full_name.slice(0, 1)}</Avatar>
                  <Typography
                    sx={{ml: 1}} variant="button"
                    display="block"
                    gutterBottom>
                    {comment.full_name} @ {comment.create_at}
                  </Typography>
                  {cookiesUserId === comment.user_id.toString() && <IconButton color="secondary" size="large"
                                                                               onClick={() => handleDeleteCommentsByCommentId(comment.comment_id)}>
                    <CloseIcon/>
                  </IconButton>}
                  {/*<IconButton color="primary" size="large">*/}
                  {/*  <EditIcon/>*/}
                  {/*</IconButton>*/}
                </Box>
                <Typography sx={{mt: 1, mb: 2}} variant="body1" gutterBottom>
                  {comment.comment}
                </Typography>

              </Box>
              <Divider/>
            </Box>)}
        </ThemeProvider>
        <Box sx={{mt: 5, mb: 30}}/>
      </Container>
    </>
  );
}
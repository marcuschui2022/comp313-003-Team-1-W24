import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  FormControl,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import {grey} from "@mui/material/colors";
import SearchIcon from "@mui/icons-material/Search";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useBlog} from "../hooks/useBlog.js";
import {usePost} from "../hooks/usePost.js";


export default function ArticlesList({postData}) {
  const navigate = useNavigate();
  const apiUrl = "/api/v1/";

  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedType, setSelectedType] = useState('all')

  const {handleFetchCategory, blogCategory} = useBlog(apiUrl);

  const {handleFetchPostType, postType} = usePost(apiUrl);

  useEffect(() => {
    handleFetchCategory();
    handleFetchPostType();
  }, []);
  return (
    <Container id="articlesList" sx={{py: 2}}>
      <Grid container spacing={5}>
        <Grid item xs={12} md={12} lg={9}>
          <Grid container spacing={2}>
            {postData.map((post, index) => (
              <Grid item xs={12} sm={12} md={6} key={index}>
                <Card sx={{maxWidth: "100%"}}>
                  <CardActionArea
                    onClick={() => navigate("/post?postId=" + post.post_Id)}
                  >
                    <CardMedia
                      component="img"
                      height="295"
                      image={post.post_profile_picture_url}
                      alt="green iguana"
                    />
                    <CardContent>
                      {/*<Typography*/}
                      {/*    sx={{*/}
                      {/*        color: (theme) =>*/}
                      {/*            theme.palette.mode === "light"*/}
                      {/*                ? "primary.main"*/}
                      {/*                : "primary.light",*/}
                      {/*        fontWeight: "bold",*/}
                      {/*        mb: 0,*/}
                      {/*    }}*/}
                      {/*    gutterBottom*/}
                      {/*    variant="h6"*/}
                      {/*    component="div"*/}
                      {/*>*/}
                      {/*    {post.category.categoryName}*/}
                      {/*</Typography>*/}
                      <Typography gutterBottom variant="h5" component="div">
                        {post.category.categoryDescription}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mt: 0,
                          wordWrap: "break-word",
                          overflowWrap: "break-word",
                        }}
                        component="div"
                      >
                        {post.post_description.length > 130
                          ? post.post_description.slice(0, 127) + "..."
                          : post.post_description}
                      </Typography>
                    </CardContent>
                    <CardHeader
                      sx={{
                        backgroundColor: grey[100],
                      }}
                      avatar={<Avatar src={`https://i.pravatar.cc/150?u=${post.author}`} aria-label="author"/>}
                      title={post.author}
                      titleTypographyProps={{variant: "subtitle2"}}
                      subheader={post.publishDate}
                      action={
                        <>
                          <Typography variant="body1" color="text.secondary">
                            &nbsp;
                          </Typography>
                          <Typography variant="body1" color="text.secondary">
                            {/*8 mins*/}
                          </Typography>
                        </>
                      }
                    />
                  </CardActionArea>
                </Card>
              </Grid>
            ))}

          </Grid>
        </Grid>
        {/* right side */}
        <Grid
          item
          xs={12}
          md={12}
          lg={3}
          // sx={{ display: { xs: "none", sm: "flex" }, width: "100%" }}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            gap: 1,
            width: "100%",
          }}
        >
          <Typography
            component="h5"
            variant="h5"
            sx={{
              color: (theme) =>
                theme.palette.mode === "light"
                  ? "primary.main"
                  : "primary.light",
              display: "flex",
            }}
          >
            Search
          </Typography>
          <Divider/>
          <FormControl>
            <TextField
              sx={{mb: 2, mt: 2}}
              fullWidth
              variant="outlined"
              placeholder="Search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon/>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <Typography
            component="h5"
            variant="h5"
            sx={{
              color: (theme) =>
                theme.palette.mode === "light"
                  ? "primary.main"
                  : "primary.light",
              display: "flex",
            }}
          >
            Post Categories
          </Typography>
          <Divider/>
          <FormControl>
            <RadioGroup
              sx={{mb: 2}}
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="All" control={<Radio/>} label="All"/>
              {blogCategory.map((category, index) => (
                <FormControlLabel
                  key={category.categoryName}
                  value={category.categoryId}
                  control={<Radio/>}
                  label={category.categoryName}
                  onChange={() => setSelectedCategory(category.categoryId)}
                />
              ))}

              {/*<FormControlLabel value="All" control={<Radio/>} label="All"/>*/}
              {/*<FormControlLabel value="Free" control={<Radio/>} label="Free"/>*/}
              {/*<FormControlLabel*/}
              {/*  value="Premium"*/}
              {/*  control={<Radio/>}*/}
              {/*  label="Premium"*/}
              {/*/>*/}
            </RadioGroup>
          </FormControl>
          <Typography
            component="h5"
            variant="h5"
            sx={{
              color: (theme) =>
                theme.palette.mode === "light"
                  ? "primary.main"
                  : "primary.light",
              display: "flex",
            }}
          >
            Post Type
          </Typography>
          <Divider/>
          <FormControl>
            <RadioGroup
              sx={{mb: 2}}
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="All" control={<Radio/>} label="All"/>
              {postType.map((post, index) => (<FormControlLabel
                key={post.postTypeName}
                value={post.postTypeId}
                control={<Radio/>}
                label={post.postTypeName}
                onChange={() => setSelectedType(post.postTypeId)}
              />))}
              {/*<FormControlLabel*/}
              {/*  value="Article"*/}
              {/*  control={<Radio/>}*/}
              {/*  label="Article"*/}
              {/*/>*/}
              {/*<FormControlLabel*/}
              {/*  value="Recipe"*/}
              {/*  control={<Radio/>}*/}
              {/*  label="Recipe"*/}
              {/*/>*/}
            </RadioGroup>
          </FormControl>
          <Typography
            component="h5"
            variant="h5"
            sx={{
              color: (theme) =>
                theme.palette.mode === "light"
                  ? "primary.main"
                  : "primary.light",
              display: "flex",
            }}
          >
            Cuisine Locale
          </Typography>
          <Divider/>
          <Typography
            component="h5"
            variant="h5"
            sx={{
              color: (theme) =>
                theme.palette.mode === "light"
                  ? "primary.main"
                  : "primary.light",
              display: "flex",
            }}
          >
            Recent Posts
          </Typography>
          <Divider/>
        </Grid>
      </Grid>
    </Container>
  );
}

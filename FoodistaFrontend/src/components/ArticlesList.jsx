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

const cardData = [
    {
        title: "Grill Hack: How To Grill Fish Over Citrus",
        author: "Dianne Russell",
        date: "10 August 2023",
        readTime: "6 min",
        description:
            "If you’re ready to add some zest to your regular grilling routine, grilling fish over citrus is a fast and easy option to add to your repertoire.",
        imageUrl: "/path/to/your/grilled-fish-image.jpg", // Replace with your image path
    },
    {
        title: "Grill Hack: How To Grill Fish Over Citrus",
        author: "Dianne Russell",
        date: "10 August 2023",
        readTime: "6 min",
        description:
            "If you’re ready to add some zest to your regular grilling routine, grilling fish over citrus is a fast and easy option to add to your repertoire.",
        imageUrl: "/path/to/your/grilled-fish-image.jpg", // Replace with your image path
    },
    {
        title: "Grill Hack: How To Grill Fish Over Citrus",
        author: "Dianne Russell",
        date: "10 August 2023",
        readTime: "6 min",
        description:
            "If you’re ready to add some zest to your regular grilling routine, grilling fish over citrus is a fast and easy option to add to your repertoire.",
        imageUrl: "/path/to/your/grilled-fish-image.jpg", // Replace with your image path
    },
    {
        title: "Grill Hack: How To Grill Fish Over Citrus",
        author: "Dianne Russell",
        date: "10 August 2023",
        readTime: "6 min",
        description:
            "If you’re ready to add some zest to your regular grilling routine, grilling fish over citrus is a fast and easy option to add to your repertoire.",
        imageUrl: "/path/to/your/grilled-fish-image.jpg", // Replace with your image path
    },
    {
        title: "Grill Hack: How To Grill Fish Over Citrus",
        author: "Dianne Russell",
        date: "10 August 2023",
        readTime: "6 min",
        description:
            "If you’re ready to add some zest to your regular grilling routine, grilling fish over citrus is a fast and easy option to add to your repertoire.",
        imageUrl: "/path/to/your/grilled-fish-image.jpg", // Replace with your image path
    },
    {
        title: "Grill Hack: How To Grill Fish Over Citrus",
        author: "Dianne Russell",
        date: "10 August 2023",
        readTime: "6 min",
        description:
            "If you’re ready to add some zest to your regular grilling routine, grilling fish over citrus is a fast and easy option to add to your repertoire.",
        imageUrl: "/path/to/your/grilled-fish-image.jpg", // Replace with your image path
    },
    {
        title: "Grill Hack: How To Grill Fish Over Citrus",
        author: "Dianne Russell",
        date: "10 August 2023",
        readTime: "6 min",
        description:
            "If you’re ready to add some zest to your regular grilling routine, grilling fish over citrus is a fast and easy option to add to your repertoire.",
        imageUrl: "/path/to/your/grilled-fish-image.jpg", // Replace with your image path
    },
    // ... other card data
];

export default function ArticlesList() {
    return (
        <Container id="articlesList" sx={{py: 2}}>
            <Grid container spacing={5}>
                <Grid item xs={12} md={12} lg={9}>
                    <Grid container spacing={2}>
                        {cardData.map((card, index) => (
                            <Grid item xs={12} sm={12} md={6} key={index}>
                                <Card sx={{maxWidth: "100%"}}>
                                    <CardActionArea
                                        onClick={() => console.log(`card is ${index}`)}
                                    >
                                        <CardMedia
                                            component="img"
                                            height="295"
                                            // image="https://www.seriouseats.com/thmb/xw1krLC9Yh85qx1wl5jw0BPCWHk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2015__07__20210324-SouthernFriedChicken-Andrew-Janjigian-21-cea1fe39234844638018b15259cabdc2.jpg"
                                            image={`https://source.unsplash.com/random?food`}
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography
                                                sx={{
                                                    color: (theme) =>
                                                        theme.palette.mode === "light"
                                                            ? "primary.main"
                                                            : "primary.light",
                                                    fontWeight: "bold",
                                                    mb: 0,
                                                }}
                                                gutterBottom
                                                variant="h6"
                                                component="div"
                                            >
                                                Lizard
                                            </Typography>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Lizard
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{mt: 0}}
                                            >
                                                Lizards are a widespread group of squamate reptiles,
                                                with over 6,000 species, ranging across all continents
                                                except Antarctica
                                            </Typography>
                                        </CardContent>
                                        <CardHeader
                                            sx={{
                                                backgroundColor: grey[100],
                                                // borderTop: "0.5px ",
                                            }}
                                            avatar={<Avatar src={""} aria-label="author"/>}
                                            title={card.author}
                                            titleTypographyProps={{variant: "subtitle2"}}
                                            subheader={card.date}
                                            action={
                                                <>
                                                    <Typography variant="body1" color="text.secondary">
                                                        &nbsp;
                                                    </Typography>
                                                    <Typography variant="body1" color="text.secondary">
                                                        8 mins
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
                            <FormControlLabel value="Free" control={<Radio/>} label="Free"/>
                            <FormControlLabel
                                value="Premium"
                                control={<Radio/>}
                                label="Premium"
                            />
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
                            <FormControlLabel
                                value="Article"
                                control={<Radio/>}
                                label="Article"
                            />
                            <FormControlLabel
                                value="Recipe"
                                control={<Radio/>}
                                label="Recipe"
                            />
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

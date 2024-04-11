import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {Avatar, CardActionArea, CardContent, CardHeader, CardMedia,} from "@mui/material";
import {grey} from "@mui/material/colors";
import {useNavigate} from "react-router-dom";

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

export default function UserArticlesList({postData}) {
    const navigate = useNavigate();
    return (
        <Grid item xs={12} md={12} lg={12} sx={{mt: 5}}>
            <Grid container spacing={5}>
                {postData.map((post, index) => (
                    <Grid item xs={12} sm={12} md={6} key={index}>
                        <Card sx={{maxWidth: "100%"}}>
                            <CardActionArea
                                onClick={() => navigate('/post?postId=' + post.post_Id)}
                            >
                                <CardMedia
                                    component="img"
                                    height="295"
                                    image={post.post_profile_picture_url}
                                    alt="green iguana"
                                />
                                <CardContent>

                                    <Typography gutterBottom variant="h5" component="div">
                                        {post.category.categoryDescription}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{mt: 0, wordWrap: 'break-word', overflowWrap: 'break-word'}}
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
                                    avatar={<Avatar src={""} aria-label="author"/>}
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

    );
}

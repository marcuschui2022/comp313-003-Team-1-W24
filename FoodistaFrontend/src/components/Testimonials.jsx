import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Masonry from "@mui/lab/Masonry";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";

const userTestimonials = [
  {
    avatar: <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />,
    name: "Julia Cook",
    occupation: "Culinary Enthusiast",
    testimonial:
      "I'm absolutely blown away by the versatility of this food sharing platform! Whether I'm discovering new recipes or sharing my culinary creations with friends, it seamlessly adapts to my ever-changing tastes. Its intuitive interface has truly revolutionized the way I explore the world of food sharing, making every interaction a delightful experience.",
  },
  {
    avatar: <Avatar alt="Alex Carter" src="/static/images/avatar/2.jpg" />,
    name: "Alex Carter",
    occupation: "Home Chef",
    testimonial:
      "I can't get enough of the versatility offered by this food sharing platform! Whether I'm experimenting with exotic ingredients or sharing family recipes, it effortlessly adjusts to my culinary journey. Its user-friendly design has truly simplified my food sharing experience, allowing me to connect with fellow foodies with ease.",
  },
  {
    avatar: <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />,
    name: "Cindy Baker",
    occupation: "CTO",
    testimonial:
      "The adaptability of this food sharing platform is simply amazing! Whether I'm hosting virtual dinner parties or exploring international cuisines, it seamlessly accommodates my culinary adventures. Its intuitive layout has truly elevated my food sharing game, making every meal an unforgettable experience.",
  },
  {
    avatar: <Avatar alt="Lily Nguyen" src="/static/images/avatar/4.jpg" />,
    name: "Max Smith",
    occupation: "Gourmet Explorer",
    testimonial:
      "I'm absolutely thrilled with the versatility of this food sharing platform! Whether I'm collaborating on recipe collections or sharing cooking tips with friends, it effortlessly caters to my culinary interests. Its user-friendly interface has truly transformed my food sharing journey, making every interaction a joyous occasion.",
  },
  {
    avatar: <Avatar alt="Emily Taylor" src="/static/images/avatar/5.jpg" />,
    name: "Cooking Enthusiast",
    occupation: "Cooking Enthusiast",
    testimonial:
      "The versatility of this food sharing platform is truly remarkable! Whether I'm organizing themed cooking challenges or exchanging recipes with fellow enthusiasts, it seamlessly adapts to my culinary whims. Its intuitive design has truly streamlined my food sharing experience, making every culinary endeavor a breeze.",
  },
  {
    avatar: <Avatar alt="Daniel Wolf" src="/static/images/avatar/6.jpg" />,
    name: "Jack Wilson",
    occupation: "Food Enthusiast",
    testimonial:
      "I'm absolutely in love with the versatility of this food sharing platform! Whether I'm hosting virtual cooking classes or sharing my latest culinary creations, it effortlessly caters to my passion for food. Its user-friendly interface has truly enhanced my food sharing journey, making every culinary experience a memorable one.",
  },
];

const whiteLogos = [
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628e8573c43893fe0ace_Sydney-white.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d520d0517ae8e8ddf13_Bern-white.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f46794c159024c1af6d44_Montreal-white.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e891fa22f89efd7477a_TerraLight.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a09d1f6337b1dfed14ab_colorado-white.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5caa77bf7d69fb78792e_Ankara-white.svg",
];

const darkLogos = [
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628889c3bdf1129952dc_Sydney-black.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d4d8b829a89976a419c_Bern-black.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f467502f091ccb929529d_Montreal-black.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e911fa22f2203d7514c_TerraDark.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a0990f3717787fd49245_colorado-black.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5ca4e548b0deb1041c33_Ankara-black.svg",
];

const logoStyle = {
  width: "64px",
  opacity: 0.3,
};

export default function Testimonials() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const columns = isSmallScreen ? 1 : 3;
  const logos = theme.palette.mode === "light" ? darkLogos : whiteLogos;

  return (
    <Container
      id="testimonials"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: "100%", md: "60%" },
          textAlign: { sm: "left", md: "center" },
        }}
      >
        <Typography component="h2" variant="h4" color="text.primary">
          Testimonials
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Explore the feedback from our community members to learn why they love
          our food sharing platform. Discover how we excel in efficiency,
          durability, and customer satisfaction. Join us for quality,
          innovation, and dependable support on your culinary journey.
        </Typography>
      </Box>
      <Masonry columns={columns} spacing={2}>
        {userTestimonials.map((testimonial, index) => (
          <Card key={index} sx={{ p: 1 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {testimonial.testimonial}
              </Typography>
            </CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                pr: 2,
              }}
            >
              <CardHeader
                avatar={testimonial.avatar}
                title={testimonial.name}
                subheader={testimonial.occupation}
              />
              <img
                src={logos[index]}
                alt={`Logo ${index + 1}`}
                style={logoStyle}
              />
            </Box>
          </Card>
        ))}
      </Masonry>
    </Container>
  );
}
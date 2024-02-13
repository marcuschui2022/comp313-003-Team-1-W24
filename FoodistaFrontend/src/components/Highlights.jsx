import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import QueryStatsRoundedIcon from "@mui/icons-material/QueryStatsRounded";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";

const items = [
  {
    icon: <SettingsSuggestRoundedIcon />,
    title: "Versatile Functionality",
    description:
      "Our platform seamlessly adapts to your culinary journey, enhancing convenience and streamlining your food sharing experience.",
  },
  {
    icon: <ConstructionRoundedIcon />,
    title: "Built for Longevity",
    description:
      "Experience unparalleled reliability that surpasses expectations, ensuring a lasting investment in your culinary endeavors.",
  },
  {
    icon: <ThumbUpAltRoundedIcon />,
    title: "User-Friendly Interface",
    description:
      "Incorporate our platform into your daily routine effortlessly, thanks to an intuitive and straightforward design.",
  },
  {
    icon: <AutoFixHighRoundedIcon />,
    title: "Innovative Features",
    description:
      "Stay at the forefront of food sharing trends with cutting-edge functionalities that redefine standards, catering to your evolving needs with excellence.",
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: "Dependable Assistance",
    description:
      "Rely on our dedicated customer support team, providing assistance that extends beyond the initial setup.",
  },
  {
    icon: <QueryStatsRoundedIcon />,
    title: "Attention to Detail",
    description:
      "Appreciate a meticulously designed platform where every detail contributes to an exceptional food sharing experience.",
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: "white",
        bgcolor: "#06090a",
      }}
    >
      <Container
        sx={{
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
          <Typography component="h2" variant="h4">
            Highlights
          </Typography>
          <Typography variant="body1" sx={{ color: "grey.400" }}>
            Discover what sets our food sharing platform apart: versatility,
            reliability, user-friendly interface, and innovation. Benefit from
            dependable customer assistance and attention to detail at every
            step.
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                color="inherit"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  height: "100%",
                  border: "1px solid",
                  borderColor: "grey.800",
                  background: "transparent",
                  backgroundColor: "grey.900",
                }}
              >
                <Box sx={{ opacity: "50%" }}>{item.icon}</Box>
                <div>
                  <Typography fontWeight="medium" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "grey.400" }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

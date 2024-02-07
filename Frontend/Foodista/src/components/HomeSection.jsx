import { Container, Grid, Typography } from "@mui/material";

export default function HomeSection() {
  return (
    <Container id="features">
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <div>
            <Typography
              component="h6"
              variant="h6"
              sx={{
                color: (theme) =>
                  theme.palette.mode === "light"
                    ? "primary.main"
                    : "primary.light",
                display: "flex",
              }}
            >
              Latest Articles
            </Typography>
            <Typography
              component="h5"
              variant="h5"
              color="text.primary"
              sx={{ mt: 1 }}
            >
              Feast of Flavors
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mt: 1, mb: 1 }}
            >
              {`Welcome to Foodista! The Feast of Flavors and Culinary Adventure
              beyond the ordinary. We are a food blog where every recipe tells a
              story and every dish takes you on a journey. We explore the
              uncharted territories of taste, bringing you a blend of classic
              favorites with a twist and exotic dishes from corners of the globe
              you've yet to discover. `}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

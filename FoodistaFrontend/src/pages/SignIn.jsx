import Box from "@mui/material/Box";
import {Avatar, Button, Paper, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {useNavigate} from "react-router-dom"
import {useState} from "react";
import CircularIndeterminate from "../components/CircularIndeterminate.jsx";

const defaultTheme = createTheme();


export default function SignIn() {
    const [isLoading, setIsLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    const apiUrl = "/api/v1/signin";

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(false)
        setErrorMsg("")
        const form = new FormData(event.currentTarget);
        const formData = {
            email: form.get('email'),
            password: form.get('password'),
        };

        try {
            setIsLoading(true)
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const jsonResponse = await response.json();
                console.log(jsonResponse.token)
                if (jsonResponse.token) {
                    document.cookie = `token=${jsonResponse.token}`
                    document.cookie = `fullName=${jsonResponse.fullName}`
                    navigate('/')
                }

            } else {
                if (response.status === 401) {
                    setErrorMsg("Invalid email or password");
                } else {
                    const jsonResponse = await response.json();
                    if (jsonResponse.errorMessage) {
                        setErrorMsg(jsonResponse.errorMessage);
                    } else {
                        console.log('Error:', response.status, response.statusText);
                    }
                }

            }
        } catch (error) {
            console.error('Unexpected error:', error);
            setErrorMsg('Unexpected error: ' + error.message);
        } finally {
            setIsLoading(false)
        }

    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline/>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?food)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign In
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{mt: 1}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            {errorMsg && (
                                <Typography color="error" sx={{mt: 2}}>
                                    {errorMsg}
                                </Typography>
                            )}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                                disabled={isLoading}
                            >
                                {!isLoading ? "Sign In" : <CircularIndeterminate/>}
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2" onClick={() => navigate('/signup')}>
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Box sx={{mt: 5}}>
                                <Typography variant="body2" color="text.secondary" align="center">
                                    {'Copyright © '}
                                    <Link color="inherit" href="#" onClick={() => navigate('/')}>
                                        Foodista
                                    </Link>{' '}
                                    {new Date().getFullYear()}
                                    {'.'}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

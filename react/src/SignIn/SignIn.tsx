import React from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Paper, Box, Grid, Typography, Hidden, Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from '../Copyright/Copyright';
import HTTPClient from '../HTTPClient/HTTPClient';

const useStyles: (props?: any) => Record<any, string> = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    icon: {
        fontSize: 20,
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    }, 
    image: {
        backgroundImage: 'url(./img/sign-in.jpeg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'left',
    },
    brand: {
        margin: theme.spacing(5, 10),
        color: '#ffffff',
        filter: 'brightness(100%)',
    },
    slogan: {
        margin: theme.spacing(0, 10),
        color: '#ffffff',
        filter: 'brightness(100%)',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    pointer: {
        cursor: 'pointer',
    },
}));

interface Props {
    setPage: React.Dispatch<React.SetStateAction<string>>;
}

const SignIn: React.FC<Props> = props => {
    const classes = useStyles();

    const [inputEmail, setInputEmail] = React.useState<string>('');
    const [inputPassword, setInputPassword] = React.useState<string>('');
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const [errorOpen, setErrorOpen] = React.useState<boolean>(false);


    const signInHandler: (event: React.MouseEvent<any>) => void = async event => {
        event.preventDefault(); 
        if (! await HTTPClient.getUserEmailExist(inputEmail)) {
            setErrorMessage('It appears there\'s no account associated with this email!');
            setErrorOpen(true);
        }
        else if (true) {
            setErrorMessage('It appears entered password is incorrect');
            setErrorOpen(true);
        }
        else {
            // Sign in - Cookies all those stuffs 
        }
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={errorOpen}
                autoHideDuration={9000}
                onClose={() => { setErrorOpen(false) }}
            >
                <SnackbarContent
                    className={classes.error}
                    message={
                        <span id="client-snackbar" className={classes.message}>
                            <ErrorIcon className={classes.icon}
                            />
                            {errorMessage}
                        </span>
                    }
                    action={[
                        <IconButton key="close" aria-label="close" color="inherit" onClick={() => { setErrorOpen(false) }}>
                            <CloseIcon className={classes.icon} />
                        </IconButton>,
                    ]}
                />
            </ Snackbar>
            <Grid item xs={false} sm={4} md={7} lg={8} xl={9} className={classes.image} >
                <Hidden smDown={true}>
                    <div className={classes.slogan}>
                        <Typography variant="h1" className={classes.brand}>
                            Paper Trading
                        </Typography>
                        <Typography variant="h3" className={classes.slogan}>
                            A sumptuous stock trading simulator.
                        </Typography>
                    </div>
                </Hidden>
            </Grid>
            <Grid item xs={12} sm={8} md={5} lg={4} xl={3} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <PowerSettingsNewIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={event => setInputEmail(event.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={event => setInputPassword(event.target.value)}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={signInHandler}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link
                                    variant="body2"
                                    onClick={() => { props.setPage('forgot-password') }}
                                >
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link
                                    variant="body2"
                                    className={classes.pointer}
                                    onClick={() => { props.setPage('sign-up') }}
                                >
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}

export default SignIn;
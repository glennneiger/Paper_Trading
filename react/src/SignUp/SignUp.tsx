import React from 'react';
import { Avatar, Button, CssBaseline, TextField, Link, Paper, Box, Grid, Typography, Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from '../Copyright/Copyright';
import HTTPClient from '../HTTPClient/HTTPClient';
import validator from 'validator'; 

const useStyles: (props?: any) => Record<string, string> = makeStyles(theme => ({
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
        backgroundImage: 'url(./img/sign-up.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
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
    setToken: React.Dispatch<React.SetStateAction<string>>;
}

const SignUp: React.FC<Props> = props => {
    const classes = useStyles();

    const [inputFirstName, setInputFirstName] = React.useState<string>('');
    const [inputLastName, setInputLastName] = React.useState<string>('');
    const [inputEmail, setInputEmail] = React.useState<string>('');
    const [inputPassword, setInputPassword] = React.useState<string>('');
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const [errorOpen, setErrorOpen] = React.useState<boolean>(false);

    const signUpHandler: (event: React.MouseEvent<any>) => void = async event => {
        event.preventDefault(); 

        interface Response {
            success: boolean,
            id: number, 
            first_name: string, 
            last_name: string,
            token: string, 
        }

        if (!validator.matches(inputFirstName, /^[a-zA-Z]{1,15}$/)) {
            setErrorMessage('It appears the entered first name format is incorrect. Letters only.');
            setErrorOpen(true);
        } 
        else if (!validator.matches(inputLastName, /^[a-zA-Z]{1,15}$/)) {
            setErrorMessage('It appears the entered last name format is incorrect. Letters only.');
            setErrorOpen(true);
        } 
        else if (!validator.isEmail(inputEmail)) {
            setErrorMessage('It appears the entered email format is incorrect.');
            setErrorOpen(true);
        } 
        else if (!validator.matches(inputPassword, /^[a-zA-Z0-9]{5,15}$/)) {
            setErrorMessage('It appears the entered password format is incorrect. Letters and Numbers only.');
            setErrorOpen(true);
        } 
        else {
            let emailTaken: boolean = await HTTPClient.getUserEmailExist(inputEmail);
            if (emailTaken) {
                setErrorMessage('It appears this email is taken!');
                setErrorOpen(true);
            }
            else {
                let response: Response = await HTTPClient.postUserSignUp(inputFirstName, inputLastName, inputEmail, inputPassword); 
                if (!response.success) {
                    setErrorMessage('Unknow: Sign Up Error');
                    setErrorOpen(true);
                }
                else {
                    props.setToken(response.token);
                    props.setPage('dashboard');
                }
            }
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
            <Grid item xs={false} sm={4} md={7} lg={8} xl={9} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} lg={4} xl={3} component={Paper} elevation={6} square>
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <AccountCircleIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    onChange={event => setInputFirstName(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                    onChange={event => setInputLastName(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={event => setInputEmail(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={event => setInputPassword(event.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={signUpHandler}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link 
                                    variant="body2" 
                                    className={classes.pointer} 
                                    onClick={() => {props.setPage('sign-in')}}
                                >
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Grid>
        </Grid>
    );
}

export default SignUp;
import React from 'react';
import { Avatar, Button, CssBaseline, TextField, Link, Container, Box, Grid, Typography } from '@material-ui/core';
import LoopIcon from '@material-ui/icons/Loop';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from '../Copyright/Copyright';
import HTTPClient from '../HTTPClient/HTTPClient';
import { string } from 'prop-types';

const useStyles: (props?: any) => Record<string, string>  = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
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
}));

interface Props {
    setPage: React.Dispatch<React.SetStateAction<string>>;
}

const ForgotPassword: React.FC<Props> = (props) => {
    const classes: Record<string, string> = useStyles();
    const [email, setEmail]  = React.useState<string>("");

    const submitResetHandler: (event: React.MouseEvent<any>) => void = event => {
        event.preventDefault();
        HTTPClient.getUserEmailExist(email).then(result => {console.log(result)}); 
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LoopIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Reset password
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
                        onChange={event => setEmail(event.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={submitResetHandler}
                    >
                        Reset
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link
                                variant="body2"
                                onClick={() => {props.setPage('sign-in')}}
                            >
                                Remember password? Sign in. 
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link
                                variant="body2"
                                onClick={() => {props.setPage('sign-up')}}
                            >
                                Sign up. 
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

export default ForgotPassword; 
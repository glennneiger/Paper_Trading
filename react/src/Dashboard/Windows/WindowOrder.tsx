import React from 'react';
import clsx from 'clsx';
import { Container, Grid, Paper, } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from '../../Copyright/Copyright';
import ComponentOrder from '../Component/ComponentOrder';

const useStyles = makeStyles(theme => ({

    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 350,
    },
}));

interface Props {
    token: string;
    signOut: (sessionExpired: boolean) => void; 
}

const WindowOrder: React.FC<Props> = props => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


    console.log("Window Portfolio - Render")

    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={fixedHeightPaper}>
                            <ComponentOrder
                                token={props.token}
                                signOut={props.signOut}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Copyright />
        </main>
    );
}

export default WindowOrder; 
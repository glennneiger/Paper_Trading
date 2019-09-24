import React from 'react';
import clsx from 'clsx';
import { Container, Grid, Paper, } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from '../../Copyright/Copyright';
import ComponentBalance from '../Component/ComponentBalance';
import ComponentUSMarket from '../Component/ComponentUSMarket';
import ComponentAccountSnapshot from '../Component/ComponentAccountSnapshot';
import ComponentUSMarketChart from '../Component/ComponentUSMarketChart';

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
    setPage: React.Dispatch<React.SetStateAction<string>>;
    id: number;
    token: string;
    firstName: string;
    lastName: string;
}

const WindowDashboard: React.FC<Props> = props => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4} lg={4}>
                        <Paper className={fixedHeightPaper}>
                            <ComponentBalance
                                firstName={props.firstName}
                                lastName={props.lastName}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={8} lg={8}>
                        <Paper className={fixedHeightPaper}>
                            <ComponentAccountSnapshot />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={8} lg={8}>
                        <Paper className={fixedHeightPaper}>
                            <ComponentUSMarketChart />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <Paper className={fixedHeightPaper}>
                            <ComponentUSMarket />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Copyright />
        </main>
    );
}

export default WindowDashboard; 
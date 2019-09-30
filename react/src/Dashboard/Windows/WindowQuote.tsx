import React from 'react';
import clsx from 'clsx';
import { Container, Grid, Paper, } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from '../../Copyright/Copyright';
import ComponentSymbol from '../Component/ComponentSymbol';
import ComponentTradeData from '../Component/ComponentTradeData';
import ComponentStockChart from '../Component/ComponentStockChart';

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
        height: '70vh',
    },
    stockSymbolPaper: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        height: '20vh',
    },
    stockChartPaper: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        height: '65vh',
    }
}));

interface Props {
    signOut: (sessionExpired: boolean) => void; 
    token: string;
}

const WindowQuote: React.FC<Props> = props => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const [symbol, setSymbol] = React.useState('');

    

    console.log("Window Dashboard - Render")

    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={7} lg={7}>
                        <Paper className={classes.stockSymbolPaper}>
                            <ComponentSymbol
                                symbol={symbol}
                                setSymbol={setSymbol}
                            />
                        </Paper>
                        <Paper className={classes.paper}>
                            <ComponentTradeData
                                token={props.token}
                                symbol={symbol}
                                signOut={props.signOut}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={5} lg={5}>
                        <Paper className={classes.stockChartPaper}>
                            <ComponentStockChart
                                token={props.token}
                                symbol={symbol}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Copyright />
        </main>
    );
}

export default WindowQuote; 
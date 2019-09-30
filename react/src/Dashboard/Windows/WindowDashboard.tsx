import React from 'react';
import clsx from 'clsx';
import { Container, Grid, Paper, } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from '../../Copyright/Copyright';
import ComponentBalance from '../Component/ComponentBalance';
import ComponentUSMarket from '../Component/ComponentUSMarket';
import ComponentAccountSnapshot from '../Component/ComponentAccountSnapshot';
import ComponentUSMarketChart from '../Component/ComponentUSMarketChart';
import HTTPClient from '../../HTTPClient/HTTPClient';
import Portfolio from '../Interface/PortfolioInterface';
import PortfolioHolding from '../Interface/PortfolioHoldingInterface';
import StockQuote from '../Interface/StockQuoteInterface'; 
import StockIndex from '../Interface/StockIndexInterface';

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

const WindowDashboard: React.FC<Props> = props => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const [portfolio, setPortfolio] = React.useState<Portfolio | null>(null);
    const [stockIndex, setStockIndex] = React.useState<StockIndex | null>(null); 

    React.useEffect(() => {
        HTTPClient
            .getUserPortfolio(props.token)
            .then(response => setPortfolio(response))
            .catch(error => {
                if (error.response !== undefined) {
                    if (error.response.status === 500 && error.response.data.message === 'invalid-token'){
                        props.signOut(true);
                    }
                }
                setPortfolio(null);
            });
        
        HTTPClient
            .getStockIndex(props.token)
            .then(response => setStockIndex(response))
            .catch(error => {
                if (error.response !== undefined) {
                    if (error.response.status === 500 && error.response.data.message === 'invalid-token'){
                        props.signOut(true);
                    }
                }
                setStockIndex(null);
            });
    }, []);
    

    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4} lg={4}>
                        <Paper className={fixedHeightPaper}>
                            <ComponentBalance
                                portfolio={portfolio}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={8} lg={8}>
                        <Paper className={fixedHeightPaper}>
                            <ComponentAccountSnapshot 
                                portfolio={portfolio}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={8} lg={8}>
                        <Paper className={fixedHeightPaper}>
                            <ComponentUSMarketChart 
                                stockIndex={stockIndex} 
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <Paper className={fixedHeightPaper}>
                            <ComponentUSMarket 
                                stockQuote={stockIndex !== null ? stockIndex.stockQuote : null} 
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Copyright />
        </main>
    );
}

export default WindowDashboard; 
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, ButtonGroup, Table, TableBody, TableCell, TableHead, TableRow, Typography, Grid } from '@material-ui/core';
import HTTPClient from '../../HTTPClient/HTTPClient';
import Portfolio from '../Interface/PortfolioInterface';
import PortfolioHolding from '../Interface/PortfolioHoldingInterface';

interface Props { 
    token: string;
    signOut: (sessionExpired: boolean) => void; 
}

const useStyles: (props?: any) => Record<any, string> = makeStyles(theme => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
    valueUp: {
        color: '#43A047',
    },
    valueDown: {
        color: '#FF0000',
    },
}));

const toCommas: (value: string) => string = (value) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const ComponentPortfolio: React.FC<Props> = props => {
    const classes = useStyles();
    const [order, setOrder] = React.useState<any | null>(null);
    const [type, setType] = React.useState<'open' | 'executed' | 'cancelled'>('open');
    
    React.useEffect(() => {
        HTTPClient
            .getOrder(props.token)
            .then(response => setOrder(response))
            .catch(error => {
                if (error.response !== undefined) {
                    if (error.response.status === 500 && error.response.data.message === 'invalid-token'){
                        props.signOut(true);
                    }
                }
                setOrder(null);
            });
    }, []);



    let portfolioHoldingItems: PortfolioHolding[] = [];
    let name = '';


    return (
        <React.Fragment>
            <Grid container direction="row" justify="space-between">
                <Grid itemScope> 
                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                        {name + ' '}Order
                    </Typography>
                </Grid>
                <Grid item>
                    <ButtonGroup size="small" color="primary">
                        <Button>Open</Button>
                        <Button>Executed</Button>
                        <Button>Cancelled</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>


            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Symbol</TableCell>
                        <TableCell align="right">Last Price $</TableCell>
                        <TableCell align="right">Change $</TableCell>
                        <TableCell align="right">Change %</TableCell>
                        <TableCell align="right">Qty #</TableCell>
                        <TableCell align="right">Price Paid $</TableCell>
                        <TableCell align="right">Day's Gain $</TableCell>
                        <TableCell align="right">Total Gain $</TableCell>
                        <TableCell align="right">Total Gain %</TableCell>
                        <TableCell align="right">Value $</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {portfolioHoldingItems.map(holding => (
                        <TableRow key={holding.symbol}>
                            <TableCell>{holding.symbol}</TableCell>
                            <TableCell align="right">
                                {toCommas(holding.lastPrice.toFixed(2))}
                            </TableCell>
                            <TableCell align="right" className={holding.change > -0.001 ? classes.valueUp : classes.valueDown}>
                                {toCommas(holding.change.toFixed(2))}
                            </TableCell>
                            <TableCell align="right" className={holding.changePercentage > -0.001 ? classes.valueUp : classes.valueDown}>
                                {toCommas(holding.changePercentage.toFixed(2))}%
                            </TableCell>
                            <TableCell align="right">
                                {toCommas(holding.quantity.toFixed(0))}
                            </TableCell>
                            <TableCell align="right">
                                {toCommas(holding.pricePaid.toFixed(2))}</TableCell>
                            <TableCell align="right" className={holding.dayGain > -0.001 ? classes.valueUp : classes.valueDown}>
                                {toCommas(holding.dayGain.toFixed(2))}
                            </TableCell>
                            <TableCell align="right" className={holding.totalGain > -0.001 ? classes.valueUp : classes.valueDown}>
                                {toCommas(holding.totalGain.toFixed(2))}
                            </TableCell>
                            <TableCell align="right" className={holding.totalGainPercentage > -0.001 ? classes.valueUp : classes.valueDown}>
                                {toCommas(holding.totalGainPercentage.toFixed(2))}%
                            </TableCell>
                            <TableCell align="right">
                                {toCommas(holding.value.toFixed(2))}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}

export default ComponentPortfolio; 
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';

/* -- TODO -- */ 


/* -- 
Symbol, Last Price, Change $, Change %, Qty #, 
Price Paid $, Day's Gain $, Total Gain $, Total Gain %, Value 
-- */ 

interface Data {
    id: number;
    symbol: string;
    lastPrice: number;
    change: number;
    changePercentage: number;
    quantity: number; 
    pricePaid: number; 
    dayGain: number;
    totalGain: number;
    totalGainPercentage: number;  
    value: number; 
}

const rows: Data[] = [
    {
        id: 0, 
        symbol: 'QQQ', 
        lastPrice: 190.50, 
        change: 0, 
        changePercentage: 0, 
        quantity: 600, 
        pricePaid: 164.5495,     
        dayGain: 0.00,
        totalGain: 15556.38, 
        totalGainPercentage: 15.75,
        value: 114300, 
    },
    {
        id: 1, 
        symbol: 'LQMT', 
        lastPrice: 0.0956, 
        change: 0, 
        changePercentage: 0, 
        quantity: 600000, 
        pricePaid: 0.11233,     
        dayGain: 0.00,
        totalGain: -10067.23, 
        totalGainPercentage: -14.93,
        value: 57360, 
    },
    {
        id: 2, 
        symbol: 'DIA', 
        lastPrice: 269.36, 
        change: 0, 
        changePercentage: 0, 
        quantity: 200, 
        pricePaid: 231.3943,     
        dayGain: 0.00,
        totalGain: 7586.19, 
        totalGainPercentage: 16.39,
        value: 53820, 
    },
];

const useStyles: (props?: any) => Record<any, string>  = makeStyles(theme => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));


const ComponentPortfolio: React.FC = () => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Portfolio
            </Typography>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Symbol</TableCell>
                        <TableCell align="right">Last Price</TableCell>
                        <TableCell align="right">Change $</TableCell>
                        <TableCell align="right">Change %</TableCell>
                        <TableCell align="right">Qty #</TableCell>
                        <TableCell align="right">Price Paid $</TableCell>
                        <TableCell align="right">Day's Gain $</TableCell>
                        <TableCell align="right">Total Gain $</TableCell>
                        <TableCell align="right">Total Gain %</TableCell>
                        <TableCell align="right">Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.id}>
                            <TableCell>{row.symbol}</TableCell>
                            <TableCell align="right">{row.lastPrice}</TableCell>
                            <TableCell align="right">{row.change}</TableCell>
                            <TableCell align="right">{row.changePercentage}</TableCell>
                            <TableCell align="right">{row.quantity}</TableCell>
                            <TableCell align="right">{row.pricePaid}</TableCell>
                            <TableCell align="right">{row.dayGain}</TableCell>
                            <TableCell align="right">{row.totalGain}</TableCell>
                            <TableCell align="right">{row.totalGainPercentage}</TableCell>
                            <TableCell align="right">{row.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}

export default ComponentPortfolio; 
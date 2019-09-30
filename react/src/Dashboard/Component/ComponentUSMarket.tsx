import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import { TableRow, Typography } from '@material-ui/core';
import StockQuote from '../Interface/StockQuoteInterface';
import Utils from '../Utils/Utils';
import { JSXElement } from '@babel/types';

const fatchData: (id: number, symbol: string, lastPrice: number, change: number, changePercentage: number) => Object = (id, symbol, lastPrice, change, changePercentage) => {
    return { id, symbol, lastPrice, change, changePercentage };
};

interface Data {
    id: number;
    symbol: string;
    lastPrice: number;
    change: number;
    changePercentage: number;
}

const rows: Data[] = [
    { id: 0, symbol: 'DOW', lastPrice: 100, change: 1, changePercentage: 1 },
    { id: 1, symbol: 'NASDAQ', lastPrice: 100, change: 1, changePercentage: 1 },
    { id: 2, symbol: 'S&P 500', lastPrice: 100, change: 1, changePercentage: 1 },
];


interface Props {
    stockQuote: StockQuote[] | null;
}


const useStyles: (props?: any) => Record<any, string> = makeStyles(theme => ({
    valueUp: {
        color: '#43A047',
    },
    valueDown: {
        color: '#FF0000',
    },
}));


const USMarket: React.FC<Props> = props => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Market Snapshot
            </Typography>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Symbol</TableCell>
                        <TableCell align="right">Last Price</TableCell>
                        <TableCell align="right">Change</TableCell>
                        <TableCell align="right">% Change</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.stockQuote !== null ? props.stockQuote.map(index => (
                        <TableRow key={index.symbol}>
                            <TableCell>
                                {index.symbol}
                            </TableCell>
                            <TableCell align="right">
                                {Utils.formatNumber(index.latestPrice)}
                            </TableCell>
                            <TableCell align="right" className={index.change > -0.001 ? classes.valueUp : classes.valueDown}>
                                {Utils.formatNumber(index.change)}
                            </TableCell>
                            <TableCell align="right" className={index.changePercent > -0.001 ? classes.valueUp : classes.valueDown}>
                                {Utils.formatNumber(index.changePercent)}%
                            </TableCell>
                        </TableRow>)) : null 
                    }
                </TableBody>
            </Table>
        </React.Fragment>
    );
}

export default USMarket; 
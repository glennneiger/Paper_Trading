import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import { TableRow, Typography } from '@material-ui/core';

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
    {id: 0, symbol: 'DOW', lastPrice: 100, change: 1, changePercentage: 1},
    {id: 0, symbol: 'NASDAQ', lastPrice: 100, change: 1, changePercentage: 1},
    {id: 0, symbol: 'S&P 500', lastPrice: 100, change: 1, changePercentage: 1},
];


const useStyles: (props?: any) => Record<any, string>  = makeStyles(theme => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));


const USMarket: React.FC = () => {
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
                        <TableCell>Last Price</TableCell>
                        <TableCell>Change</TableCell>
                        <TableCell align="right">% Change</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.id}>
                            <TableCell>{row.symbol}</TableCell>
                            <TableCell align="right">{row.lastPrice}</TableCell>
                            <TableCell align="right">{row.change}</TableCell>
                            <TableCell align="right">{row.changePercentage}%</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}

export default USMarket; 
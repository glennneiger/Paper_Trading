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
    subject: string;
    value: number;
}

const rows: Data[] = [
    {id: 0, subject: 'Net Account Value', value: 100},
    {id: 1, subject: 'Day\'s Gain', value: 100},
    {id: 2, subject: 'Cash Purchasing Power', value: 100},
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
                Account Snapshot
            </Typography>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Subject</TableCell>
                        <TableCell align="right">Current Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.id}>
                            <TableCell>{row.subject}</TableCell>
                            <TableCell align="right">${row.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}

export default USMarket; 
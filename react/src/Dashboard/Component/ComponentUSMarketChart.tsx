import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import { TableRow, Typography } from '@material-ui/core';
import Chart from 'react-google-charts';

const useStyles: (props?: any) => Record<any, string> = makeStyles(theme => ({
}));


const ComponentUSMarketChart: React.FC = () => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Market Snapshot {/* -- TODO -- */}
            </Typography>

            <Chart
                width={'600px'}
                height={'250px'}
                chartType="Line"
                loader={<div>Loading Chart</div>}
                data={[
                    [
                        'Time',
                        'NASDAQ',
                        'DOW',
                        'S&P 500',
                    ],
                    [1, 37.8, 80.8, 41.8],
                    [2, 30.9, 69.5, 32.4],
                    [3, 25.4, 57, 25.7],
                    [4, 11.7, 18.8, 10.5],
                    [5, 11.9, 17.6, 10.4],
                    [6, 8.8, 13.6, 7.7],
                    [7, 7.6, 12.3, 9.6],
                    [8, 12.3, 29.2, 10.6],
                    [9, 16.9, 42.9, 14.8],
                    [10, 12.8, 30.9, 11.6],
                    [11, 5.3, 7.9, 4.7],
                    [12, 6.6, 8.4, 5.2],
                    [13, 4.8, 6.3, 3.6],
                    [14, 4.2, 6.2, 3.4],
                ]}
                rootProps={{ 'data-testid': '3' }}
            />
        </React.Fragment>
    );
}

export default ComponentUSMarketChart; 
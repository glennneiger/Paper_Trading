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


const ComponentCandleStick: React.FC = () => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                QQQ {/* -- TODO -- */}
            </Typography>

            <Chart
                width={'100%'}
                height={350}
                chartType="CandlestickChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ['day', 'a', 'b', 'c', 'd'],
                    ['Mon', 20, 28, 38, 45],
                    ['Tue', 31, 38, 55, 66],
                    ['Wed', 50, 55, 77, 80],
                    ['Thu', 77, 77, 66, 50],
                    ['Fri', 68, 66, 22, 15],
                    ['Mon', 20, 28, 38, 45],
                    ['Tue', 31, 38, 55, 66],
                    ['Wed', 50, 55, 77, 80],
                    ['Thu', 77, 77, 66, 50],
                    ['Fri', 68, 66, 22, 15],
                ]}
                options={{
                    legend: 'none',
                    bar: { groupWidth: '95%' }, 
                    hollowIsRising: true, 
                    color: '#000000',
                }}
                rootProps={{ 'data-testid': '2' }}
            />
        </React.Fragment>
        );
    }
    
export default ComponentCandleStick; 
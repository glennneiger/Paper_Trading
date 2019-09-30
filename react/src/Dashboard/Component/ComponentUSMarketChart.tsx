import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Chart from 'react-google-charts';
import StockIndex from '../Interface/StockIndexInterface';

const useStyles: (props?: any) => Record<any, string> = makeStyles(theme => ({
}));


interface Props {
    stockIndex: StockIndex | null; 
}

const formatData: (time: string[], chart: number[][], data: any[][]) => void = (time, chart, data) => {
    for(let i = 0; i < time.length; i++) {
        data.push([time[i], chart[0][i], chart[1][i], chart[2][i]]);
    }
}  

const ComponentUSMarketChart: React.FC<Props> = props => {
    const classes = useStyles();

    let data: any[][] = [[]];
    if (props.stockIndex !== null) {
        data = [
            [
                'DATE', 
                'QQQ (NASDAQ ETF)', 
                'DIA (Dow Jones ETF)',
                'SPY (S&P 500 ETF)',
            ]
        ]
        formatData(props.stockIndex.time, props.stockIndex.stockChart, data); 
    }

    console.log(data); 





    return (
        <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Market Snapshot {/* -- TODO -- */}
            </Typography>
            {
                props.stockIndex === null ? null : (
                    <Chart
                        width={'700px'}
                        height={'250px'}
                        chartType="Line"
                        loader={<div>Loading Chart</div>}
                        data={data}
                        rootProps={{ 'data-testid': '3' }}
                    />
                ) 
            }

        </React.Fragment>
    );
}

export default ComponentUSMarketChart; 
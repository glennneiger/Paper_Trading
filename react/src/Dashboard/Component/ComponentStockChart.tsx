import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Chart from 'react-google-charts';
import StockIndex from '../Interface/StockIndexInterface';
import HTTPClient from '../../HTTPClient/HTTPClient';
import StockChartElement from '../Interface/StockChartElementInterface';

const useStyles: (props?: any) => Record<any, string> = makeStyles(theme => ({
}));


interface Props {
    token: string;
    symbol: string;
}

const formatData: (stockChart: StockChartElement[] | null) => (string | number)[][] = (stockChart) => {
    if (stockChart === null) return [[]]; 

    let data: (string | number)[][] = [['DATE', 'Low', 'Open', 'Close', 'High']]; 

    for (let i = 0; i < stockChart.length; i++) {
        if (stockChart[i].open <= stockChart[i].close) {
            data.push([stockChart[i].date, stockChart[i].low, stockChart[i].open, stockChart[i].close, stockChart[i].high]);
        }
        else {
            data.push([stockChart[i].date, stockChart[i].high, stockChart[i].open, stockChart[i].close, stockChart[i].low]);
        }
    }
    console.log(stockChart);
    console.log(data);

    return data; 
}

const ComponentStockChart: React.FC<Props> = props => {
    const classes = useStyles();

    const [stockChart, setStockChart] = React.useState<StockChartElement[] | null>(null);

    React.useEffect(() => {
        if (props.symbol !== '') {
            HTTPClient
                .getStockChart(props.token, props.symbol)
                .then(response => setStockChart(response))
                .catch(error => {
                    setStockChart(null);
                });
        }
        else {
            setStockChart(null);
        }
    }, [props.symbol]);

    return (
        <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                {props.symbol}
            </Typography>
            {
                stockChart === null ? null : (
                    <Chart
                        width={'100%'}
                        height={'100%'}
                        chartType="CandlestickChart"
                        loader={<div>Loading Chart</div>}
                        data={formatData(stockChart)}
                        options={{
                            legend: 'none',
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />
                )
            }

        </React.Fragment>
    );
}

export default ComponentStockChart; 
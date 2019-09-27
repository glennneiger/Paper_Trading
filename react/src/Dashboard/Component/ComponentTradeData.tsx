import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Divider, GridList, Typography } from '@material-ui/core';
import HTTPClient from '../../HTTPClient/HTTPClient';

interface Props {
    token: string;
    symbol: string;
}

const useStyles: (props?: any) => Record<any, string> = makeStyles(theme => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
    button: {
        marginTop: theme.spacing(3),
    },
    listItemText: {
        display: 'flex',
        justifyContent: 'flex-end',
    }
}));

interface StockInfo {
    stockQuote: {
        symbol: string,
        companyName: string,
        primaryExchange: string,
        latestPrice: number,
        previousClose: number,
        change: number,
        changePercent: number,
        week52Low: number,
        week52High: number,
        isUSMarketOpen: boolean
    },
    stockStats: {
        marketcap: number,
        ttmEPS: number,
        peRatio: number,
        beta: number
    }
}

const ComponentTradeData: React.FC<Props> = props => {
    const classes = useStyles();

    const [stockInfo, setStateInfo] = React.useState<StockInfo | null>(null);

    React.useEffect(() => {
        HTTPClient
            .getStockInfo(props.token, props.symbol)
            .then(response => setStateInfo(response));
    }, [props.symbol]);

    return (
        <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Information
            </Typography>
            <GridList 
                className={classes.gridList} 
                cols={2}
                spacing={20}
                cellHeight={'auto'}
            >
                {/* -- LEFT LIST -- */}
                <List component="nav" className={classes.root} aria-label="mailbox folders">
                    <ListItem>
                        <ListItemText primary="Symbol" />
                        <ListItemText 
                            secondary={stockInfo === null? "NOT AVALIABLE" : stockInfo.stockQuote.symbol} 
                            className={classes.listItemText} 
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Compnay" />
                        <ListItemText 
                            secondary={stockInfo === null? "NOT AVALIABLE" : stockInfo.stockQuote.companyName}  
                            className={classes.listItemText} 
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Exchange" />
                        <ListItemText 
                            secondary={stockInfo === null? "NOT AVALIABLE" : stockInfo.stockQuote.primaryExchange}  
                            className={classes.listItemText} 
                        />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="P/E (TTM)" />
                        <ListItemText 
                            secondary={stockInfo === null? "NOT AVALIABLE" : stockInfo.stockStats.peRatio}  
                            className={classes.listItemText} 
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="EPS (TTM)" />
                        <ListItemText 
                            secondary={stockInfo === null? "NOT AVALIABLE" : stockInfo.stockStats.ttmEPS}  
                            className={classes.listItemText} 
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Beta" />
                        <ListItemText 
                            secondary={stockInfo === null? "NOT AVALIABLE" : stockInfo.stockStats.beta}  
                            className={classes.listItemText} 
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Market Capitalization" />
                        <ListItemText 
                            secondary={stockInfo === null? "NOT AVALIABLE" : stockInfo.stockStats.marketcap}  
                            className={classes.listItemText} 
                        />
                    </ListItem>
                </List>

                {/* -- RIGHT LIST -- */}
                <List component="nav" className={classes.root} aria-label="mailbox folders">
                    <ListItem>
                        <ListItemText primary="Price" />
                        <ListItemText 
                            secondary={stockInfo === null? "NOT AVALIABLE" : stockInfo.stockQuote.latestPrice} 
                            className={classes.listItemText} 
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Previous Close" />
                        <ListItemText 
                            secondary={stockInfo === null? "NOT AVALIABLE" : stockInfo.stockQuote.previousClose} 
                            className={classes.listItemText} 
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Change $" />
                        <ListItemText 
                            secondary={stockInfo === null? "NOT AVALIABLE" : stockInfo.stockQuote.change} 
                            className={classes.listItemText} 
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Change %" />
                        <ListItemText 
                            secondary={stockInfo === null? "NOT AVALIABLE" : stockInfo.stockQuote.changePercent} 
                            className={classes.listItemText} 
                        />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="52 Week Low" />
                        <ListItemText 
                            secondary={stockInfo === null? "NOT AVALIABLE" : stockInfo.stockQuote.week52Low} 
                            className={classes.listItemText} 
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="52 Week High" />
                        <ListItemText 
                            secondary={stockInfo === null? "NOT AVALIABLE" : stockInfo.stockQuote.week52High} 
                            className={classes.listItemText} 
                        />
                    </ListItem>
                </List>
            </GridList>
        </React.Fragment>
    );
}

export default ComponentTradeData; 
import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import HTTPClient from '../../HTTPClient/HTTPClient';

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});



interface PortfolioHolding {
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

interface Portfolio {
    success: boolean;
    portfolio: {
        userId: number;
        firstName: string;
        lastName: string;
        cash: number;
        netAssets: number;
        totalGain: number;
        portfolioHolding: PortfolioHolding[];
    }
}

const toCommas: (value: string) => string = (value) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

interface Props {
    firstName: string;
    lastName: string;
    token: string; 
}

const Balance: React.FC<Props> = props => {
    const classes = useStyles();


    const [portfolio, setPortfolio] = React.useState<Portfolio | null>(null);

    React.useEffect(() => {
        HTTPClient
            .getUserPortfolio(props.token)
            .then(response => setPortfolio(response));
    }, []);
    

    return (
        <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Welcome! {portfolio === null ? "" : portfolio.portfolio.firstName + " " + portfolio.portfolio.lastName} 
            </Typography>
            <Typography component="h2" variant="subtitle1" color="primary" gutterBottom>
                Your Current Account Value
            </Typography>
            <Typography component="p" variant="h4">
                {/* -- TODO --  */}
                {portfolio === null ? "" : toCommas(portfolio.portfolio.netAssets.toFixed(2))}
            </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                on 15 March, 2019
            </Typography>
            <div>
                <Link color="primary">
                    View balance
                </Link>
            </div>
        </React.Fragment>
    );
}

export default Balance; 
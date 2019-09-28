import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import HTTPClient from '../../HTTPClient/HTTPClient';
import Portfolio from '../Interface/PortfolioInterface';
import PortfolioHolding from '../Interface/PortfolioHoldingInterface';

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});


const toCommas: (value: string) => string = (value) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

interface Props {
    portfolio: Portfolio | null; 
}

const Balance: React.FC<Props> = props => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Welcome! {props.portfolio === null ? "" : props.portfolio.firstName + " " + props.portfolio.lastName} 
            </Typography>
            <Typography component="h2" variant="subtitle1" color="primary" gutterBottom>
                Your Current Account Value
            </Typography>
            <Typography component="p" variant="h4">
                {/* -- TODO --  */}
                {props.portfolio === null ? "" : toCommas(props.portfolio.netAssets.toFixed(2))}
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
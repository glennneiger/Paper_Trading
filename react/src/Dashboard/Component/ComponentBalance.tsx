import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

interface Props {
    firstName: string;
    lastName: string;
}

const Balance: React.FC<Props> = props => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Welcome! {props.firstName} {props.lastName}
            </Typography>
            <Typography component="h2" variant="subtitle1" color="primary" gutterBottom>
                Your Current Account Value
            </Typography>
            <Typography component="p" variant="h4">
                {/* -- TODO --  */}
                $3,024.00
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
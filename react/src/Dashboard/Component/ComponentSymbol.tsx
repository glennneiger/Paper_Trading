import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {  TextField, Typography } from '@material-ui/core';

interface Props {
    symbol: string;
    setSymbol: React.Dispatch<React.SetStateAction<string>>;
}

const useStyles: (props?: any) => Record<any, string> = makeStyles(theme => ({

}));


const ComponentSymbol: React.FC<Props> = props => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Stock Symbol
            </Typography>
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    id="outlined-symbol"
                    label="Stock Symbol"
                    className={classes.textField}
                    fullWidth
                    value={props.symbol}
                    onChange={event => { props.setSymbol(event.target.value) }}
                    margin="normal"
                    variant="outlined"
                />
            </form>
        </React.Fragment>
    );
}

export default ComponentSymbol; 
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Snackbar, SnackbarContent, IconButton, Button, MenuItem, TextField, Typography } from '@material-ui/core';
import HTTPClient from '../../HTTPClient/HTTPClient';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { green } from '@material-ui/core/colors';

interface Props {
    token: string;
    symbol: string;
    setSymbol: React.Dispatch<React.SetStateAction<string>>;
    signOut: (sessionExpired: boolean) => void; 
}

const useStyles: (props?: any) => Record<any, string> = makeStyles(theme => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
    button: {
        marginTop: theme.spacing(3),
    },
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    icon: {
        fontSize: 20,
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}));

const actionOptions = [
    {
        value: 'buy',
        label: 'Buy',
    },
    {
        value: 'sale',
        label: 'Sale',
    },
]

const ComponentTrade: React.FC<Props> = props => {
    const classes = useStyles();

    const [action, setAction] = React.useState('buy');
    const [quantity, setQuantity] = React.useState(0);
    const [successOpen, setSuccessOpen] = React.useState(false);
    const [errorOpen, setErrorOpen] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState<string>('');



    const tradeHandler: (event: React.MouseEvent<any>) => void = async (event) => {
        event.preventDefault();
        if (quantity === 0) {
            setErrorMessage('The quantity of your order cannot be 0.');
            setErrorOpen(true);
            return; 
        }

        HTTPClient
            .postOrder(props.token, props.symbol, quantity, action === 'sale' ? true : false)
            .then(response => {
                setSuccessOpen(true);
                setQuantity(0);
                props.setSymbol('');
            })
            .catch(error => {
                if (error.response.status === 500 && error.response.data.message === 'invalid-token'){
                    props.signOut(true);
                }
                else if (error.response.status === 500) {
                    switch (error.response.data.message) {
                        case 'invalid-token':
                            setErrorMessage('Please sign in again');
                            break; 
                        case 'invalid-symbol':
                            setErrorMessage('The stock symbol is invalid.');
                            break; 
                        case 'insufficient-shares':
                            setErrorMessage('Insufficient shares in your account.');
                            break; 
                        case 'insufficient-funds':
                            setErrorMessage('Insufficient fund in your account.');
                            break; 
                        default:
                            setErrorMessage('Fail to place order.');
                            break; 
                    }
                    setErrorOpen(true);
                }
            });
    }

    return (
        <React.Fragment>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={successOpen}
                autoHideDuration={3000}
                onClose={() => { setSuccessOpen(false) }}
            >
                <SnackbarContent
                    className={classes.success}
                    message={
                        <span id="client-snackbar" className={classes.message}>
                            <CheckCircleIcon className={classes.icon}
                            />
                            The order has been successfully placed.
                        </span>
                    }
                    action={[
                        <IconButton key="close" aria-label="close" color="inherit" onClick={() => { setSuccessOpen(false) }}>
                            <CloseIcon className={classes.icon} />
                        </IconButton>,
                    ]}
                />
            </ Snackbar>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={errorOpen}
                autoHideDuration={3000}
                onClose={() => { setErrorOpen(false) }}
            >
                <SnackbarContent
                    className={classes.error}
                    message={
                        <span id="client-snackbar" className={classes.message}>
                            <ErrorIcon className={classes.icon}
                            />
                            {errorMessage}
                        </span>
                    }
                    action={[
                        <IconButton key="close" aria-label="close" color="inherit" onClick={() => { setErrorOpen(false) }}>
                            <CloseIcon className={classes.icon} />
                        </IconButton>,
                    ]}
                />
            </ Snackbar>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Stock Trade
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
                <TextField
                    select
                    id="outlined-action"
                    label="Action"
                    className={classes.textField}
                    fullWidth
                    value={action}
                    onChange={event => { setAction(event.target.value) }}
                    margin="normal"
                    variant="outlined"
                >
                    {actionOptions.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="outlined-quantity"
                    label="Quantity"
                    className={classes.textField}
                    fullWidth
                    value={quantity}
                    onChange={event => { setQuantity(parseInt(event.target.value)) }}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-price-type"
                    label="Price Type"
                    className={classes.textField}
                    disabled={true}
                    fullWidth
                    value={"Market"}
                    onChange={() => { }}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-duration"
                    label="Duration"
                    className={classes.textField}
                    disabled={true}
                    fullWidth
                    value={"Good for Day"}
                    onChange={() => { }}
                    margin="normal"
                    variant="outlined"
                />
                <Button
                    fullWidth
                    color="primary"
                    variant="outlined"
                    size="large"
                    className={classes.button}
                    onClick={tradeHandler}
                >
                    Trade
                </Button>
            </form>
        </React.Fragment>
    );
}

export default ComponentTrade; 